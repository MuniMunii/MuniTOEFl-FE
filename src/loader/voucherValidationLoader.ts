import { apiClient } from "@/api/axiosClient";
import { queryClient } from "@/lib/queryClient";
import type { LoaderFunctionArgs } from "react-router-dom";
export default function voucherValidationLoader({params}:LoaderFunctionArgs){
    const {type,testId}=params
    return queryClient.ensureQueryData({
        queryKey:['voucher-validation','test-session',type,testId],
        queryFn:async ()=>{
            const res=await apiClient.get(`/api/voucher/voucher-session/${type}/${testId}`)
            return res.data
        }
    })
}