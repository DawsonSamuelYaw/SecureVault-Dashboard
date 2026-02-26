import React from "react";
import {
  Vault,
  Share2,
  Clock,
  Trash2,
  ActivitySquare,
  Lock,
} from "lucide-react";

const NAV_ITEMS = [
  { id: 'vault',    icon: Vault,          label: 'My Vault' },
  { id: 'shared',   icon: Share2,         label: 'Shared',  badge: 3 },
  { id: 'recent',   icon: Clock,          label: 'Recent' },
  { id: 'trash',    icon: Trash2,         label: 'Trash' },
]

const SECURITY_ITEMS = [
  { id: 'activity', icon: ActivitySquare, label: 'Activity Log' },
  { id: 'encrypt',  icon: Lock,           label: 'Encryption' },
]

// activePage and onNavigate are passed down from App
// so the main content area knows which page to show
const Sidebar = ({ activePage, onNavigate }) => {
  return (
    <aside className="font-[poppins] flex flex-col h-screen w-56 bg-[#050810] border-r border-white/10 px-3 py-5">

      {/* Navigation section */}
      <div className="mb-6">
        <p className="text-white/25 text-[10px] uppercase tracking-widest px-2 mb-2">
          Navigation
        </p>

        <div className="flex flex-col gap-1">
          {NAV_ITEMS.map(({ id, icon: Icon, label, badge }) => (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors border
                ${activePage === id
                  ? 'bg-[#00DCC8]/10 text-[#00DCC8] border-[#00DCC8]/20'
                  : 'text-white/60 hover:text-white hover:bg-white/5 border-transparent'}
              `}
            >
              <Icon size={15} className="shrink-0" />
              <span className="flex-1 text-left">{label}</span>
              {/* Notification badge */}
              {badge && (
                <span className="bg-[#ff4d6d] text-white text-[10px] px-1.5 py-0.5 rounded-full">
                  {badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Security section */}
      <div>
        <p className="text-white/25 text-[10px] uppercase tracking-widest px-2 mb-2">
          Security
        </p>

        <div className="flex flex-col gap-1">
          {SECURITY_ITEMS.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors border
                ${activePage === id
                  ? 'bg-[#00DCC8]/10 text-[#00DCC8] border-[#00DCC8]/20'
                  : 'text-white/60 hover:text-white hover:bg-white/5 border-transparent'}
              `}
            >
              <Icon size={15} className="shrink-0" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Pushes user card to the bottom */}
      <div className="flex-1" />

    </aside>
  );
};

export default Sidebar;