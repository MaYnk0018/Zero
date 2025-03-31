import React, { createContext, useContext, useReducer } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import {
  QueryState,
  QueryAction,
  QueryContextType,
  Query
} from '../index';
import { QuerySimulator, explainQuery } from '../utility/datagenerator';

interface EditorStates {
  [editorId: number]: QueryState;
}

const initialState: QueryState = {
  currentQuery: null,
  queryHistory: [],
  savedQueries: [],
  results: null,
  isLoading: false,
  error: null,
  queryExplanation: null
};

const initialEditorStates: EditorStates = {};

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
        // queryHistory: [
        //   ...state.queryHistory.filter(q => q.queryText !== queryToSet.queryText)
        // ].slice(0, 4),
        error: null
      };
    case 'SET_TEXT':

      const querySet: Query = typeof action.payload === 'string'
        ? {
          id: `temp-${Date.now()}`,
          name: 'Custom Query',
          queryText: action.payload,
          sampleData: []
        }
        : action.payload;

      return {
        ...state,
        currentQuery: querySet,
        queryExplanation: explainQuery(querySet.queryText),
        queryHistory: [
          querySet,
          ...state.queryHistory.filter(q => q.queryText !== querySet.queryText)
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

export const QueryContext = createContext<{
  state: EditorStates;
  dispatch: (editorId: number, action: QueryAction) => void;
}>({
  state: initialEditorStates,
  dispatch: () => null
});

export const QueryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setStates] = React.useState<EditorStates>(initialEditorStates);

  const dispatch = (editorId: number, action: QueryAction) => {
    setStates(prevStates => ({
      ...prevStates,
      [editorId]: queryReducer(prevStates[editorId] || initialState, action)
    }));
  };

  return (
    <QueryContext.Provider value={{ state, dispatch }}>
      {children}
    </QueryContext.Provider>
  );
};

export const useQueryContext = (editorId: number) => {
  const context = useContext(QueryContext);
  if (!context) {
    throw new Error('useQueryContext must be used within a QueryProvider');
  }

  const editorState = context.state[editorId] || initialState;
  const editorDispatch = (action: QueryAction) => context.dispatch(editorId, action);

  return { state: editorState, dispatch: editorDispatch };
};