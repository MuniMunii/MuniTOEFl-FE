import { apiClient } from "@/api/axiosClient"
import type { metaTestDataType } from "@/schemas/test";
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react";
import { useParams } from "react-router-dom"
export default function EditCoursePage(){
    const {type,titleSlug}=useParams()
const { data, isLoading, error } = useQuery<metaTestDataType>({
  queryKey: ["metadata-test", type, titleSlug],
  queryFn: () =>
    apiClient.post(`/api/test/get-metadata-test/${type}/${titleSlug}`),
  enabled: !!type && !!titleSlug,
});
useEffect(()=>{console.log(data)},[data])
    return (
    <div className="size-full min-h-screen bg-white">
        <div className="w-[90%] h-full min-h-screen max-w-[1000px] border border-gray-400 rounded-md mx-auto p-4">
        </div>
    </div>)
}