
import { authClient } from "@/api/authClient";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedLayout({ allowedRoles }:{allowedRoles:string[]|null|undefined}) {
  const { data: session, isPending, error } = authClient.useSession();
  const location = useLocation();

  if (isPending) return <div>Loading...</div>;
  if (error || !session) 
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  if (location.pathname === "/role-redirect") {
  return <Navigate to={session?.user?.role === "admin" ? "/admin-dashboard" : "/dashboard"} replace />;
}
  // Role check
  if (allowedRoles && !allowedRoles.includes(session?.user?.role as string)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}