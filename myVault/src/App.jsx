import { useState } from "react"
import Header from "./components/header"
import Sidebar from "./components/sidebar"
import FileExplorer from "./components/fileExplorer"
import Properties from "./components/Properties"

const PAGE_LABELS = {
  shared: 'Shared',
  recent: 'Recent',
  trash: 'Trash',
  activity: 'Activity Log',
  encrypt: 'Encryption',
}

const UnderConstruction = ({ label }) => (
  <div className="font-[poppins] flex-1 flex flex-col items-center justify-center gap-4 text-center px-6">
    <div className="w-16 h-16 rounded-full bg-[#00DCC8]/10 border border-[#00DCC8]/20 flex items-center justify-center">
      <span className="text-2xl">🚧</span>
    </div>
    <h2 className="text-white text-lg font-semibold">{label}</h2>
    <p className="text-white/40 text-sm">This page is under construction.</p>
  </div>
)

function App() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showSidebar, setShowSidebar] = useState(false)
  const [activePage, setActivePage] = useState('vault')

  function handleFileSelect(file) {
    setSelectedFile(file)
    setShowSidebar(false)
  }

  function handleNavigate(page) {
    setActivePage(page)
    setSelectedFile(null)
  }

  return (
    <div className="bg-[#080A10] h-screen w-screen overflow-hidden flex flex-col">
      <Header
        onSearch={setSearchTerm}
        onMenuToggle={() => setShowSidebar(o => !o)}
      />

      <div className="flex flex-1 overflow-hidden relative">

        {showSidebar && (
          <div
            className="fixed inset-0 z-10 bg-black/60 md:hidden"
            onClick={() => setShowSidebar(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`
          fixed inset-y-0 left-0 z-20 md:relative md:flex md:inset-auto
          ${showSidebar ? 'flex' : 'hidden'}
        `}>
          <Sidebar
            activePage={activePage}
            onNavigate={(page) => {
              handleNavigate(page)
              setShowSidebar(false)
            }}
          />
        </div>

        {/* Main content */}
        <div className="flex flex-1 overflow-hidden min-w-0">
          {activePage === 'vault' ? (
            <FileExplorer onSelect={handleFileSelect} searchTerm={searchTerm} />
          ) : (
            <UnderConstruction label={PAGE_LABELS[activePage] ?? 'This page'} />
          )}
        </div>

        {selectedFile && (
          <div className="fixed inset-0 z-30 md:relative md:inset-auto md:z-auto md:flex md:shrink-0">
            <Properties file={selectedFile} onClose={() => setSelectedFile(null)} />
          </div>
        )}

      </div>
    </div>
  )
}

export default App