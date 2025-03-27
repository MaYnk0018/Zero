import React, { createContext, useContext, useReducer } from 'react';
import toast, { Toaster } from 'react-hot-toast';
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
      return {
        ...state,
        currentQuery: action.payload,
        queryExplanation: action.payload?.queryText
          ? explainQuery(action.payload.queryText)
          : 'No query explanation available',
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
          ...state.queryHistory.filter(q => q.queryText !== queryToSet.queryText)
        ].slice(0, 4),
        error: null
      };

    case 'RUN_QUERY': {
      if (!state.currentQuery) {
        return { ...state, error: 'No query to execute', isLoading: false };
      }


      const simulationResults = QuerySimulator.executeQuery(state.currentQuery);

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

  const enhancedDispatch = (action: QueryAction) => {
    switch (action.type) {
      case 'SET_CURRENT_QUERY':
        toast.success('Query set successfully', {
          position: 'bottom-right',
          duration: 1000,
        });
        break;
      case 'RUN_QUERY':

        if (state.currentQuery) {
          const simulationResults = QuerySimulator.executeQuery(state.currentQuery);
          simulationResults.data.length === 0
            ? toast.error('No results found')
            : toast.success('Query executed successfully');
        }
        break;
      case 'SET_ERROR':
        toast.error(action.payload, {
          position: 'bottom-right',
          duration: 2000,
        });
        break;
    }

    dispatch(action);
  };

  return (
    <QueryContext.Provider value={{ state, dispatch: enhancedDispatch }}>
      <Toaster />
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