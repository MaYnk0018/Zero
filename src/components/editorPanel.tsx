import React from 'react';
import QueryEditor from './queryEditor';
import ResultTable from './resultTable';


export interface EditorPanelProps {
  editorId: number;
}

const EditorPanel: React.FC<EditorPanelProps> = ({ editorId }) => {
  return (
    <div className="editor-panel">
      <QueryEditor editorId={editorId} />
      <ResultTable editorId={editorId} />
    </div>
  );
};

export default EditorPanel;
