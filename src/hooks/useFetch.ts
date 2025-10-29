import type { AxiosRequestConfig } from "axios";
import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { apiClient } from "@/api/axiosClient";
interface UseFetchParams<TData, TQueryKey extends readonly unknown[]> {
  queryKey: TQueryKey;
  url: string;
  config?: AxiosRequestConfig;
  options?: Omit<
    UseQueryOptions<ApiResponse<TData>, Error, ApiResponse<TData>, TQueryKey>,
    "queryKey" | "queryFn"
  >;
}
// Still for get method
export function useFetch<
  TData = unknown,
  TQueryKey extends readonly unknown[] = readonly unknown[]
>({
  queryKey,
  url,
  config,
  options,
}: UseFetchParams<TData, TQueryKey>): UseQueryResult<
  ApiResponse<TData>,
  Error
> {
  return useQuery<ApiResponse<TData>, Error, ApiResponse<TData>, TQueryKey>({
    queryKey,
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<TData>>(url, config);
      return response.data
    },
    ...options,
  });
}
/**
 * Example usage:
 * @example
 * const { data, isLoading, error } = useFetch<News[], ["News"]>({
 *   queryKey: ["News"],
 *   url: "/api/articles",
 * });
 */