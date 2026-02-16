import { apiClient } from "@/api/axiosClient";
import { queryClient } from "@/lib/queryClient";
import type { LoaderFunctionArgs } from "react-router-dom";
export default async function quizSessionLoader({params}:LoaderFunctionArgs){
    const {testId,type}=params
    if(!testId){throw new Response('Test id not found',{status:404})}
    await queryClient.ensureQueryData({
        queryKey:['quiz-session',testId,type],
        queryFn:async ()=>{
            const res =await apiClient.get(`/api/test-attempt/all-question/${type}/${testId}`)
            return res.data
        },
        
    })
    return null
}