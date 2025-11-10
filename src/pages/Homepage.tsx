import Navbar from "@/components/fragments/Navbar"
import { Outlet } from "react-router-dom"

const Homepage = () => {
  return (
    <>
    <Navbar/>
    <div className="flex items-center justify-center h-screen font-bold">
        
        Homepage
        <Outlet/>
    </div>
    </>
  )
}

export default Homepage