import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { addQuestionStore } from "@/store/editCourseStore";
import type { questionType } from "@/types/test";
import { XSquare } from "lucide-react";
// import TextEditorQuestion from "./text-editor";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState } from "react";
import TextEditorTest from "./text-editor";
import { useMutate } from "@/hooks/useMutation";

export default function QuestionBlock(question:questionType){
    const {choices,cursorId,qTitle,qDescription,testId,_id}=question
    const [extend,setExtend]=useState<boolean>(false)
    const {editChoiceTitle,addChoices,deleteChoice,editQuestionTitle,deleteQuestionFromState}=addQuestionStore()

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
    return <div className="w-full min-h-20 h-fit p-3 border border-gray-500 rounded-md">
        <Input className="w-full max-w-[450px]" value={qTitle} onChange={(e)=>editQuestionTitle(cursorId,e.currentTarget.value)}/>
        <Accordion type="single" collapsible >
            <AccordionItem value={cursorId}>
            <AccordionTrigger onClick={()=>setExtend((prev)=>!prev)}>{extend?'Hide':'Expand'} Description</AccordionTrigger>
            <AccordionContent>
        {/* <TextEditorQuestion key={cursorId} initialDescription={qDescription}/> */}
        <TextEditorTest cursorId={cursorId} initialDescription={qDescription}/>
        </AccordionContent>
        </AccordionItem>
        </Accordion>
        <div>
        <Button type="button" onClick={()=>addChoices(cursorId)}>Add Choices</Button>
        <Button type="button" onClick={()=>deleteQuestionMutate.mutate({_id,testId})}>Delete Question</Button>
        </div>
        <RadioGroup defaultValue={choices[0].choiceId}>
            {choices.map(c=><div key={c.choiceId} className="flex items-center gap-3">
                <RadioGroupItem key={`Radio-${c.choiceId}`} value={c.choiceId}/>
                <Label id={c.cTitle}/>
                <Input placeholder={c.cTitle??"Input form here"} value={c.cTitle} onChange={(e)=>editChoiceTitle(cursorId,c.choiceId,e.currentTarget.value)}/>
                <Button type="button" onClick={()=>deleteChoice(cursorId,c.choiceId)} className="p-2"><XSquare/></Button>
            </div>)}
        </RadioGroup>
    </div>
}