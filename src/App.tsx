import React, { useState } from 'react';
import { QueryProvider } from './context/queryContext';
import QueryEditor from './components/queryEditor';
import QuerySelector from './components/querySelector';
import ResultTable from './components/resultTable';
import './index.css';

const App: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const sidebarWidth = showSidebar ? 250 : 50;

  return (
    <QueryProvider>
      <div className="app-container">
        <div className="content-container">
          <div
            className="sidebar-container"
            style={{ 
              width: `${sidebarWidth}px`, 
              minWidth: `${sidebarWidth}px`, 
              flexShrink: 0 
            }}
          >
            {showSidebar && <QuerySelector />}
            <button
              className="toggle-sidebar-button"
              onClick={() => setShowSidebar(prev => !prev)}
            >
              {showSidebar ? '<' : '>'}
            </button>
          </div>
          <div
            className="main-content"
            style={{ 
              flex: 1, 
              overflow: 'hidden'  
            }}
          >
            <div className="right-top">
              <QueryEditor />
            </div>
            <div className="right-bottom">
              <ResultTable />
            </div>
          </div>
        </div>
      </div>
    </QueryProvider>
  );
};

export default App;