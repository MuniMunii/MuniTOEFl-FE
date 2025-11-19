import { Card, CardContent } from "@/components/ui/card";
import { CheckCheckIcon } from "lucide-react";

export default function RedirectPage(){
    return <div className="size-full min-h-screen bg-white flex justify-center items-center">
        <Card className="size-[300px] rounded-md">
            <CardContent>
                <div className="w-full flex flex-col gap-3">
                    <CheckCheckIcon/>
                    <p className="font-semibold text-black">Redirecting to Dashboard</p>
                </div>
            </CardContent>
        </Card>
    </div>
}