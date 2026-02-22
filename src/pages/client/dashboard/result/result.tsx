import { apiClient } from "@/api/axiosClient"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import type { Content } from '@tiptap/core'
import GraphResult from "@/components/fragments/client/lesson/result/graph"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Collapsible } from "@/components/ui/collapsible"
import ResultCard from "@/components/fragments/client/lesson/result/resultcard"
export interface ResultProps{
qId:string;
qTitle:string;
qDescription:Content;
userChoice:string;
isCorrect:boolean;
}
export default function ResultPage(){
    const {attemptId}=useParams()
    const navigate=useNavigate()
    const {data:result}=useQuery({
        queryKey:['result-data',attemptId],
        queryFn:async ()=>{
            const res=await apiClient.get(`/api/test-attempt/results/${attemptId}`)
            return res.data.data as ResultProps[]
        }
    })
    useEffect(()=>{console.log(result)},[result])
    return (
    <div className={"size-full max-w-[1240px] relative mx-auto min-h-screen bg-white flex justify-between gap-4 flex-col lg:flex-row"}>
        <Card className="min-w-fit h-fit flex lg:sticky top-1 flex-col md:w-1/2 lg:w-1/3 border border-gray-600 rounded-md justify-self-center self-center lg:self-start">
        <CardContent className="flex flex-1 flex-col items-center pb-0">
        <GraphResult chartData={result}/>
        <Button variant={'outline'} className="w-full" onClick={()=>navigate('/record-practices')}>Back</Button>
        </CardContent>
        </Card>
        <div className="lg:max-w-[720px] w-[90%] mx-auto min-h-full p-4 border border-gray-500 rounded-md flex flex-col gap-4 relative">
            {result?.map((v,i)=>{
                return <ResultCard key={'result-card'+v.qTitle+i} order={i} result={v}/>
            })}
        </div>
    </div>)
}