import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Notebook, PersonStanding } from "lucide-react";

interface LessonProps {
  type: string;
  attempts: number;
  questionLength: number;
  questionList: string[];
  averageValue: number;
}
export default function LessonCard() {
  const LessonData: LessonProps[] = [
    {
      type: "Reading",
      attempts: 73,
      questionLength: 28,
      questionList: [
        "Factual Information",
        "Negative Factual Information",
        "Rheotorical Purpose",
        "Vocabulary",
        "Insert Text",
        "Sentence Simplification",
        "Inference",
        "Summary",
      ],
      averageValue: 19,
    },
    {
      type: "Listening",
      attempts: 34,
      questionLength: 28,
      questionList: [
        "Attitude",
        "Detail",
        "Function",
        "Inference",
        "Gist-Content and Purpose",
        "Organization",
        "Connecting Content",
      ],
      averageValue: 19.1,
    },
    {
      type: "Speaking",
      attempts: 73,
      questionLength: 28,
      questionList: ["Integrated", "Independent"],
      averageValue: 19,
    },
    {
      type: "Writing",
      attempts: 73,
      questionLength: 28,
      questionList: ["Integrated", "Academic Discussion"],
      averageValue: 19,
    },
  ];
  function CardComponent() {
    return LessonData.map((value) => {
      return (
        <Card
          key={value.type}
          className="w-full max-w-[450px] h-[400px] pt-0 overflow-hidden"
        >
          <CardHeader className="p-0 bg-amber-300 flex justify-items item-center py-4 px-3">
            <div className="flex justify-between item-center w-full">
              <p>{value.type}</p>
              <p className="flex items-center">
                <span>
                  <PersonStanding />
                </span>{" "}
                Attempts {value.attempts}
              </p>
            </div>
          </CardHeader>
          <CardContent className="h-full">
            <div className="size-full grow flex flex-col justify-center gap-3 items-center">
              <div className="w-full flex justify-between items-center">
                <p className="flex items-center">
                  <span>
                    <Notebook />
                  </span>{" "}
                  {value.questionLength}
                </p>
                <p>Avg {value.averageValue}/30</p>
              </div>
              <div className="bg-blue-200 size-full max-h-[200px] flex flex-col p-3 rounded-md">
                <h3 className="text-base font-semibold">Question type</h3>
                <ul className="list-disc pl-5 columns-2 gap-8 max-sm:text-xs max-sm:columns-1">
                  {value.questionList.map((v) => (
                    <li key={v + value.type}>{v}</li>
                  ))}
                </ul>
              </div>
              <Button className="justify-self-end-safe self-center w-full">
                Take a Sectional Test
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    });
  }
  return (
    <div className="mx-auto flex flex-wrap gap-4 lg:row-2 justify-center">
      <CardComponent />
    </div>
  );
}
