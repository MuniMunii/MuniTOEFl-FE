import { LoaderPinwheel } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export default function LoadingComponent(){
    return <div className="size-full min-h-screen flex justify-center items-center">
        <Card>
            <CardContent>
                <div className="flex flex-col items-center justify-center gap-4"><LoaderPinwheel size={64} className="animate-spin"/><p className="text-3xl font-bold">Loading...</p></div>
            </CardContent>
        </Card>
    </div>
}