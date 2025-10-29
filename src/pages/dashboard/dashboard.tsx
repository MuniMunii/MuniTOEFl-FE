import {useSession} from "@/hooks/useSession"
import { useEffect } from "react"

export default function Dashboard (){
const { data: session, isLoading, error } = useSession();
    useEffect(()=>{console.log(session)},[session])
    return (
    <div className="flex items-center justify-center h-screen font-bold">
        Dashboard
    </div>
  )
}