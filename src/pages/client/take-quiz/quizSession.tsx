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
type OptimisticQuizUI=AnswerChoicesTestType&{
  selectedChoiceId:string|null
}
// Next problem should i add more endpoint to get attempt test user so it can be recovered from backend not only from cache
export default function QuizSessionPage() {
  const { type, testId } = useParams();
  const [order, setOrder] = useState<number>(1);
  const { data: quizData = [] } = useQuery({
    queryKey: ["quiz-session", type, testId],
    queryFn: async () => {
      const res = await apiClient.get(
        `/api/test-attempt/get-all-question/${type}/${testId}`,
      );
      return res.data.data as OptimisticQuizUI[];
    },
  });
  const quizOrder = useMemo(() => {
    return quizData.find((val) => val.order === order);
  }, [quizData, order]);
  useEffect(() => console.log(quizData), [quizData]);
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
  useEffect(() => console.log(quizOrder), [quizOrder]);
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
          param={{type,testId}}
          question={quizOrder}
          handleOrder={handleOrder}
        />
      )}
    </div>
  );
}
