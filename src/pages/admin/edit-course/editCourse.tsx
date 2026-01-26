import { apiClient } from "@/api/axiosClient";
import EditMetaTest from "@/components/fragments/admin/edit-course/edit-metaTest";
import QuestionBlock from "@/components/fragments/admin/edit-course/question-block";
import BlockerModal from "@/components/fragments/confirmLeaveModal";
import { Button } from "@/components/ui/button";
import { useBeforeUnload } from "@/hooks/useBeforeUnload";
import { useMutate } from "@/hooks/useMutation";
import type { metaTestDataType } from "@/schemas/meta-test";
import { addQuestionStore } from "@/store/editCourseStore";
import type { questionType } from "@/types/test";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link, useBlocker, useParams } from "react-router-dom";
import { toast } from "sonner";
export default function EditCoursePage() {
  const { type, titleSlug } = useParams();
  const queryClient = useQueryClient();
  const {
    questions,
    setQuestion,
    addQuestionToStore,
    clearDirtyForm,
    isDirty,
    // setChoicesForQuestion,
  } = addQuestionStore();
const blocker = useBlocker(isDirty);
useBeforeUnload(isDirty)
  const {
    data: metaData,
    isLoading: metaLoading,
    error: metaError,
  } = useQuery<metaTestDataType>({
    queryKey: ["metadata-test", type, titleSlug],
    queryFn: async () => {
      const res = await apiClient.post(
        `/api/test/get-metadata-test/${type}/${titleSlug}`,
      );
      return res.data.data as metaTestDataType;
    },
    enabled: !!type && !!titleSlug,
  });
  const testId = metaData?._id;
  const {
    data: questionData,
    isLoading: questionLoading,
    error: questionError,
  } = useQuery<questionType[]>({
    queryKey: ["question-test", metaData?._id],
    queryFn: async () => {
      const res = await apiClient.post(
        `/api/test/get-question/admin/${testId}`,
      );
      return (res.data.data as questionType[]) ?? [];
    },
    enabled: Boolean(metaData?._id),
  });
  const addQuestionMutate = useMutate<
    questionType,
    { testId: string | undefined }
  >({
    options: {
      onSuccess: (data) => {
        addQuestionToStore(data.data);
      },
    },
    method: "POST",
    url: `/api/test/add-question/${testId}`,
  });
  const saveQuestionMutate = useMutate<
    any,
    { testId: string; questions: questionType[] }
  >({
    options: {
      onSuccess: () => {
        toast("Saved");
        clearDirtyForm();
        queryClient.invalidateQueries({ queryKey: ["question-test"] });
      },
    },
    url: `/api/test/save-questions/${testId}/save`,
    method: "PATCH",
  });
  const updateMeta = useMutation({
    mutationFn: async ({ prop, value }: { prop: string; value: any }) => {
      const res = await apiClient.patch(
        `/api/test/update-meta/${prop}/${testId}`,
        {
          value,
        },
      );
      return await res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["metadata-test"] });
      toast(data.message);
    },
  });
  async function handleAddQuestion() {
    if (!testId) return;
    return addQuestionMutate.mutate({ testId });
  }
  async function handleSaveQuestion() {
    if (!testId) return;
    return saveQuestionMutate.mutate({ testId, questions });
  }
  async function handlePublishTest(value: boolean) {
    if (!testId) return;
    return updateMeta.mutate({ prop: "published", value });
  }
  // Debugging
  // useEffect(() => {
  //   console.log(metaData?.titleSlug);
  // }, [metaData]);
  //   useEffect(() => {
  //   console.log(questions);
  // }, [questions]);
  useEffect(() => {
    if (questionError) {
      toast(`error fetching data ${questionError.message}`);
      return;
    }
    setQuestion(questionData ?? []);
  }, [questionData]);
  return (
    <>
      <div className="size-full py-6 min-h-screen bg-white">
        <div className="w-[90%] h-full min-h-screen max-w-[1000px] border border-gray-400 rounded-md mx-auto p-4">
          <div className="mb-4">
            <Link
              to={"/admin-dashboard/add-course"}
              className="underline text-neutral-700"
            >
              {"<"} Back to add course
            </Link>
          </div>
          <EditMetaTest
            metaData={metaData}
            metaLoading={metaLoading}
            metaError={metaError}
          />
          <div className="flex gap-4 flex-col">
            <Button
              type="button"
              onClick={handleAddQuestion}
              disabled={questionLoading || addQuestionMutate.isPending}
              className="mt-4"
            >
              Add Question
            </Button>
            {!metaData?.published ? (
              <Button
                type="button"
                onClick={() => handlePublishTest(true)}
                disabled={questionLoading || updateMeta.isPending}
              >
                Publish Test
              </Button>
            ) : (
              <Button
                type="button"
                onClick={() => handlePublishTest(false)}
                disabled={questionLoading || updateMeta.isPending}
              >
                Unpublish Test
              </Button>
            )}
          </div>
          <div className="flex flex-col gap-4 mt-4">
            {questions.map((val,i) => (
              <QuestionBlock
                key={val.cursorId}
                order={i+1}
                question={val}
                questionLoading={questionLoading}
                questionError={questionError}
              />
            ))}
          </div>
        </div>
      </div>
      <Button
        type="button"
        onClick={handleSaveQuestion}
        disabled={!isDirty}
        className="fixed bottom-3 right-3"
      >
        Save Question
      </Button>
      <BlockerModal 
        isOpen={blocker.state === "blocked"}
        onAccept={()=>blocker.proceed?.()}
        onCancel={()=>blocker.reset?.()}/>
    </>
  );
}
