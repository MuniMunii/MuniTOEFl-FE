import { authClient } from "@/lib/authClient";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedPage({children}:{children:React.ReactNode}){
    const {data:session,isPending,error}=authClient.useSession()
    const navigate=useNavigate()
  useEffect(() => {
    if (!isPending && (error || !session)) {
      navigate("/auth/login");
    }
  }, [isPending, error, session, navigate]);
  if (isPending) {
    return <div>Loading...</div>;
  }
  //fallback to prevent flicker during redirect
  if (!session) return null;
  return children
}