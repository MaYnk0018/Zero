export interface Query {
    [x: string]: any;
    id: string;
    name: string;
    queryText: string;
    sampleData: any[];
}

export interface QueryResult {
    columns: string[];
    data: any[];
}

export interface QueryState {
    currentQuery: Query | null;
    queryHistory: Query[];
    savedQueries: Query[];
    results: QueryResult | null;
    isLoading: boolean;
    error: string | null;
    queryExplanation?: string | null;
}

export interface QueryContextType {
    state: QueryState;
    dispatch: React.Dispatch<QueryAction>;
}

export type QueryActionType =
    | 'SET_QUERY_TEXT'
    | 'SET_CURRENT_QUERY'
    | 'RUN_QUERY'
    | 'SAVE_QUERY'
    | 'ADD_TO_HISTORY'
    | 'CLEAR_RESULTS'
    | 'SET_ERROR'
    | 'SET_LOADING'
    | 'ADD_TO_QUERY_HISTORY'
    | 'SET_TEXT';

export interface QueryAction {
    type: QueryActionType;
    payload?: any;
}