import type { questionType } from "@/types/test";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { nanoid } from "nanoid";
type State = {
  questions: questionType[];
};
type Action = {
  setQuestion: (data: questionType[]) => void;
  addQuestion: (testId: string|undefined) => void;
};
export const addQuestionStore = create<State & Action>()(
  immer((set) => ({
    questions: [],
    setQuestion: (data: questionType[]) =>
      set((state) => {
        state.questions = [...data].sort((a, b) => a.order - b.order).map(val=>({...val,cursorId:val.cursorId??nanoid(10)}));
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
          order: nextOrder,
          choices: [
            { cTitle: "Choices title 1", correctAnswer: false },
            { cTitle: "Choices title 2", correctAnswer: true },
          ],
        });
      }),
  }))
);
