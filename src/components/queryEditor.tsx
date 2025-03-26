import React, { useState, useCallback, useEffect } from 'react';
import { useQueryContext } from '../context/queryContext';
import './QueryEditor.css';

const QueryEditor: React.FC = () => {
  const { state, dispatch } = useQueryContext();
  const [queryText, setQueryText] = useState(state.currentQuery?.queryText || '');

  useEffect(() => {
    setQueryText(state.currentQuery?.queryText || '');
  }, [state.currentQuery]);

  const handleRunQuery = useCallback(() => {
    console.log("queryText", queryText);
    dispatch({ type: 'SET_CURRENT_QUERY', payload: { queryText } });
    console.log("queryText", queryText);
    dispatch({ type: 'SET_LOADING', payload: true });
    console.log("RUN_QUERY");
    setTimeout(() => {
      dispatch({ type: 'RUN_QUERY' });
    }, 500);
  }, [dispatch, queryText]);

  return (
    <div className="query-editor">
      <textarea
        className="query-editor-textarea"
        value={queryText}
        onChange={(e) => setQueryText(e.target.value)}
        placeholder="Enter your SQL query here..."
      />
      {state.queryExplanation && (
        <div className="query-editor-explanation">
          <strong>Query Explanation:</strong> {state.queryExplanation}
        </div>
      )}
      <button
        onClick={handleRunQuery}
        className="query-editor-button"
        //disabled={queryText === ''}
      >
        Run Query
      </button>
      {state.isLoading && <div className="query-editor-loading" />}
      {state.error && <div className="query-editor-error">{state.error}</div>}
    </div>
  );
};

export default QueryEditor;
