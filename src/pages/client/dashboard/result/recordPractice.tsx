import { apiClient } from "@/api/axiosClient";
import { AppSidebar } from "@/components/fragments/client/dashboard/Sidebar/Sidebar";
import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { SidebarProvider } from "@/components/ui/sidebar";
import { parseDateToID } from "@/lib/parseDateToID";
import { useQuery } from "@tanstack/react-query";
import { FolderHeart } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
interface ResultProps{}
interface ResultMetaProps{}
export default function RecordPracticePage() {
  const [type,setType]=useState<'all'|'listening'|'reading'|'speaking'|'writing'>('all')
  const navigate=useNavigate()
  const { data:result } = useQuery({
    queryKey: ["results",type],
    enabled:!!type,
    staleTime:60000,
    queryFn: async () => {
      const res = await apiClient.get(`/api/test-attempt/results?type=${type}`);
      console.log(res.data)
      return {data:res.data.data as any[],meta:res.data.meta}
    },
  });
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <div className="size-full min-h-screen bg-white p-4">
            <div className="size-full min-h-max p-4 rounded-md flex-col flex gap-4">
                <div className="flex gap-3 border-b border-b-gray-700 pb-4">
                    <Button onClick={()=>setType('all')}>All</Button>
                    <Button onClick={()=>setType('listening')}>Listening</Button>
                    <Button onClick={()=>setType('reading')}>Reading</Button>
                    <Button onClick={()=>setType('speaking')}>Speaking</Button>
                    <Button onClick={()=>setType('writing')}>Writing</Button>
                </div>
                <div className="size-full flex-col flex gap-4">
                    <div className="w-full h-fit p-4 flex justify-between items-center border-gray-400 border rounded-md shadow-sm">
                        <div className="w-full max-w-[400px] flex flex-col gap-2 line-clamp-3 text-ellipsis">
                            <h2 className="font-semibold text-2xl">Title</h2>
                            <p className="uppercase text-xs text-slate-500">Writing</p>
                        </div>
                        <div className="flex flex-col gap-3 items-center">
                            <Button onClick={()=>navigate(``)} variant={'secondary'}>Review</Button>
                            <p className="text-xs text-slate-500">{parseDateToID(new Date())}</p>
                        </div>
                    </div>
                {/* {result?.data.length===0||!result?.data?
                <Empty className="self-center justify-self-center">
                    <EmptyHeader>
                        <EmptyMedia variant={'icon'}>
                            <FolderHeart/>
                        </EmptyMedia>
                        <EmptyTitle>No practices record</EmptyTitle>
                        <EmptyDescription>You still not taking any lesson yet, go take lesson</EmptyDescription>
                        <EmptyContent>
                            <Button onClick={()=>navigate('/dashboard/lesson')}>Take a lesson</Button>
                        </EmptyContent>
                    </EmptyHeader>
                </Empty>:
                <div></div>} */}
                </div>
            </div>
        </div>
      </SidebarProvider>
    </>
  );
}
