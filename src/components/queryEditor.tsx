import React, { useState, useCallback, useEffect } from 'react';
import { useQueryContext } from '../context/queryContext';
import './QueryEditor.css';


interface CustomShortcut {
  id: string;
  key: string;
  modifier?: 'ctrlKey' | 'altKey' | 'metaKey' | 'shiftKey';
  action: 'RUN_QUERY' | string;
}

const QueryEditor: React.FC = () => {
  const { state, dispatch } = useQueryContext();
  const [queryText, setQueryText] = useState(state.currentQuery?.queryText || '');
  const [customShortcuts, setCustomShortcuts] = useState<CustomShortcut[]>([]);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [newShortcut, setNewShortcut] = useState<Partial<CustomShortcut>>({});



  useEffect(() => {
    const savedShortcuts = localStorage.getItem('customQueryShortcuts');
    if (savedShortcuts) {
      setCustomShortcuts(JSON.parse(savedShortcuts));
    }
  }, []);
  useEffect(() => {
    if (state.currentQuery?.queryText !== queryText) {
      setQueryText(state.currentQuery?.queryText || '');
    }
  }, [state.currentQuery]);


  useEffect(() => {
    localStorage.setItem('customQueryShortcuts', JSON.stringify(customShortcuts));
  }, [customShortcuts]);

  const handleRunQuery = useCallback(() => {
    if (queryText.trim() === '') return;

    dispatch({ type: 'SET_CURRENT_QUERY', payload: { queryText } });
    dispatch({ type: 'SET_LOADING', payload: true });
    setTimeout(() => {
      dispatch({ type: 'RUN_QUERY' });
    }, 500);
  }, [dispatch, queryText]);


  const addCustomShortcut = () => {
    if (newShortcut.key && newShortcut.action) {
      const shortcutToAdd: CustomShortcut = {
        id: Date.now().toString(),
        key: newShortcut.key,
        modifier: newShortcut.modifier,
        action: newShortcut.action
      };
      setCustomShortcuts([...customShortcuts, shortcutToAdd]);
      setNewShortcut({});
    }
  };


  const removeCustomShortcut = (id: string) => {
    setCustomShortcuts(customShortcuts.filter(shortcut => shortcut.id !== id));
  };


  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {

      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        event.preventDefault();
        handleRunQuery();
        return;
      }

      if (event.key === 'F5') {
        event.preventDefault();
        handleRunQuery();
        return;
      }

      customShortcuts.forEach(shortcut => {
        const modifierPressed = shortcut.modifier
          ? event[shortcut.modifier]
          : true;

        if (modifierPressed && event.key === shortcut.key) {
          event.preventDefault();


          switch (shortcut.action) {
            case 'RUN_QUERY':
              handleRunQuery();
              break;

            default:
              console.log(`Custom action: ${shortcut.action}`);
          }
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleRunQuery, customShortcuts]);

  return (
    <div className="query-editor">
      <div className="query-editor-main">
        <textarea
          className="query-editor-textarea"
          value={queryText}
          onChange={(e) => {
            const newQueryText = e.target.value;
            setQueryText(newQueryText);
          }}
          placeholder="Enter your SQL query here..."
        />

        {state.queryExplanation && (
          <div className="query-editor-explanation">
            <strong>Query Explanation:</strong> {state.queryExplanation}
          </div>
        )}

        <button
          onClick={() => setIsConfigOpen(!isConfigOpen)}
          className="config-shortcuts-button"
        >
          {isConfigOpen ? 'Close Shortcuts' : 'Configure Shortcuts'}
        </button>

        <button
          onClick={handleRunQuery}
          className="query-editor-button"
          disabled={queryText.trim() === ''}
        >
          Run Query
        </button>

        {state.isLoading && <div className="query-editor-loading" />}
        {state.error && <div className="query-editor-error">{state.error}</div>}

        <div className="keyboard-shortcuts-hint">
          Default Shortcuts: Ctrl/Cmd + Enter or F5 to run query
        </div>
      </div>

      {isConfigOpen && (
        <div className="shortcuts-config">
          <h3>Custom Shortcuts</h3>


          <div className="add-shortcut-form">
            <select
              value={newShortcut.modifier || ''}
              onChange={(e) => setNewShortcut({
                ...newShortcut,
                modifier: e.target.value as CustomShortcut['modifier']
              })}
            >
              <option value="">No Modifier</option>
              <option value="ctrlKey">Ctrl</option>
              <option value="altKey">Alt</option>
              <option value="metaKey">Cmd</option>
              <option value="shiftKey">Shift</option>
            </select>

            <input
              type="text"
              placeholder="Key (e.g., R)"
              maxLength={1}
              value={newShortcut.key || ''}
              onChange={(e) => setNewShortcut({
                ...newShortcut,
                key: e.target.value
              })}
            />

            <select
              value={newShortcut.action || ''}
              onChange={(e) => setNewShortcut({
                ...newShortcut,
                action: e.target.value
              })}
            >
              <option value="">Select Action</option>
              <option value="RUN_QUERY">Run Query</option>
            </select>

            <button onClick={addCustomShortcut}>Add Shortcut</button>
          </div>


          <div className="shortcuts-list">
            {customShortcuts.map(shortcut => (
              <div key={shortcut.id} className="shortcut-item">
                {shortcut.modifier ? `${shortcut.modifier.replace('Key', '')} + ` : ''}
                {shortcut.key} : {shortcut.action}
                <button onClick={() => removeCustomShortcut(shortcut.id)}>Remove</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QueryEditor;