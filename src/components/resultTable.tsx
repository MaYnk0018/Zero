import React, { useMemo, useState } from 'react';
import { useQueryContext } from '../context/queryContext';
import { exportToCSV } from '../utility/dataProcessing';
import './resultTable.css';

interface ResultTableProps {
  editorId: number;
}

const ResultTable: React.FC<ResultTableProps> = ({ editorId }) => {
  const { state } = useQueryContext(editorId);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [showColumnDetails, setShowColumnDetails] = useState(false);

  const toggleFullScreen = () => {
    setIsFullScreen((prev) => {
      const newVal = !prev;
      if (newVal) {
        document.body.classList.add('fullscreen-active');
      } else {
        document.body.classList.remove('fullscreen-active');
      }
      return newVal;
    });
  };

  
  const filteredData = useMemo(() => {
    if (!state.results) return [];
    if (!searchQuery.trim()) return state.results.data;
    return state.results.data.filter(row =>
      state.results!.columns.some(col => {
        const cell = row[col];
        return cell && cell.toString().toLowerCase().includes(searchQuery.toLowerCase());
      })
    );
  }, [state.results, searchQuery]);

 
  const paginatedData = useMemo(() => {
    const startIdx = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(startIdx, startIdx + rowsPerPage);
  }, [filteredData, currentPage, rowsPerPage]);

  
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  
  const columnDetails = useMemo(() => {
    if (!state.results || !state.results.data.length) return [];
    return state.results.columns.map(col => {
      const sampleValue = state.results!.data[0][col];
      return {
        name: col,
        type: typeof sampleValue
      };
    });
  }, [state.results]);


  const handlePrevPage = () => {
    setCurrentPage(prev => (prev > 1 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev));
  };

  
  const renderDefaultView = () => (
    <>
      <div className="result-table-header-actions" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
        <button 
          onClick={toggleFullScreen} 
          className="result-table-fullscreen-btn"
        >
          {isFullScreen ? 'Exit Full Screen' : 'View Full Screen'}
        </button>
        <button
          onClick={() => setShowColumnDetails(prev => !prev)}
          className="result-table-action-btn"
        >
          {showColumnDetails ? 'Show Table' : 'Show Column Details'}
        </button>
      </div>

     
      {showColumnDetails ? (
        <div className="column-details" style={{ padding: '10px', backgroundColor: '#f1f1f1', margin: '0 10px 10px', borderRadius: '5px' }}>
          <h4>Column Details</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {columnDetails.map(detail => (
              <li key={detail.name}>
                <strong>{detail.name}</strong>: {detail.type}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <>
        
          <div className="result-table-controls" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px 5px 5px' }}>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                padding: '4px 8px',
                width: '150px',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
            />
            <div className="pagination-controls" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button 
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="result-table-action-btn"
              >
                Prev
              </button>
              <span style={{ fontSize: '0.9rem' }}>
                Page {currentPage} of {totalPages}
              </span>
              <button 
                onClick={handleNextPage}
                disabled={currentPage === totalPages || totalPages === 0}
                className="result-table-action-btn"
              >
                Next
              </button>
            </div>
          </div>

          
          <div className="result-table">
            <div className="result-table-table">
              <table className="tablell">
                <thead>
                  <tr>
                    {state.results!.columns.map((col, idx) => (
                      <th key={idx} className="result-table-header">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((row, rowIdx) => (
                    <tr key={rowIdx} className="result-table-row">
                      {state.results!.columns.map((col, colIdx) => (
                        <td key={colIdx} className="result-table-cell">
                          {typeof row[col] === 'object' && row[col] !== null
                            ? JSON.stringify(row[col])
                            : row[col]}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {paginatedData.length === 0 && (
                    <tr>
                      <td colSpan={state.results!.columns.length} style={{ textAlign: 'center', padding: '10px' }}>
                        No matching records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

      
          <div className="result-table-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
            <span>Total Rows: {filteredData.length}</span>
            <button
              onClick={() => exportToCSV(state.results!)}
              className="result-table-export"
            >
              Export to CSV
            </button>
          </div>
        </>
      )}
    </>
  );

  
  const renderFullScreenView = () => (
    <>
      <div className="result-table-header-actions" style={{ padding: '10px' }}>
        <button 
          onClick={toggleFullScreen} 
          className="result-table-fullscreen-btn"
        >
          Exit Full Screen
        </button>
      </div>
      <div 
        className="result-table full-screen-table-container" 
        style={{ overflow: 'auto', height: 'calc(100vh - 60px)' }} 
      >
        <div className="result-table-table">
          <table className="tablell">
            <thead>
              <tr>
                {state.results!.columns.map((col, idx) => (
                  <th key={idx} className="result-table-header">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {state.results!.data.map((row, rowIdx) => (
                <tr key={rowIdx} className="result-table-row">
                  {state.results!.columns.map((col, colIdx) => (
                    <td key={colIdx} className="result-table-cell">
                      {typeof row[col] === 'object' && row[col] !== null
                        ? JSON.stringify(row[col])
                        : row[col]}
                    </td>
                  ))}
                </tr>
              ))}
              {state.results!.data.length === 0 && (
                <tr>
                  <td colSpan={state.results!.columns.length} style={{ textAlign: 'center', padding: '10px' }}>
                    No data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  const renderedResults = useMemo(() => {
    if (!state.results) return null;
    return (
      <div className={`main-result-table ${isFullScreen ? 'full-screen' : ''}`}>
        {isFullScreen ? renderFullScreenView() : renderDefaultView()}
      </div>
    );
  }, [state.results, isFullScreen, showColumnDetails, searchQuery, paginatedData, totalPages, currentPage, filteredData.length, columnDetails]);

  if (!state.results) return null;
  return renderedResults;
};

export default ResultTable;
