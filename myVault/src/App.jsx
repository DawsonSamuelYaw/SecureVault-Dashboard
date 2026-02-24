import { useState } from "react"
import Header from "./components/header"
import Sidebar from "./components/sidebar"
import FileExplorer from "./components/fileExplorer"
import Properties from "./components/Properties"

function App() {
  const [selectedFile, setSelectedFile] = useState(null)

  return (
    <div className="bg-[#080A10] h-screen flex flex-col">
      <Header file={selectedFile} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <FileExplorer onSelect={setSelectedFile} />
        {selectedFile && (
          <Properties
            file={selectedFile}
            onClose={() => setSelectedFile(null)}
          />
        )}
      </div>
    </div>
  )
}

export default App