import React from 'react';
import { QueryProvider } from './context/queryContext';
import QueryEditor from './components/queryEditor';
import QuerySelector from './components/querySelector';
import ResultTable from './components/resultTable';


const App: React.FC = () => {
  return (
    <QueryProvider>
      <div className="app-container">
        <div className="sidebar">
          <h2 className="sidebar-heading">
            Query Library
          </h2>
          <QuerySelector />
        </div>
        <div className="main-content">
          <div className="right-top">
            <QueryEditor />
          </div>
          <div className="right-bottom">
            <ResultTable />
          </div>
        </div>
      </div>
    </QueryProvider>
  );
};

export default App;