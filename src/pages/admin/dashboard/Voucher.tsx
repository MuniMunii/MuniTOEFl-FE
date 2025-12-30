import { AppSidebarAdmin } from "@/components/fragments/admin/sidebar/sidebarAdmin";
import AddVoucher from "@/components/fragments/admin/voucher/addVoucher";
import VoucherTable from "@/components/fragments/admin/voucher/tableVoucher";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

export default function VoucherPage(){
     const isMobile = useIsMobile();
    return<SidebarProvider>
      <AppSidebarAdmin />
      <div className="size-full min-h-screen flex">
        {isMobile && <SidebarTrigger />}
        <div className="size-full min-h-screen p-2 max-md:border-l max-md:border-l-gray-400 flex justify-center items-start">
          <div className="w-[95%] bg-white px-2 flex flex-col gap-4"><AddVoucher/><VoucherTable/></div>
        </div>
      </div>
    </SidebarProvider>
}