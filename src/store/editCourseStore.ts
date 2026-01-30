import type { QuestionType} from "@/schemas/test";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { nanoid } from "nanoid";
import type { Content } from "@tiptap/core";
type State = {
  questions: QuestionType[];
  isDirty:boolean;
};
type Action = {
  setQuestion: (data: QuestionType[]) => void;
  addQuestionToStore: (question:QuestionType|null) => void;
  addChoices:  (cursorId:string)=>void;
  editQuestionTitle:(cursorId:string,value:string)=>void;
  editQuestionDescription:(cursorId:string,value:Content)=>void;
  editChoiceTitle:(cursorId:string,choiceId:string,value:string)=>void;
  selectCorrectAnswer:(cursorId:string,choiceId:string)=>void;
  deleteChoice:(cursorId:string,choiceId:string)=>void;
  deleteQuestionFromState:(cursorId:string)=>void;
  clearDirtyForm:()=>void;
};
export const addQuestionStore = create<State & Action>()(
  immer((set) => ({
    questions: [],
    isDirty:false,
    setQuestion: (data: QuestionType[]) =>
      set((state) => {
        state.isDirty = false
        state.questions = [...data].sort((a, b) => a.order - b.order).map(val=>({...val,cursorId:val.cursorId??nanoid(10),choices:val.choices.map(c=>({...c,choiceId:c.choiceId??nanoid(10)}))}));
      }),
    addQuestionToStore: (question:QuestionType|null) =>
      set((state) => {
        state.isDirty=true
        if(!question)return;
    state.questions.push({
      ...question,
      cursorId: question.cursorId ?? nanoid(10),
      choices: question.choices.map(c => ({
        ...c,
        choiceId: c.choiceId ?? nanoid(10),
      })),
    })
  }),
      addChoices:(cursorId:string)=>{
        set((state)=>{
        const question=state.questions.find((q)=>q.cursorId===cursorId)
        state.isDirty=true
        if(!question)return
        if(question.choices.length===5)return
        question?.choices.push({choiceId:nanoid(10),cTitle:'',correctAnswer:false})
        })
      },
      deleteQuestionFromState:(cursorId:string)=>{
        set((state)=>{
          state.questions=state.questions.filter(val=>val.cursorId!==cursorId)
        })
      },
      editChoiceTitle:(cursorId:string,choiceId:string,value:string)=>{
        set((state)=>{
          state.isDirty=true
          const question = state.questions.find(q => q.cursorId === cursorId);
          if(!question)return
          const choice=question.choices.find(c=>c.choiceId===choiceId)
          if(!choice)return
          choice.cTitle=value
        })
      },
      deleteChoice:(cursorId:string,choiceId:string)=>{
        set((state)=>{
          state.isDirty=true
          const question=state.questions.find((q)=>q.cursorId===cursorId)
          if(!question)return
          if (question.choices.length <= 1) return;
          const newChoice=question.choices.filter(c=>c.choiceId!==choiceId)
          question.choices=newChoice
        })
      },
      editQuestionDescription:(cursorId:string,value:Content)=>{
        set((state)=>{
          state.isDirty=true
          const question=state.questions.find((q)=>q.cursorId===cursorId)
          if(!question)return
          question.qDescription=value
        })
      },
      editQuestionTitle:(cursorId:string,value:string)=>{
        set((state)=>{
          state.isDirty=true
          const question=state.questions.find((q)=>q.cursorId===cursorId)
          if(!question)return
          question.qTitle=value
        })
      },
      selectCorrectAnswer:(cursorId:string, choiceId:string) =>{
        set((state)=>{
          state.isDirty=true;
          console.log(state.questions.find(q=>q.cursorId===cursorId));
          const question=state.questions.find((q)=>q.cursorId===cursorId)
          if(!question)return
          const choice=question.choices.find((c)=>c.choiceId===choiceId)
          if(!choice)return
          question.choices.forEach((c) => {
      c.correctAnswer = c.choiceId === choiceId;
    });
        })
      },
      clearDirtyForm:()=>{
        set((state)=>{
          state.isDirty=false
        })
      }
  }))
);