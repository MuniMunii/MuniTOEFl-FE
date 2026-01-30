import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertDialogContent } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetch } from "@/hooks/useFetch";
import type { metaTestDataType } from "@/schemas/meta-test";
import type { ActivatedVoucherType } from "@/schemas/voucher";
import { keepPreviousData } from "@tanstack/react-query";
import { BookX, CircleAlertIcon } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// interface dummyDataProps{
//     title:string,
//     length:number,
//     excerpt:string,
//     unlocked:boolean
// }
export default function WritingCard({type}:{type:string}){
    const {data:vouchers}=useFetch<ActivatedVoucherType[]>({
        queryKey:['activate-vouchers'],
        url:'/api/voucher/get-active-vouchers',
    })
    const voucherWritingIsActive = vouchers?.data?.some(
  (v) => v.typeV === type
) || false;
const navigate=useNavigate()
const {data:lesson,error:lessonError,isLoading:lessonLoading}=useFetch<metaTestDataType[]>({
    queryKey:['lesson-card',type],
    url:`/api/test/get-published-lesson/${type}`,
    options:{
        staleTime:60000,
        gcTime:5*60000,
        placeholderData:keepPreviousData,
    }
})
useEffect(()=>{console.log(vouchers,voucherWritingIsActive);console.log(lesson)},[vouchers,lesson])
if(lessonLoading){
    return (<div className="grid grid-cols-2 gap-4">
        {[1,2,3,4,5,6].map((_,i)=>{return (
        <div key={`skeleton-card-${i}`} className="w-full max-md:max-w-[500px] flex-col flex p-4 gap-4 shadow-md bg-white border border-gray-500/50 rounded-md h-full min-h-[200px]">
            <Skeleton className="rounded-full w-2/3 h-8 bg-gray-600 "/>
            <div className="flex flex-col gap-2">
                <Skeleton className="rounded-full h-4 bg-gray-500 delay-75!"/>
                <Skeleton className="rounded-full h-4 bg-gray-500 delay-100!"/>
                <Skeleton className="rounded-full h-4 bg-gray-500 delay-150!"/>
            </div>
            <div className="flex justify-between items-center">
                <Skeleton className="rounded-md w-32 bg-gray-500 h-8"/>
                <Skeleton className="rounded-md w-32 bg-gray-500 h-8"/>
            </div>
        </div>)
    })}
    </div>)
}
if(lesson?.data?.length===0){
    return (<Empty className="w-full">
        <EmptyHeader>
            <EmptyMedia variant={'icon'}>
                <BookX/>
            </EmptyMedia>
            <EmptyTitle>No lesson yet.</EmptyTitle>
        </EmptyHeader>
        <EmptyContent>
            <EmptyDescription>
                Wait for the update.
            </EmptyDescription>
        </EmptyContent>
    </Empty>)
}
if(lessonError){
    return (<Alert className="w-full" variant={'destructive'}>
                <CircleAlertIcon/>
            <AlertTitle>Error, please try again later or reload the page</AlertTitle>
            <AlertDescription>
                {`${lessonError?lessonError:''}`}
            </AlertDescription>
    </Alert>)
}
return (<div className="grid grid-cols-2 gap-4">
    {lesson?.data?.map((meta,i)=>{return (
<div key={`meta-card-${meta.titleSlug}`} className="w-full max-md:max-w-[500px] flex-col flex p-4 gap-4 shadow-md bg-white border border-gray-500/50 rounded-md h-full min-h-[200px]">
<h1>{meta.title}</h1>
<p className="text-ellipsis line-clamp-3">{meta.description}</p>
<div className="flex justify-between items-center">
    <p>{meta.isFree?'Free Lesson':'Unlock by buy the course'}</p>
    <Button className="w-32 p-2" onClick={()=>navigate('#')}>Take Lesson</Button>
</div>
</div>
    )})}
</div>)
}