import { apiClient } from "@/api/axiosClient";
import Quiz from "@/components/fragments/client/quizsession/quiz";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { AnswerChoicesTestType } from "@/schemas/test-attempt";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
type OptimisticQuizUI = AnswerChoicesTestType & {
  selectedChoiceId: string | null;
};
interface SavedAnswerType {
  testId: string;
  userId: string;
  status: "expired" | "in_progress" | "submitted";
  answers: {
    questionId: string;
    choiceId: string;
    saved: boolean;
  }[];
}
export default function QuizSessionPage() {
  const { type, testId } = useParams();
  const [order, setOrder] = useState<number>(1);
  const { data: quizData = [] } = useQuery({
    queryKey: ["quiz-session", type, testId],
    queryFn: async () => {
      const res = await apiClient.get(
        `/api/test-attempt/test/${testId}/questions?type=${type}`,
      );
      return res.data.data as OptimisticQuizUI[];
    },
  });
  const { data: savedAnswer } = useQuery({
    queryKey: ["saved-answer", type, testId],
    queryFn: async () => {
      const res = await apiClient.get(
        `/api/test-attempt/tests/${testId}/active-session`,
      );
      return res.data.data as SavedAnswerType;
    },
  });
  const quizOrder = useMemo(() => {
    return quizData.find((val) => val.order === order);
  }, [quizData, order]);
  const savedAnswerOrder = useMemo(() => {
    if (!savedAnswer) return;
    return savedAnswer.answers.find((c) =>
      quizOrder?.choices.some((qC) => qC.choiceId === c.choiceId),
    );
  }, [quizOrder, savedAnswer]);
  useEffect(
    () =>
      console.log({
        "savedAnswer: ": savedAnswer,
        savedAnswerOrder: savedAnswerOrder,
      }),
    [savedAnswer],
  );
  function handleOrder(num: number) {
    const parseNum = num.toString();
    localStorage.setItem("order", parseNum);
    setOrder(num);
  }
  useEffect(() => {
    if (quizData.length === 0) {
      localStorage.setItem("order", "1");
    }
    localStorage.setItem("order", String(order));
  }, [order]);
  // debugging
  // useEffect(() => console.log(quizData), [quizData]);
  // useEffect(() => console.log(quizOrder), [quizOrder]);
  return (
    <div className="size-full min-h-screen">
      <div className="w-full h-12 py-2 px-1 flex items-center bg-gray-800"></div>
      <Popover>
        <PopoverTrigger asChild>
          <Button type="button">Question</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="w-[120px] h-fit p-2 flex flex-wrap gap-2">
            {quizData.map((q) => (
              <Button
                key={`order-number-${q.order}`}
                onClick={() => handleOrder(q.order)}
                className="p-1 border border-gray-400 rounded-md"
              >
                {q.order}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      {quizOrder && (
        <Quiz
          key={quizOrder._id}
          param={{ type, testId }}
          lastQuestion={quizOrder.order === quizData.length}
          savedAnswer={savedAnswerOrder?.choiceId}
          question={quizOrder}
          handleOrder={handleOrder}
        />
      )}
    </div>
  );
}
