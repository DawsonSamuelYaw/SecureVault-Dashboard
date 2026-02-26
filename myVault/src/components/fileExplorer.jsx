import React, { useState, useRef, useEffect } from 'react'
import { ChevronRight, ChevronDown, Folder, FileText } from 'lucide-react'
import Tree from './data.json'

// Pre-defined padding classes per depth level — Tailwind can't build dynamic class names at runtime
const depthPadding = {
  0: 'pl-0', 1: 'pl-4', 2: 'pl-8',
  3: 'pl-12', 4: 'pl-16', 5: 'pl-20',
}

// Returns a flat list of every node currently visible in the tree
// Used by keyboard navigation to move between nodes with arrow keys
function getVisibleNodes(nodes, openMap) {
  const visible = []
  function walk(list) {
    for (const node of list) {
      visible.push(node)
      if (node.type === 'folder' && openMap[node.id] && node.children?.length) {
        walk(node.children)
      }
    }
  }
  walk(nodes)
  return visible
}

// Recursively builds a human-readable path string for a given node id
function buildPath(nodes, targetId, pathSoFar = '') {
  for (const node of nodes) {
    const current = pathSoFar ? `${pathSoFar} / ${node.name}` : node.name
    if (node.id === targetId) return current
    if (node.children) {
      const found = buildPath(node.children, targetId, current)
      if (found) return found
    }
  }
  return ''
}

// Returns true if the node's name matches the search term,
// or if any of its descendants match (so parent folders stay visible)
function nodeMatchesSearch(node, term) {
  const nameMatches = node.name.toLowerCase().includes(term.toLowerCase())
  if (nameMatches) return true
  if (node.children?.length) {
    return node.children.some(child => nodeMatchesSearch(child, term))
  }
  return false
}

const TreeNode = ({ node, depth = 0, path = '', onSelect, selectedId, openMap, onToggle, focusedId, searchTerm }) => {
  const isFolder = node.type === 'folder'
  const isOpen = openMap[node.id] ?? false
  const currentPath = path ? `${path} / ${node.name}` : node.name
  const isSearching = searchTerm.length > 0

  // Hide this node entirely if it doesn't match the active search
  if (isSearching && !nodeMatchesSearch(node, searchTerm)) return null

  function handleClick() {
    if (isFolder) {
      onToggle(node.id)
    } else {
      onSelect({ ...node, path: currentPath })
    }
  }

  // While searching, force all matching folders open so results are visible
  const showChildren = isSearching ? true : isOpen
  const chevronOpen = showChildren

  return (
    <div>
      <button
        onClick={handleClick}
        className={`
          flex items-center gap-2 w-full text-left text-sm py-1.5 rounded-md transition-colors border-l-2
          ${depthPadding[depth] ?? 'pl-20'}
          ${selectedId === node.id
            ? 'bg-[#00DCC8]/10 text-[#00DCC8] border-[#00DCC8]'
            : 'text-white/60 hover:text-white hover:bg-white/5 border-transparent'}
          ${focusedId === node.id ? 'outline outline-1 outline-[#00DCC8]/40' : 'outline-none'}
        `}
      >
        {/* Chevron for folders, empty spacer for files to keep alignment */}
        {isFolder
          ? chevronOpen
            ? <ChevronDown size={13} className="text-[#00DCC8] shrink-0" />
            : <ChevronRight size={13} className="text-white/30 shrink-0" />
          : <span className="w-[13px] shrink-0" />
        }
        {isFolder
          ? <Folder size={14} className="text-[#4a90d9] shrink-0" />
          : <FileText size={14} className="text-white/40 shrink-0" />
        }
        <span className="flex-1 truncate">{node.name}</span>
        {node.size && <span className="text-white/25 text-[11px] pr-2 shrink-0">{node.size}</span>}
      </button>

      {/* Recursively render children if this folder is open */}
      {isFolder && showChildren && node.children?.map(child => (
        <TreeNode
          key={child.id}
          node={child}
          depth={depth + 1}
          path={currentPath}
          onSelect={onSelect}
          selectedId={selectedId}
          openMap={openMap}
          onToggle={onToggle}
          focusedId={focusedId}
          searchTerm={searchTerm}
        />
      ))}
    </div>
  )
}

const FileExplorer = ({ onSelect, searchTerm = '' }) => {
  const [openMap, setOpenMap] = useState({})      // tracks which folders are open
  const [selectedId, setSelectedId] = useState(null)  // clicked/entered file
  const [focusedId, setFocusedId] = useState(Tree[0]?.id ?? null)  // keyboard cursor
  const containerRef = useRef(null)

  // Auto-focus the container on mount so keyboard navigation works immediately
  useEffect(() => {
    containerRef.current?.focus()
  }, [])

  function handleToggle(id) {
    if (!searchTerm) {
      setOpenMap(prev => ({ ...prev, [id]: !prev[id] }))
    }
    setFocusedId(id)
  }

  function handleSelect(file) {
    setSelectedId(file.id)
    setFocusedId(file.id)
    onSelect(file)
  }

  function handleKeyDown(e) {
    const visible = getVisibleNodes(Tree, openMap)
    const index = visible.findIndex(n => n.id === focusedId)
    const current = visible[index]
    if (!current) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = visible[index + 1]
      if (next) setFocusedId(next.id)
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const prev = visible[index - 1]
      if (prev) setFocusedId(prev.id)
    }

    // ArrowRight expands a closed folder
    if (e.key === 'ArrowRight' && current.type === 'folder' && !openMap[current.id]) {
      e.preventDefault()
      setOpenMap(prev => ({ ...prev, [current.id]: true }))
    }

    // ArrowLeft collapses an open folder
    if (e.key === 'ArrowLeft' && current.type === 'folder' && openMap[current.id]) {
      e.preventDefault()
      setOpenMap(prev => ({ ...prev, [current.id]: false }))
    }

    if (e.key === 'Enter') {
      e.preventDefault()
      if (current.type === 'folder') {
        setOpenMap(prev => ({ ...prev, [current.id]: !prev[current.id] }))
      } else {
        setSelectedId(current.id)
        onSelect({ ...current, path: buildPath(Tree, current.id) })
      }
    }
  }

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="font-[poppins] bg-[#050810] min-h-screen flex-1 p-4 overflow-y-auto outline-none"
    >
      <p className="text-white/25 text-[10px] uppercase tracking-widest px-3 mb-3">
        File Explorer
      </p>

      {/* Empty state for search */}
      {searchTerm && !Tree.some(node => nodeMatchesSearch(node, searchTerm)) && (
        <p className="text-white/25 text-xs px-3">No results for "{searchTerm}"</p>
      )}

      {Tree.map(node => (
        <TreeNode
          key={node.id}
          node={node}
          depth={0}
          path=""
          onSelect={handleSelect}
          selectedId={selectedId}
          openMap={openMap}
          onToggle={handleToggle}
          focusedId={focusedId}
          searchTerm={searchTerm}
        />
      ))}
    </div>
  )
}

export default FileExplorer