import React, { useState } from 'react';
import { useQueryContext } from '../context/queryContext';
import './querySelector.css';
import { Query } from '..';

const initialPredefinedQueries: Query[] = [
  {
    id: 'q1',
    name: 'Top 10 Customers',
    queryText: 'SELECT * FROM customers ORDER BY total_purchases DESC LIMIT 10',
    sampleData: [
      { id: 1, name: 'John Doe', total_purchases: 5000 },
      { id: 2, name: 'Jane Smith', total_purchases: 4500 },
    ]
  },
];

const QuerySelector: React.FC = () => {
  const { state, dispatch } = useQueryContext();
  const { queryHistory } = state;
  
  
  const [predefinedQueries, setPredefinedQueries] = useState<Query[]>(initialPredefinedQueries);

  const handleQuerySelect = (query: Query) => {
    dispatch({
      type: 'SET_QUERY_TEXT',
      payload: query.queryText
    });
  };

  const handleAddFromHistory = (queryText: string) => {
    dispatch({
      type: 'SET_QUERY_TEXT',
      payload: queryText
    });

    
    const queryExists = predefinedQueries.some(q => q.queryText === queryText);
    
    if (!queryExists) {
      
      const newQuery: Query = {
        id: `query-${Date.now()}`,
        name: `Custom Query ${predefinedQueries.length + 1}`,
        queryText: queryText,
        sampleData: [] 
      };

     
      setPredefinedQueries(prevQueries => [...prevQueries, newQuery]);
    }
  };

  return (
    <div className="query-selector">
      <h2 className="sidebar-heading">Query Library</h2>
      <h2 className="query-selector-title">Regualar Queries</h2>
      <div className="query-selector-buttons">
        {predefinedQueries.map((query, index) => (
          <button
            key={index}
            onClick={() => handleQuerySelect(query)}
            className="query-selector-button"
          >
            {query.queryText}
          </button>
        ))}
      </div>

      <div className="query-history-section">
        <div className="query-history-header">
          <h2 className="query-history-title">Query History</h2>
        </div>
        {queryHistory.length > 0 ? (
          <div className="query-history">
            <ul className="query-history-list">
              {queryHistory.map((query, index) => (
                <li key={index} className="query-history-item">
                  <div className="query-history-content">
                    <span className="query-history-text">{query.queryText}</span>
                    <button
                      className="history-add-button"
                      onClick={() => handleAddFromHistory(query.queryText)}
                    >
                      Add
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="query-history-empty">
            <p>No recent queries</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuerySelector;