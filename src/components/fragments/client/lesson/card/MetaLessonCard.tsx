import DynamicPagination from "@/components/fragments/dynamicPagination";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetch } from "@/hooks/useFetch";
import type { metaTestDataType } from "@/schemas/meta-test";
import type { ActivatedVoucherType } from "@/schemas/voucher";
import { keepPreviousData } from "@tanstack/react-query";
import { BookX, CircleAlertIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// interface dummyDataProps{
//     title:string,
//     length:number,
//     excerpt:string,
//     unlocked:boolean
// }
export default function LessonMetaCard({ type }: { type: string }) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data: vouchers } = useFetch<ActivatedVoucherType[]>({
    queryKey: ["activate-vouchers"],
    url: "/api/voucher/active-vouchers",
  });
  const voucherIsActive = vouchers?.data?.some((v) => v.typeV === type) || false;
  const navigate = useNavigate();
  const {
    data: lesson,
    error: lessonError,
    isLoading: lessonLoading,
  } = useFetch<metaTestDataType[]>({
    queryKey: ["lesson-card", type],
    url: `/api/test/metadata/published?type=${type}&page=${currentPage}`,
    options: {
      staleTime: 60000,
      gcTime: 5 * 60000,
      placeholderData: keepPreviousData,
    },
  });
  useEffect(() => {
    console.log(vouchers, voucherIsActive);
    console.log(lesson);
  }, [vouchers, lesson]);
  if (lessonLoading) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4, 5, 6].map((_, i) => {
          return (
            <div
              key={`skeleton-card-${i}`}
              className="w-full max-md:max-w-[500px] flex-col flex p-4 gap-4 shadow-md bg-white border border-gray-500/50 rounded-md h-full min-h-[200px]"
            >
              <Skeleton className="rounded-full w-2/3 h-8 bg-gray-600 " />
              <div className="flex flex-col gap-2">
                <Skeleton className="rounded-full h-4 bg-gray-500 delay-75!" />
                <Skeleton className="rounded-full h-4 bg-gray-500 delay-100!" />
                <Skeleton className="rounded-full h-4 bg-gray-500 delay-150!" />
              </div>
              <div className="flex justify-between items-center">
                <Skeleton className="rounded-md w-32 bg-gray-500 h-8" />
                <Skeleton className="rounded-md w-32 bg-gray-500 h-8" />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  if (lesson?.data?.length === 0) {
    return (
      <Empty className="w-full">
        <EmptyHeader>
          <EmptyMedia variant={"icon"}>
            <BookX />
          </EmptyMedia>
          <EmptyTitle>No lesson yet.</EmptyTitle>
        </EmptyHeader>
        <EmptyContent>
          <EmptyDescription>Wait for the update.</EmptyDescription>
        </EmptyContent>
      </Empty>
    );
  }
  if (lessonError) {
    return (
      <Alert className="w-full" variant={"destructive"}>
        <CircleAlertIcon />
        <AlertTitle>
          Error, please try again later or reload the page
        </AlertTitle>
        <AlertDescription>
          {`${lessonError ? lessonError : ""}`}
        </AlertDescription>
      </Alert>
    );
  }
  return (
    <div className="size-full min-h-[500px] flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        {lesson?.data?.map((meta) => {
          return (
            <div
              key={`meta-card-${meta.titleSlug}`}
              className="w-full relative max-md:max-w-[500px] overflow-hidden flex-col flex p-4 gap-4 shadow-md bg-white border border-gray-500/50 rounded-md h-full min-h-[200px]"
            >
                {(!meta.isFree&&!voucherIsActive)&&<div className={'absolute inset-0 size-full left-0 top-0 bg-gray-600/50 flex justify-center items-center pointer-events-auto z-10'}></div>}
              <h1>{meta.title}</h1>
              <p className="text-ellipsis line-clamp-3">{meta.description}</p>
              <div className="flex justify-between items-center">
                <p>{meta.isFree ? "Free Lesson" : ""}</p>
                {(!meta.isFree&&!voucherIsActive)?
                <Button className="w-32 p-2" type='button'>
                  Take Lesson
                </Button>:<Button className="w-32 p-2" type="button" onClick={() => navigate(`/take-test/${meta.type}/${meta._id}`)}>
                  Take Lesson
                </Button>}
              </div>
            </div>
          );
        })}
      </div>
      <div className="self-center mt-auto">
        <DynamicPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          total={lesson?.meta?.total ?? 1}
          pageSize={lesson?.meta?.page ?? 6}
        />
      </div>
    </div>
  );
}
