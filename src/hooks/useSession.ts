import { apiClient } from "@/api/axiosClient";
import type { UserType } from "@/schemas/user";
import { useQuery } from "@tanstack/react-query";

export function useSession() {
  return useQuery({
    queryKey: ["getSession"],
    queryFn: async () => {
      const res = await apiClient.get("/user/session", { withCredentials: true });
      return res.data?.data?.user as UserType;
    },
    staleTime: 1000 * 60 * 5,
  });
}
/**
@Usage
const { data: session, isLoading, error } = useSession();
*/ 