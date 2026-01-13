import { apiClient } from "@/api/axiosClient"
import QuestionBlock from "@/components/fragments/admin/edit-course/question-block";
import { Button } from "@/components/ui/button";
import { useMutate } from "@/hooks/useMutation";
import type { metaTestDataType } from "@/schemas/meta-test";
import { addQuestionStore } from "@/store/editCourseStore";
import type { questionType } from "@/types/test";
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { toast } from "sonner";
export default function EditCoursePage(){
    const {type,titleSlug}=useParams()
    const queryClient=useQueryClient()
    const {questions,setQuestion,addQuestionToStore,isDirty,clearDirtyForm}=addQuestionStore()
const { data:metaData, isLoading:metaLoading, error:metaError } = useQuery<metaTestDataType>({
  queryKey: ["metadata-test", type, titleSlug],
  queryFn: async () =>{
    const res=await apiClient.post(`/api/test/get-metadata-test/${type}/${titleSlug}`)
  return res.data.data as metaTestDataType},
  enabled: !!type && !!titleSlug,
});
const testId=metaData?._id
const { data:questionData, isLoading:questionLoading, error:questionError } = useQuery<questionType[]>({
  queryKey: ["question-test", metaData?._id],
  queryFn:async () =>{
    const res=await apiClient.post(`/api/test/get-question/admin/${testId}`)
  return res.data.data as questionType[]??[]},
  enabled: Boolean(metaData?._id),
  
});
    const addQuestionMutate=useMutate<questionType,{testId:string|undefined}>({
      options:{
        onSuccess:(data)=>{addQuestionToStore(data.data)}
      },
      method:'POST',
      url:`/api/test/add-question/${testId}`,
    })
    const saveQuestionMutate=useMutate<any,{testId:string,questions:questionType[]}>({
      options:{
        onSuccess:()=>{toast('Saved');clearDirtyForm();queryClient.invalidateQueries({queryKey:['question-test']})}
      },
      url:`/api/test/save-questions/${testId}/save`,
      method:'PATCH',
      
    })
    async function handleAddQuestion(){
      if(!testId)return 
      return addQuestionMutate.mutate({testId})
    }
    async function handleSaveQuestion(){
      if(!testId)return 
      return saveQuestionMutate.mutate({testId,questions})
    }
useEffect(()=>{console.log(metaData?.titleSlug)},[metaData])
useEffect(()=>{
  if(questionError){toast(`error fetching data ${questionError.message}`);return}
    setQuestion(questionData??[])},[questionData])
    useEffect(()=>{console.log(questions)},[questions])

    return (<>
    <div className="size-full min-h-screen bg-white">
        <div className="w-[90%] h-full min-h-screen max-w-[1000px] border border-gray-400 rounded-md mx-auto p-4">
          <div className="w-full">
            <h1>{metaData?.title}</h1>
            <h2>{metaData?.description}</h2>
            <h2>status:{metaData?.published}</h2>
            <h2>time:{metaData?.time}</h2>
          </div>
          <Button type="button" onClick={handleAddQuestion} disabled={addQuestionMutate.isPending}>Add Question</Button>
          <div className="flex flex-col gap-4 mt-4">
          {questions.map(val=><QuestionBlock key={val.cursorId} {...val}/>)}
          </div>
        </div>
    </div>
    <Button type="button"
     onClick={handleSaveQuestion} 
    disabled={!isDirty} className="fixed bottom-3 right-3">Save Question</Button>
    </>
    )
}