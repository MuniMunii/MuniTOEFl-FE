import { apiClient } from "@/api/axiosClient"
import QuestionBlock from "@/components/fragments/admin/edit-course/question-block";
import { Button } from "@/components/ui/button";
import type { metaTestDataType } from "@/schemas/test";
import { addQuestionStore } from "@/store/editCourseStore";
import type { questionType } from "@/types/test";
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { toast } from "sonner";
export default function EditCoursePage(){
    const {type,titleSlug}=useParams()
    const {questions,setQuestion,addQuestion}=addQuestionStore()
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
function hasEmptyChoiceTitle(questions: questionType[]): boolean {
  return questions.some(q =>
    q.choices.some(c => !c.cTitle.trim())
  );
}
useEffect(()=>{console.log(metaData?.titleSlug)},[metaData])
useEffect(()=>{
  if(questionError){toast(`error fetching data ${questionError.message}`);return}
    setQuestion(questionData??[])},[questionData])
    useEffect(()=>{console.log(questions)},[questions])
    return (
    <div className="size-full min-h-screen bg-white">
        <div className="w-[90%] h-full min-h-screen max-w-[1000px] border border-gray-400 rounded-md mx-auto p-4">
          <Button type="button" onClick={()=>addQuestion(testId)}>Add Question</Button>
          {questions.map(val=><QuestionBlock key={val.cursorId} {...val}/>)}
        </div>
    </div>)
}