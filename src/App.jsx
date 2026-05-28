import { useState } from 'react'
import TreeNode from './TreeNode'
import data from './data.json'

function App() {
  const [selectedFile, setSelectedFile] = useState(null)

  return (
    <div className="app">

      <header className="topbar">
        <div className="topbar-logo">
          🔒 SecureVault
        </div>
        <div className="search-bar">
          🔍 Search files and folders...
        </div>
      </header>

      <div className="workspace">
        <aside className="sidebar">
          <div className="sidebar-label">VAULT</div>
          {data.map(node => (
            <TreeNode
              key={node.id}
              node={node}
              selectedId={selectedFile?.id}
              onSelect={setSelectedFile}
            />
          ))}
        </aside>

        <main className="main-area">
          {selectedFile ? (
            <div className="properties-panel">
              <div className="panel-title">📋 File Properties</div>
              <div className="prop-row">
                <span className="prop-key">Name</span>
                <span className="prop-val">{selectedFile.name}</span>
              </div>
              <div className="prop-row">
                <span className="prop-key">Type</span>
                <span className="prop-val">{selectedFile.type}</span>
              </div>
              <div className="prop-row">
                <span className="prop-key">Size</span>
                <span className="prop-val">{selectedFile.size}</span>
              </div>
            </div>
          ) : (
            <div className="empty-state">
              Select a file to view its properties
            </div>
          )}
        </main>
      </div>

    </div>
  )
}

export default App