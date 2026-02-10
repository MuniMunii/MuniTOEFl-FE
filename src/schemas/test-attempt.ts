import {z}from 'zod'
import { ContentSchema } from './test'
export const answersTestAttemptSchema=z.object({
        cTitle:z.string(),
        questionId:z.string(), // referencing _id from questions-test
        choiceId:z.string(),
        saved:z.boolean().default(false)
    }).strict()
export const answerChoiceTestAttempt=z.object({
    _id:z.string(),
    testId:z.string(),
    qDescription:ContentSchema,
    order:z.number(),
    qTitle:z.string(),
    choices:z.array(answersTestAttemptSchema),
})
export type AnswerChoicesTestType=z.infer<typeof answerChoiceTestAttempt>