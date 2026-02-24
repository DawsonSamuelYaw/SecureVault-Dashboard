import React from 'react'
import { FileText, Folder, X } from 'lucide-react'

const Properties = ({ file, onClose }) => {
  if (!file) return null

  const isFolder = file.type === 'folder'

  return (
    <div className="font-[poppins] bg-[#050810] min-h-screen w-64 p-5 border-l border-white/10 flex flex-col shrink-0">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-white text-base font-semibold">Properties</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-white/30 hover:text-white/70 transition-colors"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* Thumbnail */}
      <div className="bg-[#0d1220] border border-white/10 rounded-lg flex items-center justify-center h-28 mb-6">
        {isFolder
          ? <Folder size={36} className="text-[#4a90d9]" />
          : <FileText size={36} className="text-white/30" />
        }
      </div>

      {/* FILENAME */}
      <div className="mb-5">
        <p className="text-white/25 text-[10px] uppercase tracking-widest mb-1">Filename</p>
        <p className="text-white text-sm font-medium break-all">{file.name}</p>
      </div>

      {/* TYPE */}
      <div className="mb-5">
        <p className="text-white/25 text-[10px] uppercase tracking-widest mb-1.5">Type</p>
        <span className="inline-flex items-center gap-1.5 border border-[#00DCC8]/30 rounded-full px-2.5 py-1 text-[#00DCC8] text-[11px] font-medium uppercase">
          {file.type}
        </span>
      </div>

      {/* SIZE — only for files */}
      {file.size && (
        <div className="mb-5">
          <p className="text-white/25 text-[10px] uppercase tracking-widest mb-1">Size</p>
          <p className="text-white text-lg font-semibold">{file.size}</p>
        </div>
      )}

      {/* PATH */}
      {file.path && (
        <div>
          <p className="text-white/25 text-[10px] uppercase tracking-widest mb-1">Path</p>
          <p className="text-white/40 text-xs leading-relaxed break-all">{file.path}</p>
        </div>
      )}

    </div>
  )
}

export default Properties