import Header from "./components/header"
import Sidebar from "./components/sidebar"
// import FileExplorer from "./components/fileExplorer"
// import Properties from "./components/Properties"

function App() {

  return (
    <>
    <div className="main bg-[#080A10] h-screen">
      <Header/>
      <Sidebar/>
    </div>
    {/* <Sidebar/>
    <FileExplorer/>
    <Properties/> */}
    </>
  )
}

export default App