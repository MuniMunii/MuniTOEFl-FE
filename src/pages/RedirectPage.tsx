import { authClient } from "@/api/authClient";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCheckIcon, XCircleIcon } from "lucide-react";
import { useEffect } from "react";
import {  useNavigate } from "react-router-dom";
export default function RedirectPage(){
    const {data:session,error,isPending}=authClient.useSession()
    const navigate=useNavigate()
  useEffect(() => {
    if (isPending) return;

    const timer = setTimeout(() => {
      if (error || !session) {
        navigate("/auth/login", { replace: true });
      } else {
        navigate(
          session.user.role === "admin"
            ? "/admin-dashboard"
            : "/dashboard",
          { replace: true }
        );
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isPending, error, session, navigate]);
    return <div className="size-full min-h-screen bg-white flex justify-center items-center">
        <Card className="size-[300px] rounded-md">
            <CardContent>
                <div className="w-full flex flex-col gap-3">
                    {error?<XCircleIcon/>:<CheckCheckIcon/>}
                    <p className="font-semibold text-black">{!error?"Redirecting to Dashboard":"Redirecting to login"}</p>
                </div>
            </CardContent>
        </Card>
    </div>
}