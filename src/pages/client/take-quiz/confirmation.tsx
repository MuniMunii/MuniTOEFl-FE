import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutate } from "@/hooks/useMutation";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/api/axiosClient";
export default function ConfirmationTakeQuizPage(){
    const {type,testId}=useParams()
    const queryClient=useQueryClient()
    const {data:testSession}=useQuery({
        queryKey:['voucher-validation','test-session',type,testId],
     queryFn:async()=>{
        const res=await apiClient.get(`/api/voucher/voucher-session/${type}/${testId}`)
        return res.data
    }
    })
    useEffect(()=>{console.log(testSession)},[testSession])
    const navigate=useNavigate()
    const createTestMutate=useMutate<any,{type:string,testId:string}>({
        url:`/api/test-attempt/test/${testId}/attempts`,
        method:'POST',
        options:{
            onSuccess:()=>{
                queryClient.invalidateQueries({queryKey:['voucher-validation','test-session',type,testId]})
                return navigate(`/quiz-session/${type}/${testId}`)
            },
            onError:(error)=>{
                toast(`${error.message}`)
            }
        }
    })
    function handleCreateTest(type:string|undefined,testId:string|undefined){
        if(!type||!testId){
            return toast('Type or Testid is undefined')
        }
        return createTestMutate.mutate({type,testId})
    }
    return (
        <div className="size-full min-h-screen flex justify-center items-center">
            <Card>
                <CardHeader>
                    <CardTitle>Take Test</CardTitle>
                    <CardDescription>Do not cheat!!</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>You can still rejoin test later if the timer stil on</p>
                </CardContent>
                <CardFooter>
                    {typeof testSession.data==='string'?<Button type="button" onClick={()=>handleCreateTest(type,testId)}>Take test</Button>:<Button type="button" onClick={()=>navigate(`/quiz-session/${type}/${testId}`)}>Continue Test</Button>}
                </CardFooter>
            </Card>
        </div>
    )
}