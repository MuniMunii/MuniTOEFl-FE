import { TrendingUp } from "lucide-react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { ResultProps } from "@/pages/client/dashboard/result/result";
import { useEffect, useState } from "react";
import { number } from "zod";
export default function GraphResult({
  chartData,
}: {
  chartData: ResultProps[] | undefined;
}) {
  const chartConfig = {
    correct: {
      label: "Correct",
      color: "var(--color-green-600)",
    },
    incorrect: {
      label: "Incorrect",
      color: "var(--color-red-600)",
    },
  } satisfies ChartConfig;
  const isCorrectLength = chartData?.filter((c) => c.isCorrect).length??0;
  const isFalseLength = chartData?.filter((c) => !c.isCorrect).length??0;
  const chartResult = [{ correct: isCorrectLength??0, incorrect: isFalseLength??0 }];
  useEffect(()=>console.log(chartResult),[chartResult])
  return (
    <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartResult}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold "
                        >
                          {isCorrectLength}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Correct Answer
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="correct"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-green-600)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="incorrect"
              fill="var(--color-red-600)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
  );
}
