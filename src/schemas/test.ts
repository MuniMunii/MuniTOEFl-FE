import {z} from 'zod'
import type { Content } from '@tiptap/core'
const serializedEditorStateSchema = z.object({
  root: z.object({
    type: z.string(),
    version: z.number(),
    format:z.string().optional(),
    indent:z.number().optional(),
    direction:z.enum(['ltr','rtl']).nullable(),
    children: z.array(z.any()),
  }),
})
const ContentSchema:z.ZodType<Content> = z.any()
export const QuestionScheme=z.object({
    /**
     * @Note
     * id:Temporary only for detecting question
     */
    _id:z.string(),
    cursorId:z.string(),
    testId:z.string(),//Ref from meta test
    order:z.number(),
    qTitle:z.string().trim().min(1,"Title cannot be empty"),
    qDescription:ContentSchema,
    choices:z.array(z.object({
        choiceId:z.string(),//ref like cursorId but for choices
        cTitle:z.string().trim().min(1,"Choices title cannot be empty"),
        correctAnswer:z.boolean()
    })).min(2,'Must contain atleast 2 elements').max(5,'5 is max elements')
})
export type SerializedEditorStateSchema=z.infer<typeof serializedEditorStateSchema>
export type QuestionType=z.infer<typeof QuestionScheme>