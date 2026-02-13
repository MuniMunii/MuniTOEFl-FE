"use client";
import { Outlet } from "react-router-dom";
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
import EditCoursePage from "./pages/admin/edit-course/editCourse";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ConfirmationTakeQuizPage from "./pages/client/take-quiz/confirmation";
import QuizSessionPage from "./pages/client/take-quiz/quizSession";
import quizSessionLoader from "./loader/quizSessionLoader";
import RedirectPage from "./pages/RedirectPage";
import voucherValidationLoader from "./loader/voucherValidationLoader";
import ResultPage from "./pages/client/dashboard/result/result";
function AppLayout(){
  return (
    <><Toaster/><Outlet/></>
  )
}
const router = createBrowserRouter([
  {
    element: <AppLayout/>,
    children: [
      { path: "/", element: <Homepage /> },
      { path: "/auth/login", element: <Login /> },
      { path: "/auth/register", element: <Register /> },
      {path:"/role-redirect",element:<RedirectPage/>},
      {
        element: <ProtectedLayout allowedRoles={["user"]} />,
        children: [
          { path: "/dashboard", element: <Dashboard /> },
          { path: "/dashboard/lesson", element: <LessonPage /> },
          { path: "/dashboard/setting", element: <SettingPage />, },
          {path:'/take-test/:type/:testId',element:<ConfirmationTakeQuizPage/>,loader:voucherValidationLoader},
          {path:'/quiz-session/:type/:testId',element:<QuizSessionPage/>,loader:quizSessionLoader},
          {path:'/result/:attemptId',element:<ResultPage/>}
        ],
      },

      {
        element: <ProtectedLayout allowedRoles={["admin"]} />,
        children: [
          { path: "/admin-dashboard", element: <AdminDashboard /> },
          { path: "/admin-dashboard/voucher", element: <VoucherPage /> },
          { path: "/admin-dashboard/list-users", element: <UsersManagementPage /> },
          { path: "/admin-dashboard/add-course", element: <AddCourse /> },
          {
            path: "/admin-dashboard/edit-course/:type/:titleSlug",
            element: <EditCoursePage />,
          },
        ],
      },

      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

// function App() {
//   return (
//     <div>
//       <main>
//         <Toaster />
//         <Routes>
//           <Route path="/" element={<Homepage />} />
//           <Route path="/auth/login" element={<Login />} />
//           <Route path="/auth/register" element={<Register />} />
//           <Route element={<ProtectedLayout allowedRoles={["user"]} />}>
//             <Route path="/dashboard/" element={<Dashboard />} />
//             <Route path="/dashboard/lesson" element={<LessonPage />} />
//             <Route path="/dashboard/setting" element={<SettingPage />} />
//           </Route>
//           <Route element={<ProtectedLayout allowedRoles={["admin"]} />}>
//             <Route path="/admin-dashboard" element={<AdminDashboard />} />
//             <Route path="/admin-dashboard/voucher" element={<VoucherPage />} />
//             <Route path="/admin-dashboard/list-users" element={<UsersManagementPage/>} />
//             <Route path="/admin-dashboard/add-course" element={<AddCourse />} />
//             <Route path="/admin-dashboard/edit-course/:type/:titleSlug" element={<EditCoursePage />} />
//           </Route>
//           <Route element={<ProtectedLayout allowedRoles={null} />}>
//             <Route path="/role-redirect" element={<div></div>} />
//           </Route>
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </main>
//     </div>
//   );
// }
// export default App;
