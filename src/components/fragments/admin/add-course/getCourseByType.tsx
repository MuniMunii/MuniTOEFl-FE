import { apiClient } from "@/api/axiosClient"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { useMutate } from "@/hooks/useMutation"
import type { metaTestDataType } from "@/schemas/test"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { BoxIcon } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export default function GetCourseByType(){
    const navigate=useNavigate()
    const clientQuery=useQueryClient()
    const [type,setType]=useState<'writing'|'listening'|'speaking'|'reading'>('writing')
    const {data,error,isLoading}=useQuery<metaTestDataType[]>({
        queryFn:async ()=>{
            const res=await apiClient.post(`/api/test/get-test/${type}`)
            return res.data.data??[]
        },
        queryKey:['switch-typeTest-admin',type],
    })
    const mutateDeleteCourse=useMutate<any,{id:string}>({method:"DELETE",url:'/api/test/delete-test',options:{
        onSuccess:(data)=>{toast(data.message);clientQuery.invalidateQueries({queryKey:['switch-typeTest-admin']})},
        onError:(err)=>{toast(err.message)}
    }})
function handleDelete(id:string){return mutateDeleteCourse.mutate({id})}
    function RenderCourseContent(){
        if(error)return
        if(isLoading)return [1,2,3].map(val=><div className="h-[100px] w-full p-4 flex justify-between border border-gray-500/60 rounded-sm">
                <div key={`skeleton-${val}`} className="w-[200px]">
                    <Skeleton className="w-full h-8 mb-2 bg-gray-400"/>
                    <Separator/>
                    <div className="flex h-5 space-x-4 items-center mt-2">
                        <Skeleton className="w-1/2 h-5 bg-gray-400"/>
                        <Separator orientation="vertical"/>
                        <Skeleton className="w-1/2 h-5 bg-gray-400"/>
                    </div>
                </div>
                <div className="flex gap-3 items-center">
                    <Skeleton className="w-20 h-7 rounded-md bg-gray-400"/>
                    <Skeleton className="w-20 h-7 rounded-md bg-gray-400"/>
                </div></div>)
        if(data?.length===0)return(
            <Empty>
                    <EmptyHeader><BoxIcon/></EmptyHeader>
                    <EmptyTitle>No courses with this type yet</EmptyTitle>
                    <EmptyDescription>
                        You haven't created course yet, Get started with add courses
                    </EmptyDescription>
                </Empty>
        )
        return data?.map((val)=>{
                    return (
                    <div className="border border-gray-400 rounded-md p-4 flex justify-between">
                        <div className="w-fit">
                        <p className="font-semibold text-2xl">{val.title}</p>
                        <Separator/>
                        <div className="flex h-5 items-center space-x-4 text-sm mt-2">
                        <p className="capitalize">{val.isFree?'Free course':'Locked Content'}</p>
                        <Separator orientation="vertical"/>
                        <p>{val.time}</p>
                        </div>
                        </div>
                        <div className="flex gap-2 self-center">
                            <Button className="" type="button" onClick={()=>navigate(`/admin-dashboard/edit-course/${type}/${val.titleSlug}`)}>Edit</Button>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                            <Button className="" type="button">Delete</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Delete course</AlertDialogTitle>
                                    <AlertDialogDescription>This action will remove the courses. Are you sure want to delete?</AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={()=>handleDelete(val._id)}>Delete</AlertDialogAction>
                            </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                    )
                })
    }
    return (
        <div className="w-full">
            <div className="border border-yellow-400 flex gap-4 p-2">
                <Button type="button" onClick={()=>setType('writing')}>Writing</Button>
                <Button type="button" onClick={()=>setType('listening')}>Listening</Button>
                <Button type="button" onClick={()=>setType('speaking')}>Speaking</Button>
                <Button type="button" onClick={()=>setType('reading')}>Reading</Button>
            </div>
            <div className="flex flex-col gap-2 w-full mt-4">
               <RenderCourseContent/>
            </div>
        </div>
    )
}