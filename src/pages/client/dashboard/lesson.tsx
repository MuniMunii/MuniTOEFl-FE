import { AppSidebar } from "@/components/fragments/client/dashboard/Sidebar/Sidebar";
import MetaLessonCard from "@/components/fragments/client/lesson/card/MetaLessonCard";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowRight, BookMarked, Headphones, MicIcon, Pen } from "lucide-react";
import { useState } from "react";

export default function LessonPage(){
    const [isActive,setIsActive]=useState<'reading'|'listening'|'speaking'|'writing'>('writing')
      const isMobile = useIsMobile();
    return (
        <SidebarProvider>
            <AppSidebar/>
                  <div className="size-full min-h-screen flex">
                    {isMobile && <SidebarTrigger />}
                    <div className="size-full min-h-screen p-2 max-md:border-l max-md:border-l-gray-400 flex justify-center items-start">
                      <div className="w-[95%] min-h-screen h-full bg-gray-200 p-5 flex flex-col gap-4 rounded-md">
                        <div className="flex justify-between items-center">
                            <h1 className="font-semibold text-2xl">Practice Question</h1>
                            <p className="flex items-center gap-2 p-2 hover:underline">View Practice Records <ArrowRight className="size-4"/></p>
                        </div>
                        <div className="bg-gray-300 px-3 py-2 rounded-md">
                            <p className="text-slate-700"><span className="text-blue-700">Study Tip</span> Prepare with unlimited timed practice by type before the mock test</p>
                        </div>
                        <div className="flex gap-2">
                            <Button className={`flex items-center gap-2 hover:text-white rounded-full ${isActive==='writing'?'':'bg-white text-black'}`} onClick={()=>setIsActive('writing')}><Pen/>Writing</Button>
                            <Button className={`flex items-center gap-2 hover:text-white rounded-full ${isActive==='reading'?'':'bg-white text-black'}`} onClick={()=>setIsActive('reading')}><BookMarked/>Reading</Button>
                            <Button className={`flex items-center gap-2 hover:text-white rounded-full ${isActive==='listening'?'':'bg-white text-black'}`} onClick={()=>setIsActive('listening')}><Headphones/>Listening</Button>
                            <Button className={`flex items-center gap-2 hover:text-white rounded-full ${isActive==='speaking'?'':'bg-white text-black'}`} onClick={()=>setIsActive('speaking')}><MicIcon/>Speaking</Button>
                        </div>
                        <>
                            {isActive==='writing'&&<MetaLessonCard type={isActive}/>}
                            {isActive==='reading'&&<MetaLessonCard type={isActive}/>}
                            {isActive==='listening'&&<MetaLessonCard type={isActive}/>}
                            {isActive==='speaking'&&<MetaLessonCard type={isActive}/>}
                            </>
                      </div>
                      </div>
                    </div>
        </SidebarProvider>
    )
}