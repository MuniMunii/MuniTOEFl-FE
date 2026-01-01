import {z} from 'zod'
export const questionScheme=z.object({
    /**
     * @Note
     * id:Temporary only for detecting question
     */
    cursorId:z.string(),
    testId:z.string(),//Ref from meta test
    order:z.number(),
    qTitle:z.string(),
    choices:z.array(z.object({
        cTitle:z.string(),
        correctAnswer:z.boolean()
    })).min(2,'Must contain atleast 2 elements').max(5,'5 is max elements')
})
export type questionType=z.infer<typeof questionScheme>