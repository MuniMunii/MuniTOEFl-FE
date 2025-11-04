
import { authClient } from "@/lib/authClient";
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

export default function Dashboard (){
 const { 
        data: session, 
        isPending,
        error,
    } = authClient.useSession()
    useEffect(()=>{console.log(session)},[session])

    const navigate=useNavigate()
    if(isPending){return <div>Loading</div>}
    if(error||!session){navigate('/auth/login')}
    return (
    <div className="flex items-center justify-center h-screen font-bold">
        Dashboard
    </div>
  )
}