import React from 'react'
import { FileText, Folder, X } from 'lucide-react'

const Properties = ({ file, onClose }) => {
  if (!file) return null

  const isFolder = file.type === 'folder'

  return (
    <div className="font-[poppins] bg-[#050810] w-full h-full md:w-64 md:h-auto md:min-h-full border-l border-white/10 flex flex-col overflow-y-auto">

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0">
        <h2 className="text-white text-base font-semibold">Properties</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-white/30 hover:text-white/70 transition-colors p-1"
          >
            <X size={15} />
          </button>
        )}
      </div>

      <div className="flex flex-col p-5 gap-5">

        {/* Thumbnail */}
        <div className="bg-[#0d1220] border border-white/10 rounded-lg flex items-center justify-center h-32">
          {isFolder
            ? <Folder size={36} className="text-[#4a90d9]" />
            : <FileText size={36} className="text-white/30" />
          }
        </div>

        {/* FILENAME */}
        <div>
          <p className="text-white/25 text-[10px] uppercase tracking-widest mb-1">Filename</p>
          <p className="text-white text-sm font-medium break-all leading-snug">{file.name}</p>
        </div>

        {/* TYPE */}
        <div>
          <p className="text-white/25 text-[10px] uppercase tracking-widest mb-1.5">Type</p>
          <span className="inline-flex items-center border border-[#00DCC8]/30 rounded-full px-2.5 py-1 text-[#00DCC8] text-[11px] font-medium uppercase tracking-wider">
            {file.type}
          </span>
        </div>

        {/* SIZE */}
        {file.size && (
          <div>
            <p className="text-white/25 text-[10px] uppercase tracking-widest mb-1">Size</p>
            <p className="text-white text-xl font-bold">{file.size}</p>
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
    </div>
  )
}

export default Properties