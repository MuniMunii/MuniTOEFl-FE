import {useSession} from "@/hooks/useSession"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

export default function Dashboard (){
const { data: session, isLoading, error } = useSession();
    useEffect(()=>{console.log(session)},[session])
    const navigate=useNavigate()
    if(isLoading){return <div>Loading</div>}
    if(error){return navigate('/auth/login')}
    return (
    <div className="flex items-center justify-center h-screen font-bold">
        Dashboard
    </div>
  )
}