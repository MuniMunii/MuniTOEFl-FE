import { Home, Settings,Book } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavUser } from "../../../Nav-user"
import { authClient } from "@/api/authClient"
import ActivateVoucherDialog from "../../voucher/voucher"

const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Lesson",
    url: "/dashboard/lesson",
    icon: Book,
  },
  {
    component:ActivateVoucherDialog,
  },
  {
    title: "Settings",
    url: "/dashboard/setting",
    icon: Settings,
  },
]


export function AppSidebar() {
   const { 
          data: session, 
      } = authClient.useSession()
  return (
    <Sidebar className="border-r! border-r-gray-400!">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>StudyFirst TOEFL-ITP</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                if(item.component){
                  const Component=item.component
                  return (
                  <SidebarMenuItem key={'voucher-item'}>
                    <Component/>
                  </SidebarMenuItem>
                  )
                }
                return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )})}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser name={session?.user?.name} email={session?.user?.email} image={session?.user?.image??undefined} role={session?.user.role}/>
      </SidebarFooter>
    </Sidebar>
  )
}