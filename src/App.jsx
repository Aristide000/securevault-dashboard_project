import { useState, useEffect } from 'react'
import TreeNode from './TreeNode'
import data from './data.json'
const folderNodes = data.filter(n => n.type === 'folder')
const rootFiles = data.filter(n => n.type === 'file')
function flattenVisible(nodes, openIds) {
  let result = []
  for (const node of nodes) {
if (!node) continue
 result.push(node)
if (node.type === 'folder' && openIds.has(node.id) && node.children) {
 result = result.concat(flattenVisible(node.children, openIds))}
  }
return result
}
function getExtension(fileName) {
if (fileName.startsWith('.')) return 'Config File'
if (!fileName.includes('.')) return 'N/A'
return fileName.split('.').pop().toUpperCase()
}
function App() {const [selectedFile, setSelectedFile] = useState(null)
const [focusedId, setFocusedId] = useState(null)
const [openIds, setOpenIds] = useState(new Set())
const [searchQuery, setSearchQuery] = useState('')
const [accordionMode, setAccordionMode] = useState(true)
 const visibleNodes = flattenVisible(data, openIds)
function toggleFolder(id, siblings) {
setOpenIds(prev => {
const next = new Set(prev)
if (next.has(id)) {
 next.delete(id)
} else {
if (accordionMode && siblings) {
siblings.forEach(sibId => next.delete(sibId)) }
next.add(id)}
return next
})
}useEffect(() => {
  function handleKeyDown(e) {
const currentIndex = visibleNodes.findIndex(n => n.id === focusedId)
if (e.key === 'ArrowDown') {
e.preventDefault()
const next = visibleNodes[currentIndex + 1]
if (next) setFocusedId(next.id)
}
 if (e.key === 'ArrowUp') {
 e.preventDefault()
const prev = visibleNodes[currentIndex - 1]
if (prev) setFocusedId(prev.id)}
if (e.key === 'ArrowRight') {
const node = visibleNodes[currentIndex]
if (node?.type === 'folder') setOpenIds(prev => new Set([...prev, node.id])) }
if (e.key === 'ArrowLeft') {
 const node = visibleNodes[currentIndex]
if (node?.type === 'folder') {setOpenIds(prev => {
 const next = new Set(prev)
next.delete(node.id)
return next
})
}}if (e.key === 'Enter') {
const node = visibleNodes[currentIndex]
if (node?.type === 'file') setSelectedFile(node)
 }}window.addEventListener('keydown', handleKeyDown)
  return () => window.removeEventListener('keydown', handleKeyDown)
}, [focusedId, visibleNodes])
return (
<div className="app">
<header className="topbar">
<div className="topbar-logo">🔒 SecureVault</div>
    <div className="topbar-badge"> Vault Secured</div>
    </header>
<div className="workspace">
<aside className="sidebar">
<div className="sidebar-scroll">
<div className="sidebar-label">VAULT EXPLORER</div>

<div className="sidebar-search">
<input
className="sidebar-search-input"
placeholder=" Search files and folders..."
value={searchQuery}
onChange={e => setSearchQuery(e.target.value)}
/></div>
<div className="sidebar-control">
<span className="toggle-label">View one folder at a time</span>
<div
className={`toggle-switch ${accordionMode ? 'on' : 'off'}`}
onClick={() => setAccordionMode(!accordionMode)}
 >
<div className="toggle-thumb"></div>
  </div>
</div>

<div className="sidebar-divider"></div>
{folderNodes.map((node) => (
   <TreeNode
   key={node.id}
     node={node}
   selectedId={selectedFile?.id}
      focusedId={focusedId}
      openIds={openIds}
    onSelect={setSelectedFile}
  onFocus={setFocusedId}
  onToggle={toggleFolder}
     searchQuery={searchQuery}
   levelSiblings={folderNodes
   .filter(n => n.id !== node.id)
   .map(n => n.id)
    }
    />
  ))}
  </div>
{rootFiles.length > 0 && (
 <div className="sidebar-pinned">
  <div className="sidebar-label">ROOT FILES</div>
 {rootFiles.map((node) => (
    <TreeNode
    key={node.id}
node={node}
    selectedId={selectedFile?.id}
focusedId={focusedId}
                  openIds={openIds}
       onSelect={setSelectedFile}
 onFocus={setFocusedId}
    onToggle={toggleFolder}
  searchQuery={searchQuery}
   levelSiblings={[]}
    />
  ))}
</div>
  )}
</aside>

<main className="main-area">
    {selectedFile ? (
<div>
  <div className="main-header">
  <span className="main-title">
                  📄 {selectedFile.name}
  </span>
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
   <span className="prop-val">{selectedFile.size}</span>            </div>
    <div className="prop-row">
          <span className="prop-key">Extension</span>
  <span className="prop-val">{getExtension(selectedFile.name)}</span>
</div>
</div>
</div>
) : (
<div className="empty-state">
<div className="empty-icon">🔒</div>
<div className="empty-text">Select a file to view its properties</div>
<div className="empty-sub">All files are encrypted and secure</div>
</div> )}
</main></div></div>)
}

export default App