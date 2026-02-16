import {
  Calendar,
  ChevronRight,
  Home,
  Inbox,
  UserPlus,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import { NavUser } from "../../Nav-user";
import { authClient } from "@/api/authClient";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { useEffect, useState, type ComponentType } from "react";

type SidebarItem =
  | {
      type: "link";
      title: string;
      url: string;
      icon?: LucideIcon;
    }
  | {
      type: "group";
      title: string;
      icon?: LucideIcon;
      children: { title: string; url: string }[];
    }
  | {
      type: "component";
      component: ComponentType;
    };
const items: SidebarItem[] = [
  {
    type: "link",
    title: "Home",
    url: "/admin-dashboard",
    icon: Home,
  },
  {
    type: "link",
    title: "Voucher",
    url: "/admin-dashboard/voucher",
    icon: Inbox,
  },
  {
    type: "link",
    title: "Add Course",
    url: "/admin-dashboard/add-course",
    icon: Calendar,
  },
  {
    type: "group",
    title: "Users",
    icon: UserPlus,
    children: [
      { title: "User Managements", url: "/admin-dashboard/list-users" },
    ],
  },
];

export function AppSidebarAdmin() {
  const { data: session } = authClient.useSession();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  useEffect(() => {
    items.forEach((item) => {
      if (item.type === "group") {
        if (item.children) {
          const isActive = item.children.some((child) =>
            location.pathname.startsWith(child.url),
          );
          if (isActive) {
            setOpenMenus((prev) => ({ ...prev, [item.title]: true }));
          }
        } else {
          setOpenMenus((prev) => ({ ...prev }));
        }
      }
    });
  }, [location.pathname]);
  function toggleMenu(key: string, value: boolean) {
    setOpenMenus((prev) => ({
      ...prev,
      [key]: value,
    }));
  }
  return (
    <Sidebar className="border-r border-gray-300">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>StudyFirst TOEFL-ITP</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item, index) => {
                if (item.type === "component") {
                  const Component = item.component;
                  return <Component key={index} />;
                }

                if (item.type === "group") {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <Collapsible
                        className="group/collapsible"
                        open={openMenus[item.title]}
                        onOpenChange={(open) => toggleMenu(item.title, open)}
                      >
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton>
                            {item.icon && <item.icon className="size-4" />}
                            {item.title}
                            <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.children.map((child) => (
                              <SidebarMenuSubItem key={child.title}>
                                <SidebarMenuSubButton asChild>
                                  <Link to={child.url}>{child.title}</Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </Collapsible>
                    </SidebarMenuItem>
                  );
                }

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>
                        {item.icon && <item.icon className="size-4" />}
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser
          name={session?.user?.name}
          email={session?.user?.email}
          image={session?.user?.image ?? undefined}
          role={session?.user?.role}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
