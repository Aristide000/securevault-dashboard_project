function TreeNode({ node, selectedId, focusedId, openIds, onSelect, onFocus, onToggle, searchQuery, levelSiblings, parentMatches }) {
  if (!node) return null

  const isFolder = node.type === 'folder'
  const isSelected = node.id === selectedId
  const isFocused = node.id === focusedId
  const isOpen = openIds.has(node.id)

  const matchesSearch = searchQuery
    ? node.name.toLowerCase().includes(searchQuery.toLowerCase())
    : true

  const childrenMatchSearch = (nodes) => {
    if (!nodes) return false
    return nodes.some(child =>
      child.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (child.children && childrenMatchSearch(child.children))
    )
  }

  const isVisible = parentMatches ||
    !searchQuery ||
    matchesSearch ||
    (isFolder && childrenMatchSearch(node.children))

  if (!isVisible) return null

  const shouldOpen = isOpen || (searchQuery && isFolder && childrenMatchSearch(node.children))

  const thisMatches = !searchQuery || matchesSearch || parentMatches

  function handleClick() {
    onFocus(node.id)
    if (isFolder) {
      onToggle(node.id, levelSiblings || [])
    } else {
      onSelect(node)
    }
  }

  return (
    <div className="tree-node">
      <div
        className={`tree-row ${isSelected ? 'selected' : ''} ${isFocused ? 'focused' : ''}`}
        onClick={handleClick}
      >
<span className={`tree-chevron ${!isFolder && matchesSearch && searchQuery ? 'found' : ''}`}>
  {isFolder ? (shouldOpen ? '▼' : '▶') : (matchesSearch && searchQuery ? '▶' : '')}
</span>
<span className="tree-icon-box">
  {isFolder ? getFolderIcon(shouldOpen) : getFileIcon(node.name)}
</span>
<span className={`tree-label ${matchesSearch && searchQuery ? 'highlight' : ''}`}>
{node.name}
  </span>
</div>
{isFolder && shouldOpen && node.children && (
        <div className="tree-children tree-children-line">
          {node.children.filter(Boolean).map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              selectedId={selectedId}
              focusedId={focusedId}
              openIds={openIds}
              onSelect={onSelect}
              onFocus={onFocus}
              onToggle={onToggle}
              searchQuery={searchQuery}
              parentMatches={thisMatches}
              levelSiblings={node.children
                .filter(n => n && n.type === 'folder' && n.id !== child.id)
                .map(n => n.id)
 }/>))}</div>
 )}</div>)
}function getFolderIcon(isOpen) {
  if (isOpen) return '📂'
  return '📁'
}
function getFileIcon(name) {
  const parts = name.split('.')
  const ext = parts[parts.length - 1].toLowerCase()

  if (ext === 'pdf') return '📄'
  if (ext === 'png' || ext === 'jpg' || ext === 'jpeg') return '🖼️'
  if (ext === 'docx' || ext === 'doc') return '📝'
  if (ext === 'xlsx' || ext === 'xls') return '📊'
  if (ext === 'txt') return '📃'
  if (ext === 'yaml' || ext === 'yml') return '⚙️'
  if (ext === 'svg') return '🎨'
  if (ext === 'ttf') return '🔤'

  return '📄'
}

export default TreeNode