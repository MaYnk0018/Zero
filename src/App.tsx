import React, { useState } from 'react';
import { QueryProvider } from './context/queryContext';
import QuerySelector from './components/querySelector';
import EditorPanel from './components/editorPanel';
import { PerformanceTracker } from './utility/performanceTracker';
import './index.css';

interface Editor {
  id: number;
  name: string;
}

const App: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [editors, setEditors] = useState<Editor[]>([{ id: 1, name: 'Editor 1' }]);
  const [activeEditor, setActiveEditor] = useState<number>(1);

  const sidebarWidth = showSidebar ? 250 : 50;

  const addEditor = () => {
    const newId = editors.length + 1;
    setEditors(prev => [...prev, { id: newId, name: `Editor ${newId}` }]);
    setActiveEditor(newId);
  };

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
              flexShrink: 0,
            }}
          >
            {showSidebar && <QuerySelector editorId={activeEditor} />}
            <button
              className="toggle-sidebar-button"
              onClick={() => setShowSidebar(prev => !prev)}
            >
              {showSidebar ? '<' : '>'}
            </button>
          </div>
          <div className="main-content">
          
            <div className="editor-tabs">
              {editors.map(editor => (
                <div
                  key={editor.id}
                  className={`editor-tab ${activeEditor === editor.id ? 'active' : ''}`}
                  onClick={() => setActiveEditor(editor.id)}
                >
                  {editor.name}
                </div>
              ))}
              <div className="editor-tab add-tab" onClick={addEditor}>
                +
              </div>
            </div>
         
            <div className="editor-content">
              {editors.map(editor =>
                editor.id === activeEditor ? (
                  <EditorPanel key={editor.id} editorId={editor.id} />
                ) : null
              )}
            </div>
          </div>
        </div>
      </div>
    </QueryProvider>
  );
};

export default App;
