import React from "react";
import {
  Vault,
  Share2,
  Clock,
  Trash2,
  ActivitySquare,
  Lock,
} from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="font-[poppins] flex flex-col h-screen w-56 bg-[#050810] border-r border-white/10 px-3 py-5">

      <div className="mb-6">
        <p className="text-white/25 text-[10px] uppercase tracking-widest px-2 mb-2">
          Navigation
        </p>

        <div className="flex flex-col gap-1">

          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm bg-[#00DCC8]/10 text-[#00DCC8] border border-[#00DCC8]/20">
            <Vault size={15} />
            <span className="flex-1 text-left">My Vault</span>
          </button>

          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-white/60 hover:text-white hover:bg-white/5 transition">
            <Share2 size={15} />
            <span className="flex-1 text-left">Shared</span>
            <span className="bg-[#ff4d6d] text-white text-[10px] px-1.5 py-0.5 rounded-full">
              3
            </span>
          </button>

          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-white/60 hover:text-white hover:bg-white/5 transition">
            <Clock size={15} />
            <span className="flex-1 text-left">Recent</span>
          </button>

          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-white/60 hover:text-white hover:bg-white/5 transition">
            <Trash2 size={15} />
            <span className="flex-1 text-left">Trash</span>
          </button>

        </div>
      </div>

      <div>
        <p className="text-white/25 text-[10px] uppercase tracking-widest px-2 mb-2">
          Security
        </p>

        <div className="flex flex-col gap-1">

          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-white/60 hover:text-white hover:bg-white/5 transition">
            <ActivitySquare size={15} />
            <span>Activity Log</span>
          </button>

          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-white/60 hover:text-white hover:bg-white/5 transition">
            <Lock size={15} />
            <span>Encryption</span>
          </button>

        </div>
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-2.5 px-2 py-2 rounded-md border border-white/10">
        <div className="w-7 h-7 rounded-full bg-[#00DCC8]/20 border border-[#00DCC8]/30 flex items-center justify-center">
          <span className="text-[#00DCC8] text-[10px] font-semibold">SD</span>
        </div>

        <div className="leading-tight overflow-hidden">
          <p className="text-white text-xs font-medium truncate">S. Dawson</p>
          <p className="text-white/30 text-[10px] truncate">Senior_Counsel</p>
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;