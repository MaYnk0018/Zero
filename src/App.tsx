import React, { useState, useEffect } from 'react';
import { QueryProvider } from './context/queryContext';
import QueryEditor from './components/queryEditor';
import QuerySelector from './components/querySelector';
import ResultTable from './components/resultTable';
import './index.css';

const PerformanceTracker: React.FC = () => {
  const [loadTime, setLoadTime] = useState<number | null>(null);

  useEffect(() => {
    const startTime = performance.now();

    const calculateLoadTime = () => {
      const endTime = performance.now();
      const duration = Math.round(endTime - startTime);
      setLoadTime(duration);
    };

    window.addEventListener('load', calculateLoadTime);
    
    
    const timer = setTimeout(calculateLoadTime, 1000);

    return () => {
      window.removeEventListener('load', calculateLoadTime);
      clearTimeout(timer);
    };
  }, []);

  if (!loadTime) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.7)',
        color: 'white',
        padding: '5px 10px',
        borderRadius: '5px',
        zIndex: 1000,
        fontSize: '12px'
      }}
    >
      Load Time: {loadTime} ms
    </div>
  );
};


const App: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  const sidebarWidth = showSidebar ? 250 : 50;

  return (
    <QueryProvider>
      <PerformanceTracker />

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