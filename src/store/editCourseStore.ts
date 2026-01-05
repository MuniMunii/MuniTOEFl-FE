import type { questionType, SerializedEditorStateSchema } from "@/types/test";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { nanoid } from "nanoid";
type State = {
  questions: questionType[];
};
type Action = {
  setQuestion: (data: questionType[]) => void;
  addQuestion: (testId: string|undefined) => void;
  addChoices:  (cursorId:string)=>void;
  editQuestionTitle:(cursorId:string,value:string)=>void;
  editQuestionDescription:(cursorId:string,value:SerializedEditorStateSchema)=>void;
  editChoiceTitle:(cursorId:string,choiceId:string,value:string)=>void;
  deleteChoice:(cursorId:string,choiceId:string)=>void;
};
const EMPTY_EDITOR_STATE:SerializedEditorStateSchema = {
  root: {
    type: "root",
    version: 1,
    format: "",
    indent: 0,
    direction: "ltr",
    children: [],
  },
}
export const addQuestionStore = create<State & Action>()(
  immer((set) => ({
    questions: [],
    setQuestion: (data: questionType[]) =>
      set((state) => {
        state.questions = [...data].sort((a, b) => a.order - b.order).map(val=>({...val,cursorId:val.cursorId??nanoid(10),choices:val.choices.map(c=>({...c,choiceId:c.choiceId??nanoid(10)}))}));
      }),
    addQuestion: (testId:string|undefined) =>
      set((state) => {
        console.log(testId)
        if(!testId)return;
        const nextOrder =
          state.questions.length === 0
            ? 1
            : Math.max(...state.questions.map((q) => q.order)) + 1;
        state.questions.push({
          cursorId: nanoid(10),
          testId,
          qTitle: "Question Title",
          qDescription:EMPTY_EDITOR_STATE,
          order: nextOrder,
          choices: [
            {choiceId:nanoid(10),cTitle: "Title choice", correctAnswer: false },
            {choiceId:nanoid(10),cTitle: "Title choice", correctAnswer: true },
          ],
        });
      }),
      addChoices:(cursorId:string)=>{
        set((state)=>{
        const question=state.questions.find((q)=>q.cursorId===cursorId)
        if(!question)return
        question?.choices.push({choiceId:nanoid(10),cTitle:'Title choice',correctAnswer:false})
        })
      },
      editChoiceTitle:(cursorId:string,choiceId:string,value:string)=>{
        set((state)=>{
          const question = state.questions.find(q => q.cursorId === cursorId);
          if(!question)return
          const choice=question.choices.find(c=>c.choiceId===choiceId)
          if(!choice)return
          choice.cTitle=value
        })
      },
      deleteChoice:(cursorId:string,choiceId:string)=>{
        set((state)=>{
          const question=state.questions.find((q)=>q.cursorId===cursorId)
          if(!question)return
          if (question.choices.length <= 1) return;
          const newChoice=question.choices.filter(c=>c.choiceId!==choiceId)
          question.choices=newChoice
        })
      },
      editQuestionDescription:(cursorId:string,value:SerializedEditorStateSchema)=>{
        set((state)=>{
          const question=state.questions.find((q)=>q.cursorId===cursorId)
          if(!question)return
          question.qDescription=value
        })
      },
      editQuestionTitle:(cursorId:string,value:string)=>{
        set((state)=>{
          const question=state.questions.find((q)=>q.cursorId===cursorId)
          if(!question)return
          question.qTitle=value
        })
      }
  }))
);
