import { apiClient } from "@/api/axiosClient";
import { QueryClient } from "@tanstack/react-query";
import type { LoaderFunctionArgs } from "react-router-dom";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    },
  },
});
export default function voucherValidationLoader({params}:LoaderFunctionArgs){
    const {type,testId}=params
    return queryClient.ensureQueryData({
        queryKey:['voucher-validation'],
        queryFn:async ()=>{
            const res=await apiClient.get(`/voucher-session/${type}/${testId}`)
            return res.data
        }
    })
}