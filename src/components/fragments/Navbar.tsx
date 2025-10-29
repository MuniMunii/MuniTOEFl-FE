import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useSession } from "@/hooks/useSession";

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <nav className="flex items-center justify-between bg-gray-100 p-4 shadow">
      <h1 className="text-xl font-bold">TOEFL FE</h1>
      <div className="flex gap-4 items-center">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Button variant={"default"}>
          {session?<Link to={"/auth/login"}>Sign-Out</Link>:<Link to={"/auth/login"}>Sign-in</Link>}
        </Button>
      </div>
    </nav>
  );
}
