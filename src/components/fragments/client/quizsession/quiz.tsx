import type { AnswerChoicesTestType } from "@/schemas/test-attempt";
import {useMemo} from "react";
import DOMPurify from "dompurify";
import StarterKit from "@tiptap/starter-kit";
import { generateHTML } from "@tiptap/core";
import type { JSONContent } from "@tiptap/core";
import { useMutate } from "@/hooks/useMutation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
function isJSONContent(value: unknown): value is JSONContent {
  return typeof value === "object" && value !== null && "type" in value;
}
// addmin more props for cache selected choice UI
type OptimisticUI=AnswerChoicesTestType&{
  selectedChoiceId:string|null
}
// for type context
type OptimisticContext={previous?:OptimisticUI[]}
export default function Quiz({
  question,
  handleOrder,
  param:{type,testId}
}: {
  question: OptimisticUI;
  handleOrder: (num: number) => void;
  param:{type:string|undefined,testId:string|undefined};
}) {
  const clientQuery=useQueryClient()
  // all UI/UX for selected Button etc are in here
  const selectChoiceMutate = useMutate<
    any,
    { questionId: string; choiceId: string; saved: boolean },
    OptimisticContext
  >({
    url: `/api/test-attempt/answer-question/${question.testId}`,
    method: "PATCH",
    options: {
      onMutate:async({questionId,choiceId})=>{
        // prevent stale network response
        await clientQuery.cancelQueries({queryKey:["quiz-session", type, testId]})
        // take control of cache get query first
        const previous=clientQuery.getQueryData<OptimisticUI[]>(["quiz-session", type, testId])
        // modify cache and input selectedChoiceID value
        clientQuery.setQueryData<OptimisticUI[]>(
          ["quiz-session", type, testId],
          (old=[])=>(old.map(q=>
            q._id===questionId?{...q,selectedChoiceId:choiceId}:q
          ))
        )
        return {previous}
      },
      onSuccess: () => {
        handleOrder(question.order + 1);
      },
      // Rollback for optimistic UI if it fail
      onError: (err,_vars,ctx) => {
        queryClient.setQueryData(["quiz-session", type, testId],ctx?.previous)
        toast(`${err.message}`);
      },
    },
  });
  const selectedChoiceId = question.selectedChoiceId??null
  const description = useMemo(() => {
    const desc = question.qDescription;
    if (!isJSONContent(desc)) return "";
    const DescriptiontoHtml = generateHTML(desc, [StarterKit]);
    return DOMPurify.sanitize(DescriptiontoHtml, {
      ALLOWED_TAGS: [
        // text structure
        "p",
        "br",
        // emphasis
        "strong",
        "em",
        "u",
        "s",
        "mark",
        "code",
        // links
        "a",
        // lists
        "ul",
        "ol",
        "li",
        // blocks
        "blockquote",
        "pre",
        // headings
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
      ],
      ALLOWED_ATTR: ["href", "target", "rel", "data-list"],
    });
  }, [question.qDescription]);
  function handleSelectChoice(
    questionId: string,
    choiceId: string,
    saved: boolean,
  ) {
    console.log("updating: ", question);
    selectChoiceMutate.mutate({ questionId, choiceId, saved });
  }
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: description }} />
      {question.choices.map((c) => {
        return (
          <Button
            key={`${c.cTitle},${c.questionId}`}
            className={`${selectedChoiceId === c.choiceId ? "bg-gray-500" : ""}`}
            disabled={selectChoiceMutate.isPending}
            onClick={() => {
              handleSelectChoice(question._id,c.choiceId,true)
            }}
          >
            {c.cTitle}
          </Button>
        );
      })}
    </div>
  );
}
