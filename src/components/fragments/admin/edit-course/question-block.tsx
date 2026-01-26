import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { addQuestionStore } from "@/store/editCourseStore";
import type { questionType } from "@/types/test";
import { AlertCircleIcon, XSquare } from "lucide-react";
// import TextEditorQuestion from "./text-editor";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState } from "react";
import TextEditorTest from "./text-editor";
import { useMutate } from "@/hooks/useMutation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import ChoicesList from "./choices-list";

export default function QuestionBlock({question,questionLoading,questionError,order}:{order:Number,question:questionType,questionLoading:boolean,questionError:Error|null}){
    const {cursorId,qTitle,qDescription,testId,_id,choices}=question
    const [title,setTitle]=useState(qTitle)
    const [extend,setExtend]=useState<boolean>(false)
    const {addChoices,editQuestionTitle,deleteQuestionFromState,selectCorrectAnswer}=addQuestionStore()
    const deleteQuestionMutate=useMutate<any,{testId:string,_id:string}>({
        url:`/api/test/delete-question/${testId}/${_id}`,
        method:'DELETE',
        options:{
            onSuccess:()=>{
                deleteQuestionFromState(cursorId)
            }
        }
        }
    )
    if(questionLoading){return (
        <div className="w-full min-h-20 h-fit p-3 border border-gray-500 rounded-md flex flex-col gap-4">
            <Skeleton className="w-1/2 h-8 bg-gray-500/40"/>
            <Skeleton  className="w-full h-26 bg-gray-500/40"/>
            <div className="flex gap-4">
            <Skeleton  className="w-28 h-8 rounded-md bg-gray-500/40"/>
            <Skeleton  className="w-28 h-8 rounded-md bg-gray-500/40"/>
            </div>
            <div className="flex flex-col gap-2">
                <div className={"flex gap-3 items-center"}>
                    <Skeleton  className="size-3 rounded-full bg-gray-500/40"/>
                    <Skeleton  className="w-full h-8 rounded-md bg-gray-500/40"/>
                    <Skeleton  className="size-10 rounded-md bg-gray-500/40"/>
                </div>
                <div className={"flex gap-3 items-center"}>
                    <Skeleton  className="size-3 rounded-full bg-gray-500/40"/>
                    <Skeleton  className="w-full h-8 rounded-md bg-gray-500/40"/>
                    <Skeleton  className="size-10 rounded-md bg-gray-500/40"/>
                </div>
            </div>
        </div>
    )}
    if(questionError){
        return(
        <Alert variant={'destructive'}>
            <AlertCircleIcon/>
            <AlertTitle>Error, try again</AlertTitle>
            <AlertDescription>
                <ul>
                    <li>{questionError?.message}</li>
                </ul>
            </AlertDescription>
        </Alert>)
    }
    return <div className="w-full min-h-20 h-fit p-3 border border-gray-500 rounded-md">
        <div className="flex gap-3 items-center">
        <p>{`${order}`}</p>
        <Input className="w-full max-w-[450px]" value={title} onChange={(e)=>setTitle(e.currentTarget.value)} onBlur={()=>editQuestionTitle(cursorId,title)}/>
        </div>
        <Accordion type="single" collapsible >
            <AccordionItem value={cursorId}>
            <AccordionTrigger onClick={()=>setExtend((prev)=>!prev)}>{extend?'Hide':'Expand'} Description</AccordionTrigger>
            <AccordionContent>
        {/* <TextEditorQuestion key={cursorId} initialDescription={qDescription}/> */}
        <TextEditorTest cursorId={cursorId} initialDescription={qDescription}/>
        </AccordionContent>
        </AccordionItem>
        </Accordion>
        <div className="my-4 flex gap-4">
        <Button type="button" onClick={()=>addChoices(cursorId)}>Add Choices</Button>
        <Button type="button" onClick={()=>deleteQuestionMutate.mutate({_id,testId})}>Delete Question</Button>
        </div>
        <RadioGroup defaultValue={choices.find(q=>q.correctAnswer)?.choiceId??choices[0]?.choiceId} onValueChange={(choiceId)=>selectCorrectAnswer(cursorId,choiceId)}>
            {choices.map(c=><div key={c.choiceId} className="flex items-center gap-3">
                <ChoicesList choices={c} cursorId={cursorId} key={`choices-List-${c.choiceId}`}/>
            </div>)}
        </RadioGroup>
    </div>
}