import React, { useState } from 'react'
import Lg from '/logo_vault.png'
import { Search, ArrowUp, LayoutGrid, Settings, Menu, X } from 'lucide-react'

const Header = ({ onSearch, onMenuToggle, showSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  function handleMenuClick() {
    onMenuToggle?.()
  }

  return (
    <div className="font-[poppins] bg-[#080A10] border-b border-white/10 shrink-0">

      <div className="flex items-center gap-3 px-4 py-3 sm:px-6 sm:py-4">

        <button
          className="sm:hidden border border-white/10 rounded-md p-1.5 text-white/40 hover:text-white/70 transition-colors shrink-0"
          onClick={handleMenuClick}
        >
          {showSidebar ? <X size={16} /> : <Menu size={16} />}
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <img src={Lg} alt="SecureVault logo" className="w-7 h-7 sm:w-8 sm:h-8 object-contain" />
          <div className="leading-tight">
            <h1 className="text-white text-[16px] sm:text-[20px] font-semibold">SecureVault</h1>
            <p className="text-[#00DCC8] text-[9px] sm:text-[10px] uppercase tracking-widest">Enterprise</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 border ml-16 border-white/10 flex-1 max-w-[50%] rounded-md px-4 py-1.5">
          <Search size={13} className="text-white/40 shrink-0" />
          <input
            type="text"
            placeholder="Search files and folders..."
            onChange={e => onSearch(e.target.value)}
            className="bg-transparent outline-none text-white/70 text-xs placeholder:text-white/25 w-full font-[poppins]"
          />
        </div>

        {/* Action buttons — desktop only */}
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

        {/* Search dropdown toggle — mobile only */}
        <button
          className="sm:hidden border border-white/10 rounded-md p-1.5 text-white/40 hover:text-white/70 transition-colors shrink-0 ml-auto"
          onClick={() => setDropdownOpen(o => !o)}
        >
          <Search size={15} />
        </button>

        {/* User card — always visible, compact on mobile */}
        <div className="flex items-center gap-2 px-2 py-1.5 rounded-md border border-white/10 sm:ml-auto shrink-0">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#00DCC8]/20 border border-[#00DCC8]/30 flex items-center justify-center shrink-0">
            <span className="text-[#00DCC8] text-[9px] sm:text-[10px] font-semibold">SD</span>
          </div>
          <div className="hidden sm:block leading-tight overflow-hidden">
            <p className="text-white text-xs font-medium truncate">S. Dawson</p>
            <p className="text-white/30 text-[10px] truncate">Senior_Counsel</p>
          </div>
        </div>

      </div>

      {/* Mobile search dropdown */}
      {dropdownOpen && (
        <div className="sm:hidden flex flex-col gap-3 px-4 pb-4 border-t border-white/10">
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
              <ArrowUp size={14} />
            </button>
            <button className="border border-white/10 rounded-md p-1.5 text-white/40 hover:text-white/70 hover:border-white/20 transition-colors">
              <LayoutGrid size={14} />
            </button>
            <button className="border border-white/10 rounded-md p-1.5 text-white/40 hover:text-white/70 hover:border-white/20 transition-colors">
              <Settings size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Header