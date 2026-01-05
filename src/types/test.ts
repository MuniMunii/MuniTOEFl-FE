import {z} from 'zod'
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
export const questionScheme=z.object({
    /**
     * @Note
     * id:Temporary only for detecting question
     */
    cursorId:z.string(),
    testId:z.string(),//Ref from meta test
    order:z.number(),
    qTitle:z.string(),
    qDescription:serializedEditorStateSchema,
    choices:z.array(z.object({
        choiceId:z.string(),//ref like cursorId but for choices
        cTitle:z.string().trim().min(1,"Choices title cannot be empty"),
        correctAnswer:z.boolean()
    })).min(2,'Must contain atleast 2 elements').max(5,'5 is max elements')
})
export type SerializedEditorStateSchema=z.infer<typeof serializedEditorStateSchema>
export type questionType=z.infer<typeof questionScheme>