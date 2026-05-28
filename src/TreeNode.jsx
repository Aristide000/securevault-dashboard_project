import { useState } from 'react'

function TreeNode({ node, selectedId, onSelect }) {
  const [isOpen, setIsOpen] = useState(false)

  const isFolder = node.type === 'folder'
  const isSelected = node.id === selectedId

  function handleClick() {
    if (isFolder) {
      setIsOpen(!isOpen)
    } else {
      onSelect(node)
    }
  }

  return (
    <div className="tree-node">
      <div
        className={`tree-row ${isSelected ? 'selected' : ''} ${isFolder ? 'folder-row' : 'file-row'}`}
        onClick={handleClick}
      >
        <span className="tree-icon">
          {isFolder ? (isOpen ? '📂' : '📁') : '📄'}
        </span>
        <span className="tree-label">{node.name}</span>
      </div>

      {isFolder && isOpen && node.children && (
        <div className="tree-children">
          {node.children.map(child => (
            <TreeNode
              key={child.id}
              node={child}
              selectedId={selectedId}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default TreeNode