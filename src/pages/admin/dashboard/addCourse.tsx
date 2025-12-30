import { AppSidebarAdmin } from "@/components/fragments/admin/sidebar/sidebarAdmin";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";


import GetCourseByType from "@/components/fragments/admin/add-course/getCourseByType";
import { useIsMobile } from "@/hooks/use-mobile";
import DialogFormAddCourse from "@/components/fragments/admin/add-course/dialogFormAddCourse";

export default function AddCourse() {
  const isMobile = useIsMobile();
  return (
    <SidebarProvider>
      <AppSidebarAdmin />
      <div className="size-full min-h-screen flex">
        {isMobile && <SidebarTrigger />}
        <div className="size-full min-h-screen p-2 max-md:border-l max-md:border-l-gray-400 flex justify-center items-start">
          <div className="w-[95%] bg-white px-2 flex flex-col gap-4 h-full min-h-screen border border-gray-500 rounded-md">
            <div className="w-full h-14 p-2 border border-gray-400 rounded-xl">
              <DialogFormAddCourse/>
            </div>
            <GetCourseByType/>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
