import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { apiClient } from "../api/axiosClient";
type httpMethod = "POST" | "DELETE" | "PUT" | "PATCH";
interface MutateProps<TData, TVariables = unknown> {
  url: string;
  method: httpMethod;
  isHeaderJSON?: boolean;
  options?: UseMutationOptions<ApiResponse<TData>, Error, TVariables>;
}
export function useMutate<TData, TVariables = unknown>({
  url,
  isHeaderJSON = true,
  method,
  options,
}: MutateProps<TData, TVariables>) {
  return useMutation<ApiResponse<TData>, Error, TVariables>({
    mutationFn: async (variables: TVariables) => {
      let dataToSend: any;
      let headers: Record<string, string> = {};
      // Detect FormData
  if (variables instanceof FormData) {
    isHeaderJSON = false;
  }
      if (isHeaderJSON) {
        dataToSend = variables;
        headers["Content-Type"] = "application/json";
      } else {
        // convert to form-urlencoded
        const formData = new URLSearchParams();
        Object.entries(variables as Record<string, any>).forEach(
          ([key, value]) => formData.append(key, String(value))
        );
        dataToSend = formData;
        headers["Content-Type"] = "application/x-www-form-urlencoded";
      }
      const response = await apiClient.request<ApiResponse<TData>>({
        url,
        method,
        data: dataToSend,
        headers,
        withCredentials: true,
      });

      return response.data;
    },
    ...options,
  });
}
/**
 * @Example
 * const createArticle = useMutate<Article, { title: string }>({
 * url: "/articles",
 *   method: "POST",
 * });
 * createArticle.mutate({ title: "New Article" });
 */
