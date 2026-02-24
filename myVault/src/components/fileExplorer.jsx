import React, { useState } from 'react'
import { ChevronRight, ChevronDown, Folder, FileText } from 'lucide-react'
import Tree from './data.json'

const depthPadding = {
  0: 'pl-0',
  1: 'pl-4',
  2: 'pl-8',
  3: 'pl-12',
  4: 'pl-16',
  5: 'pl-20',
}

const TreeNode = ({ node, depth = 0, path = '', onSelect }) => {
  const [open, setOpen] = useState(false)
  const isFolder = node.type === 'folder'
  const pad = depthPadding[depth] ?? 'pl-20'
  const currentPath = path ? `${path} / ${node.name}` : node.name

  const handleClick = () => {
    if (isFolder) {
      setOpen(o => !o)
    } else {
      onSelect({ ...node, path: currentPath })
    }
  }

  return (
    <div>
      <button
        className={`flex items-center gap-2 w-full text-left text-sm text-white/60 hover:text-white py-1.5 rounded-md hover:bg-white/5 transition-colors ${pad}`}
        onClick={handleClick}
      >
        {isFolder ? (
          open
            ? <ChevronDown size={13} className="text-[#00DCC8] shrink-0" />
            : <ChevronRight size={13} className="text-white/30 shrink-0" />
        ) : (
          <span className="w-[13px] shrink-0" />
        )}

        {isFolder
          ? <Folder size={14} className="text-[#4a90d9] shrink-0" />
          : <FileText size={14} className="text-white/40 shrink-0" />
        }

        <span className="flex-1 truncate">{node.name}</span>
        {node.size && <span className="text-white/25 text-[11px] pr-2 shrink-0">{node.size}</span>}
      </button>

      {isFolder && open && node.children?.map(child => (
        <TreeNode
          key={child.id}
          node={child}
          depth={depth + 1}
          path={currentPath}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}

const FileExplorer = ({ onSelect }) => {
  return (
    <div className="font-[poppins] bg-[#050810] min-h-screen flex-1 p-4 overflow-y-auto">
      <p className="text-white/25 text-[10px] uppercase tracking-widest px-3 mb-3">
        File Explorer
      </p>

      {Tree.map(node => (
        <TreeNode
          key={node.id}
          node={node}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}

export default FileExplorer