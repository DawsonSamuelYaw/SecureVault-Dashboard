import React, { useState } from 'react'
import Lg from '/logo_vault.png'
import { Search, ArrowUp, LayoutGrid, Settings, Menu, X } from 'lucide-react'

// Header receives onSearch from App.jsx so the search term
// can be shared with FileExplorer for filtering
const Header = ({ onSearch }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="font-[poppins] border-b border-white/10">

      <div className="flex items-center justify-between gap-4 px-6 py-4">

        {/* Logo */}
        <div className="flex items-center gap-2.5 shrink-0">
          <img src={Lg} alt="SecureVault logo" className="w-8 h-8 object-contain" />
          <div className="leading-tight">
            <h1 className="text-white text-[20px] font-semibold">SecureVault</h1>
            <p className="text-[#00DCC8] text-[10px] uppercase tracking-widest">Enterprise</p>
          </div>
        </div>

        {/* Search bar — calls onSearch every time the input changes */}
        <div className="hidden sm:flex items-center gap-2 border border-white/10 w-[50%] rounded-md px-4 py-1.5">
          <Search size={13} className="text-white/40 shrink-0" />
          <input
            type="text"
            placeholder="Search files and folders..."
            onChange={e => onSearch(e.target.value)}
            className="bg-transparent outline-none text-white/70 text-xs placeholder:text-white/25 w-full font-[poppins]"
          />
        </div>

        {/* Action buttons */}
        <div className="hidden sm:flex items-center gap-1.5">
          <button className="border border-white/10 rounded-md p-1.5 text-white/40 hover:text-white/70 hover:border-white/20 transition-colors">
            <ArrowUp size={14} />
          </button>
          <button className="border border-white/10 rounded-md p-1.5 text-white/40 hover:text-white/70 hover:border-white/20 transition-colors">
            <LayoutGrid size={14} />
          </button>
          <button className="border border-white/10 rounded-md p-1.5 text-white/40 hover:text-white/70 hover:border-white/20 transition-colors">
            <Settings size={14} />
          </button>
        </div>
         <div className="flex items-center gap-2.5 px-2 py-2 rounded-md border border-white/10">
        <div className="w-7 h-7 rounded-full bg-[#00DCC8]/20 border border-[#00DCC8]/30 flex items-center justify-center">
          <span className="text-[#00DCC8] text-[10px] font-semibold">SD</span>
        </div>

        <div className="leading-tight overflow-hidden">
          <p className="text-white text-xs font-medium truncate">S. Dawson</p>
          <p className="text-white/30 text-[10px] truncate">Senior_Counsel</p>
        </div>
      </div>

        {/* Hamburger — mobile only */}
        <button
          className="sm:hidden border border-white/10 rounded-md p-1.5 text-white/40 hover:text-white/70 transition-colors ml-auto"
          onClick={() => setMenuOpen(o => !o)}
        >
          {menuOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="sm:hidden flex flex-col gap-3 px-6 pb-4 border-t border-white/10">

          {/* Mobile search — same onSearch prop */}
          <div className="flex items-center gap-2 border border-white/10 rounded-md px-3 py-2 mt-3">
            <Search size={13} className="text-white/40 shrink-0" />
            <input
              type="text"
              placeholder="Search files and folders..."
              onChange={e => onSearch(e.target.value)}
              className="bg-transparent outline-none text-white/70 text-xs placeholder:text-white/25 w-full font-[poppins]"
            />
          </div>

          <div className="flex items-center gap-2">
            <button className="border border-white/10 rounded-md p-1.5 text-white/40 hover:text-white/70 hover:border-white/20 transition-colors">
              <ArrowUpDown size={14} />
            </button>
            <button className="border border-white/10 rounded-md p-1.5 text-white/40 hover:text-white/70 hover:border-white/20 transition-colors">
              <LayoutGrid size={14} />
            </button>
            <button className="border border-white/10 rounded-md p-1.5 text-white/40 hover:text-white/70 hover:border-white/20 transition-colors">
              <Settings2 size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Header