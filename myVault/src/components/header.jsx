import React, { useState } from 'react'
import Lg from '/logo_vault.png'
import { Search, ArrowUpDown, LayoutGrid, Settings2, Menu, X } from 'lucide-react'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="font-[poppins] border-b border-white/10">
      
      <div className="flex items-center justify-between gap-4 px-6 py-4">

  
        <div className="flex items-center gap-2.5 shrink-0">
          <img src={Lg} alt="SecureVault logo" className="w-8 h-8 object-contain" />
          <div className="leading-tight">
            <h1 className="text-white text-[20px] font-semibold">SecureVault</h1>
            <p className="text-[#00DCC8] text-[10px] uppercase tracking-widest">Enterprise</p>
          </div>
        </div>

      
        <div className="hidden sm:flex items-center gap-2 border border-white/10 w-[50%] rounded-md px-4 py-1.5">
          <Search size={13} className="text-white/40 shrink-0" />
          <input
            type="text"
            placeholder="Search files and folders..."
            className="bg-transparent outline-none text-white/70 text-xs placeholder:text-white/25 w-full font-[poppins]"
          />
        </div>

       
        <div className="hidden sm:flex items-center gap-1.5">
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

        
        <button
          className="sm:hidden border border-white/10 rounded-md p-1.5 text-white/40 hover:text-white/70 transition-colors ml-auto"
          onClick={() => setMenuOpen(o => !o)}
        >
          {menuOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

     
      {menuOpen && (
        <div className="sm:hidden flex flex-col gap-3 px-6 pb-4 border-t border-white/10">
        
          <div className="flex flex-wrap items-center gap-1 text-xs pt-3">
            <span className="text-white/40">vault</span>
            <span className="text-white/20">/</span>
            <span className="text-white/40">01_Legal_Department</span>
            <span className="text-white/20">/</span>
            <span className="text-[#00DCC8]">Active_Cases</span>
          </div>

         
          <div className="flex items-center gap-2 border border-white/10 rounded-md px-3 py-2">
            <Search size={13} className="text-white/40 shrink-0" />
            <input
              type="text"
              placeholder="Search files and folders..."
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