import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/fragments/client/dashboard/Sidebar/Sidebar";
import { authClient } from "@/api/authClient";
import { useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import ChartAttempt from "@/components/fragments/client/dashboard/chart/chart";
import TopBanner from "@/components/fragments/client/dashboard/banner/banner";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LessonCard from "@/components/fragments/client/dashboard/card/lessonCard";

export default function Dashboard() {
  const { data: session } = authClient.useSession();
  useEffect(() => {
    console.log(session);
  }, [session]);
  const isMobile = useIsMobile();
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="size-full min-h-screen flex">
        {isMobile && <SidebarTrigger />}
        <div className="size-full min-h-screen p-2 max-md:border-l max-md:border-l-gray-400 flex justify-center items-start">
          <div className="w-[95%] bg-white px-2 flex flex-col gap-4">
            <TopBanner/>
            {/* Main Chart Content */}
            <Card className="bg-teal-200">
              <CardContent className="flex max-md:flex-col gap-2">
                {/* Card description */}
                <Card className="p-4 border-none shadow-none">
                  <CardContent>
                    <h2 className="text-2xl font-semibold">Full Test</h2>
                    <p className="text-gray-500">Complete simulation of the TOEFL IBT test with all sections</p>
                  </CardContent>
                  <CardFooter className="mt-auto">
                    <Button className="w-full font-semibold">Take a full test</Button>
                  </CardFooter>
                </Card>
                {/* Card Chart */}
                <ChartAttempt />
              </CardContent>
            </Card>
            {/* Lesson card component */}
            <LessonCard/>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
