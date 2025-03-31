import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useQueryContext } from '../context/queryContext';
import './querySelector.css';
import { Query } from '..';

interface QuerySelectorProps {
  editorId: number;
}

const initialPredefinedQueries: Query[] = [
  {
    id: 'q1',
    name: 'Top 10 Customers',
    queryText: 'SELECT * FROM customers ORDER BY total_purchases DESC LIMIT 10',
    sampleData: []
  },
];

const QuerySelector: React.FC<QuerySelectorProps> = ({ editorId }) => {
  const { state, dispatch } = useQueryContext(editorId);
  const { queryHistory } = state;
  const [predefinedQueries] = useState<Query[]>(initialPredefinedQueries);

  const handleQuerySelect = (query: Query) => {
    dispatch({
      type: 'SET_QUERY_TEXT',
      payload: query
    });
    toast.success('Query selected', { duration: 1500 });
  };

  return (
    <div className="query-selector">
      {/* <h2 className="sidebar-heading">Query Library</h2> */}
      <div className="query-history-section">
      
        <svg 
          viewBox="0 0 180 60" 
          xmlns="http://www.w3.org/2000/svg"
          className="query-history-image"
        >
          <rect width="100%" height="100%" fill="#3F37F9"/>
          <text
            x="50%"
            y="50%"
            fontFamily="Poppins, sans-serif"
            fontSize="28"
            fontWeight="bold"
            fill="#FFFFFF"
            textAnchor="middle"
            dominantBaseline="middle"
            letterSpacing="0.5"
          >
            atlan
          </text>
        </svg>
      </div>
      <h2 className="query-selector-title">Regular Queries</h2>
      <div className="query-selector-buttons">
        {predefinedQueries.map((query) => (
          <button
            key={query.id}
            onClick={() => handleQuerySelect(query)}
            className="query-selector-button"
          >
            {query.name}
          </button>
        ))}
      </div>

      <h2 className="query-selector-title">Query History</h2>
            
      <div className="query-history-section">
        {queryHistory.length > 0 ? (
          <div className="query-history">
            <ul className="query-history-list">
              {queryHistory.map((query, index) => (
                <li key={index} className="query-history-item">
                  <div className="query-history-content">
                    <span className="query-history-text">{query.queryText}</span>
                    <button
                      className="history-add-button"
                      onClick={() => handleQuerySelect(query)}
                    >
                      Use
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