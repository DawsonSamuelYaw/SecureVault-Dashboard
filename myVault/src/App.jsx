import { useState } from "react"
import Header from "./components/header"
import Sidebar from "./components/sidebar"
import FileExplorer from "./components/fileExplorer"
import Properties from "./components/Properties"

function App() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showSidebar, setShowSidebar] = useState(false)

  function handleFileSelect(file) {
    setSelectedFile(file)
    setShowSidebar(false)
  }

  return (
    <div className="bg-[#080A10] h-screen flex flex-col">
      <Header onSearch={setSearchTerm} onMenuToggle={() => setShowSidebar(o => !o)} />

      <div className="flex flex-1 overflow-hidden relative">
        <div className={`
          absolute inset-y-0 left-0 z-20 md:relative md:flex
          ${showSidebar ? 'flex' : 'hidden'}
        `}>
          <Sidebar onClose={() => setShowSidebar(false)} />
        </div>

        {showSidebar && (
          <div
            className="fixed inset-0 z-10 bg-black/50 md:hidden"
            onClick={() => setShowSidebar(false)}
          />
        )}

        <FileExplorer
          onSelect={handleFileSelect}
          searchTerm={searchTerm}
        />

        {selectedFile && (
          <div className="absolute inset-0 z-30 md:relative md:inset-auto md:z-auto">
            <Properties
              file={selectedFile}
              onClose={() => setSelectedFile(null)}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default App