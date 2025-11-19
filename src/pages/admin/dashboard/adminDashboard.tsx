import { AppSidebarAdmin } from "@/components/fragments/admin/Sidebar/sidebarAdmin";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

export default function AdminDashboard(){
      const isMobile = useIsMobile();
    return (
        <SidebarProvider>
              <AppSidebarAdmin />
              <div className="size-full min-h-screen flex">
                      {isMobile && <SidebarTrigger />}
                      <div className="size-full min-h-screen p-2 max-md:border-l max-md:border-l-gray-400 flex justify-center items-start">
                        <div className="w-[95%] bg-white px-2 flex flex-col gap-4"></div>
                        </div>
                        </div>
        </SidebarProvider>
    )
}