"use client";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import NotFound from "./pages/NotFound";
import Login from "./pages/client/auth/Login";
import Register from "./pages/client/auth/Register";
import Dashboard from "./pages/client/dashboard/dashboard";
import ProtectedLayout from "./components/HOC/protectedPage";
import AdminDashboard from "./pages/admin/dashboard/adminDashboard";
import UsersManagementPage from "./pages/admin/dashboard/UserManagement";
import AddCourse from "./pages/admin/dashboard/addCourse";
import VoucherPage from "./pages/admin/dashboard/Voucher";
import { Toaster } from "sonner";
import LessonPage from "./pages/client/dashboard/lesson";
import SettingPage from "./pages/client/dashboard/setting";

function App() {
  return (
    <div>
      <main>
        <Toaster />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route element={<ProtectedLayout allowedRoles={["user"]} />}>
            <Route path="/dashboard/" element={<Dashboard />} />
            <Route path="/dashboard/lesson" element={<LessonPage />} />
            <Route path="/dashboard/setting" element={<SettingPage />} />
          </Route>
          <Route element={<ProtectedLayout allowedRoles={["admin"]} />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin-dashboard/voucher" element={<VoucherPage />} />
            <Route path="/admin-dashboard/list-users" element={<UsersManagementPage/>} />
            <Route path="/admin-dashboard/add-course" element={<AddCourse />} />
          </Route>
          <Route element={<ProtectedLayout allowedRoles={null} />}>
            <Route path="/role-redirect" element={<div></div>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
