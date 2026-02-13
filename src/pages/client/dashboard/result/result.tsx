import { apiClient } from "@/api/axiosClient"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import type { Content } from '@tiptap/core'
import GraphResult from "@/components/fragments/client/lesson/result/graph"
import { Card, CardContent } from "@/components/ui/card"
export interface ResultProps{
qId:string;
qTitle:string;
qDescription:Content;
userChoice:string;
isCorrect:boolean;
}
export default function ResultPage(){
    const {attemptId}=useParams()
    const {data:result}=useQuery({
        queryKey:['result-data',attemptId],
        queryFn:async ()=>{
            const res=await apiClient.get(`/api/test-attempt/result/${attemptId}`)
            return res.data.data as ResultProps[]
        }
    })
    useEffect(()=>{console.log(result)},[result])
    return (
    <div className={"size-full min-h-screen bg-white flex justify-between md:flex-row"}>
        <Card className="min-w-fit h-fit flex flex-col md:w-1/2 lg:w-1/3 border border-gray-600 rounded-md justify-self-center self-center">
        <CardContent className="flex flex-1 items-center pb-0">
        <GraphResult chartData={result}/>
        </CardContent>
        </Card>
        <div className="min-w-fit w-full min-h-full p-4 border border-gray-500 rounded-md flex flex-col gap-4"></div>
    </div>)
}