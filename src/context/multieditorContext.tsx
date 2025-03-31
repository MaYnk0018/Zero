import React, { createContext, useContext, useReducer } from 'react';
import { Query, QueryResult } from '../index';

export interface EditorQueryState {
  currentQuery: Query | null;
  queryHistory: Query[];
  savedQueries: Query[];
  results: QueryResult | null;
  isLoading: boolean;
  error: string | null;
  queryExplanation?: string | null;
}

export interface MultiEditorState {
  activeEditorId: number;
  editors: {
    [id: number]: EditorQueryState;
  };
}

const initialEditorState: EditorQueryState = {
  currentQuery: null,
  queryHistory: [],
  savedQueries: [],
  results: null,
  isLoading: false,
  error: null,
  queryExplanation: null,
};

const initialState: MultiEditorState = {
  activeEditorId: 1,
  editors: { 1: { ...initialEditorState } },
};

type Action =
  | { type: 'SET_ACTIVE_EDITOR'; editorId: number }
  | { type: 'ADD_EDITOR'; editorId: number }
  | { type: 'UPDATE_EDITOR'; editorId: number; payload: Partial<EditorQueryState> };

function reducer(state: MultiEditorState, action: Action): MultiEditorState {
  switch (action.type) {
    case 'SET_ACTIVE_EDITOR':
      return { ...state, activeEditorId: action.editorId };
    case 'ADD_EDITOR':
      return {
        ...state,
        editors: { ...state.editors, [action.editorId]: { ...initialEditorState } },
        activeEditorId: action.editorId,
      };
    case 'UPDATE_EDITOR':
      return {
        ...state,
        editors: {
          ...state.editors,
          [action.editorId]: { ...state.editors[action.editorId], ...action.payload },
        },
      };
    default:
      return state;
  }
}

const MultiEditorContext = createContext<{
  state: MultiEditorState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

export const MultiEditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <MultiEditorContext.Provider value={{ state, dispatch }}>{children}</MultiEditorContext.Provider>;
};

export const useMultiEditorContext = () => useContext(MultiEditorContext);
