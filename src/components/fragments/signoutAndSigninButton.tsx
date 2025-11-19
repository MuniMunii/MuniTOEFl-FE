import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { authClient } from "@/api/authClient";

export function SignoutAndSignin() {
  const { data: session } = authClient.useSession();

  const navigate = useNavigate();
  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate("/auth/login");
        },
      },
    });
  }
  return session ? (
    <Button variant={"default"} onClick={signOut}>
      Sign-Out
    </Button>
  ) : (
    <Button variant={"default"}>
      <Link to={"/auth/login"}>Sign-in</Link>
    </Button>
  );
}
export function GoogleSigninButton() {
  async function googleSignin() {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:5173/dashboard",
      errorCallbackURL: "/error",
    });
  }
  return (
    <Button
      variant={"outline"}
      className="flex flex-row gap-2 items-center"
      onClick={googleSignin}
    >
      <img src="/google.jpg" alt="" className="w-8 h-auto" />
      <h4>Google</h4>
    </Button>
  );
}
