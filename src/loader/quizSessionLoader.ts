import { apiClient } from "@/api/axiosClient";
import { QueryClient } from "@tanstack/react-query";
import type { LoaderFunctionArgs } from "react-router-dom";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    },
  },
});
export default async function quizSessionLoader({params}:LoaderFunctionArgs){
    const {testId,type}=params
    if(!testId){throw new Response('Test id not found',{status:404})}
    await queryClient.ensureQueryData({
        queryKey:['quiz-session',testId,type],
        queryFn:async ()=>{
            const res =await apiClient.get(`/get-all-question/${type}/${testId}`)
            return res.data
        },
        
    })
    return null
}