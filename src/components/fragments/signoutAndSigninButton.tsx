import { useSession } from "@/hooks/useSession";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useMutate } from "@/hooks/useMutation";
import { apiClient } from "@/api/axiosClient";

export default function SignoutAndSignin() {
  const { data: session } = useSession();
  const navigate = useNavigate();
  const signOutMutate = useMutate<{ csrfToken: string }>({
    url: "/auth/signout",
    method: "POST",
    options: {
      onSuccess: () => {
        navigate("/auth/login");
      },
    },
  });
  async function signOut() {
    try {
      // get csrftoken first
      const res = await apiClient.get("/auth/csrf");
      const csrfToken = res.data?.csrfToken;
      signOutMutate.mutate({
        csrfToken,
      });
    } catch (err) {
      console.error("Failed to get CSRF token:", err);
    }
  }
  return session ? (
    <Button variant={"default"} onClick={signOut}>
      <Link to={"/auth/login"}>Sign-Out</Link>
    </Button>
  ) : (
    <Button variant={"default"}>
      <Link to={"/auth/login"}>Sign-in</Link>
    </Button>
  );
}
