import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { addQuestionStore } from "@/store/editCourseStore";
import { XSquare } from "lucide-react";
import { useState } from "react";
import { useShallow } from 'zustand/react/shallow'
export default function ChoicesList({cursorId,choices:{choiceId,cTitle}}:{cursorId:string,choices:{choiceId:string,cTitle:string,correctAnswer:boolean}}){
    const [title,setTitle]=useState(cTitle)
        const {editChoiceTitle,deleteChoice}=addQuestionStore(
            useShallow((state)=>({
                editChoiceTitle:state.editChoiceTitle,
            deleteChoice:state.deleteChoice,
            // selectCorrectAnswer:state.selectCorrectAnswer
        })))
    
    return(<>
    <RadioGroupItem key={`Radio-${choiceId}`} id={choiceId} value={choiceId}/>
                <Label id={title}/>
                <Input placeholder={"Input choice title here"} value={title} onChange={(e)=>setTitle(e.currentTarget.value)} onBlur={()=>editChoiceTitle(cursorId,choiceId,title)}/>
                <Button type="button" onClick={()=>deleteChoice(cursorId,choiceId)} className="p-2"><XSquare/></Button>
    </>
    )
}