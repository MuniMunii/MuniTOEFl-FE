import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
export default function ChartAttempt() {
    const chartData = [
  { value: "1-10", grade: 3 },
  { value: "11-20", grade: 5 },
  { value: "21-30", grade: 7 },
  { value: "31-40", grade: 10 },
  { value: "41-50", grade: 15 },
  { value: "51-60", grade: 17 },
  { value: "61-70", grade: 20 },
  { value: "71-80", grade: 26 },
  { value: "81-90", grade: 35 },
  { value: "91-100", grade: 20 },
  { value: "101-110", grade: 12 },
  { value: "111-120", grade: 6 },
];
const chartConfig = {
  grade: {
    label: "grade",
    color: "#2563eb",
  },
} satisfies ChartConfig;
const gradesTotal=chartData.reduce((sum,item)=>sum+item.grade,0)
const gradesAverage=14784/gradesTotal
const gradesMax=Math.max(...chartData.map((item) => item.grade))
  return (
    <Card className="size-fit w-full overflow-x-auto shadow-none">
      <CardHeader>
        {/* <CardTitle>Bar Chart</CardTitle> */}
        <CardDescription className="flex gap-2">
            <p>Attempts {gradesTotal}</p>
            <p>Max. {gradesMax}</p>
            <p>Avg. {gradesAverage.toFixed(2)}</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[200px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={"value"}
              tickLine={false}
              axisLine={false}
              tick={({ x, y, payload }) => (
                <text
                  x={x}
                  y={y}
                  dy={5}
                  cy={10}
                  textAnchor="start"
                  transform={`rotate(45, ${x}, ${y})`}
                  className="fill-muted-foreground text-[8px]"
                >
                  {payload.value}
                </text>
              )}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey={"grade"} fill="var(--color-grade)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
  //     return <ChartContainer config={chartConfig} className="max-h-[200px] w-full min-w-[320px] max-w-[400px] overflow-x-scroll">
  //         <BarChart accessibilityLayer data={chartData}>
  //             <CartesianGrid vertical={false}/>
  //             <XAxis
  //             dataKey={"value"}
  //             tickLine={false}
  //             axisLine={false}
  //               tick={({ x, y, payload }) => (
  //     <text
  //       x={x}
  //       y={y}
  //       dy={5}
  //       cy={10}
  //       textAnchor="start"
  //       transform={`rotate(45, ${x}, ${y})`}
  //       className="fill-muted-foreground text-[8px]"
  //     >
  //       {payload.value}
  //     </text>
  //   )}
  //             tickFormatter={(value)=>value.slice(0,3)}/>
  //             <ChartTooltip content={<ChartTooltipContent />} />
  //             <Bar dataKey={'attempt'} fill="var(--color-attempt)" radius={4}/>
  //         </BarChart>
  //     </ChartContainer>
}
