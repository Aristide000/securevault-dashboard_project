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
        <div className="topbar-badge">● Vault Secured</div>
      </header>

      <div className="workspace">
        <aside className="sidebar">
          <div className="sidebar-label">VAULT EXPLORER</div>
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
            <div>
              <div className="main-header">
                <span className="main-title">📄 {selectedFile.name}</span>
              </div>
              <div className="properties-panel">
                <div className="panel-title">📋 File Properties</div>
                <div className="prop-row">
                  <span className="prop-key">Name</span>
                  <span className="prop-val">{selectedFile.name}</span>
                </div>
                <div className="prop-row">
                  <span className="prop-key">Type</span>
                  <span className="prop-val">{selectedFile.type.toUpperCase()}</span>
                </div>
                <div className="prop-row">
                  <span className="prop-key">Size</span>
                  <span className="prop-val">{selectedFile.size}</span>
                </div>
                <div className="prop-row">
                  <span className="prop-key">Extension</span>
                  <span className="prop-val">
                    {selectedFile.name.includes('.')
                      ? selectedFile.name.split('.').pop().toUpperCase()
                      : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">🔒</div>
              <div className="empty-text">Select a file to view its properties</div>
              <div className="empty-sub">All files are encrypted and secure</div>
            </div>
          )}
        </main>
      </div>

    </div>
  )
}

export default App