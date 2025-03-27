import React, { useMemo, useState } from 'react';
import { useQueryContext } from '../context/queryContext';
import { exportToCSV } from '../utility/dataProcessing';
import './resultTable.css';

const ResultTable: React.FC = () => {
  const { state } = useQueryContext();
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const renderedResults = useMemo(() => {
    if (!state.results) return null;
    
    return (
      <div 
        className={`main-result-table ${isFullScreen ? 'full-screen' : ''}`}
      >
        
        <div className="result-table">
        <div className="result-table-header-actions">
          <button 
            onClick={toggleFullScreen} 
            className="result-table-fullscreen-btn"
          >
            {isFullScreen ? 'Exit Full Screen' : 'View Full Screen'}
          </button>
        </div>
        <div className="result-table-table">
          <table className="tablell">
            <thead>
              <tr>
                {state.results.columns.map((col, idx) => (
                  <th key={idx} className="result-table-header">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {state.results.data.map((row, rowIdx) => (
                <tr key={rowIdx} className="result-table-row">
                  {state.results?.columns?.map((col, colIdx) => (
                    <td key={colIdx} className="result-table-cell">
                      {typeof row[col] === 'object' && row[col] !== null
                        ? JSON.stringify(row[col])
                        : row[col]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
          
        </div>
        <div className="result-table-footer">
          <span>Total Rows: {state.results.data.length}</span>
          <button
            onClick={() => exportToCSV(state.results!)}
            className="result-table-export"
          >
            Export to CSV
          </button>
        </div>
      </div>
    );
  }, [state.results, isFullScreen]);

  if (!state.results) return null;
  return renderedResults;
};

export default ResultTable;