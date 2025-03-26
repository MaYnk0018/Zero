import React from 'react';
import { useQueryContext } from '../context/queryContext';
import { initialQueries } from '../data/queries';
import './querySelector.css';

const QuerySelector: React.FC = () => {
  const { state, dispatch } = useQueryContext();
  const { queryHistory } = state;

  const handleQuerySelect = (query: any) => {
    dispatch({ 
      type: 'SET_QUERY_TEXT', 
      payload: query 
    });
  };

  const handleAddFromHistory = (queryText: string) => {
    dispatch({ type: 'SET_QUERY_TEXT', payload: queryText });
  };

  return (
    <div className="query-selector">
      <h2 className="query-selector-title">Predefined Queries</h2>
      <div className="query-selector-buttons">
        {initialQueries.map((query, index) => (
          <button
            key={index}
            onClick={() => handleQuerySelect(query)}
            className="query-selector-button"
          >
            {query.name}
          </button>
        ))}
      </div>

      {queryHistory.length > 0 && (
        <div className="query-history">
          <h2 className="query-history-title">Query History</h2>
          <ul className="query-history-list">
            {queryHistory.map((query, index) => (
              <li key={index} className="query-history-item">
                <span>{query.queryText}</span>
                <button
                  className="history-add-button"
                  onClick={() => handleAddFromHistory(query.queryText)}
                >
                  Add Query
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default QuerySelector;
