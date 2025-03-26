import React, { createContext, useContext, useReducer } from 'react';
import {
  QueryState,
  QueryAction,
  QueryContextType,
  Query
} from '../index';
import { QuerySimulator, explainQuery } from '../utility/datagenerator';

const initialState: QueryState = {
  currentQuery: null,
  queryHistory: [],
  savedQueries: [],
  results: null,
  isLoading: false,
  error: null,
  queryExplanation: null
};

function queryReducer(state: QueryState, action: QueryAction): QueryState {
  switch (action.type) {

    case 'SET_CURRENT_QUERY':
      console.log("action.payload", action.payload)
      const newQuery = action.payload;
     
      // console.log("queryHistory", updatedHistory)

      return {
        ...state,
        currentQuery: newQuery,
        queryExplanation: newQuery?.queryText
          ? explainQuery(newQuery.queryText)
          : 'No query explanation available',
        // queryHistory: updatedHistory,
        error: null
      };
      case 'SET_QUERY_TEXT':
        
        const queryToSet: Query = typeof action.payload === 'string' 
          ? { 
              id: `temp-${Date.now()}`, 
              name: 'Custom Query', 
              queryText: action.payload, 
              sampleData: [] 
            }
          : action.payload;
  
        return {
          ...state,
          currentQuery: queryToSet,
          queryExplanation: explainQuery(queryToSet.queryText),
          queryHistory: [
            queryToSet,
            ...state.queryHistory.filter(q => q.queryText !== queryToSet.queryText)
          ].slice(0, 4),
          error: null
        };

    case 'RUN_QUERY': {
      if (!state.currentQuery) {
        return { ...state, error: 'No query to execute', isLoading: false };
      }

      // console.log('Current Query:', state.currentQuery);
      const simulationResults = QuerySimulator.executeQuery(state.currentQuery);
      // console.log('Simulation Results:', simulationResults);


      const updatedHistory = [
        state.currentQuery,
        ...state.queryHistory.filter(q => q.queryText !== state.currentQuery?.queryText)
      ].slice(0, 4);

      return {
        ...state,
        results: simulationResults,
        isLoading: false,
        queryHistory: updatedHistory,
        error: simulationResults.data.length === 0 ? 'No results found' : null
      };
    }


    case 'SAVE_QUERY':
      return {
        ...state,
        savedQueries: [...state.savedQueries, action.payload]
      };

    case 'CLEAR_RESULTS':
      return {
        ...state,
        results: null,
        error: null
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
        error: null
      };

    default:
      return state;
  }
}

export const QueryContext = createContext<QueryContextType>({
  state: initialState,
  dispatch: () => null
});

export const QueryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(queryReducer, initialState);

  return (
    <QueryContext.Provider value={{ state, dispatch }}>
      {children}
    </QueryContext.Provider>
  );
};

export const useQueryContext = () => {
  const context = useContext(QueryContext);
  if (!context) {
    throw new Error('useQueryContext must be used within a QueryProvider');
  }
  return context;
};
