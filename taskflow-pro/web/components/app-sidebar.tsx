"use client"

import * as React from "react"
import {
  IconChartBar,
  IconFolder,
  IconInnerShadowTop,
  IconListDetails,
  IconUsers,
} from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSelector } from "react-redux"
import { RootState } from "@/store"

const data = {

  navMain: [
    {
      title: "Division",
      url: "/dashboard/division",
      icon: IconChartBar,
    },
    {
      title: "Projects",
      url: "/dashboard/project",
      icon: IconFolder,
    },
    {
      title: "Users",
      url: "/dashboard/user",
      icon: IconUsers,
    },
    {
      title: "Tasks",
      url: "/dashboard/task",
      icon: IconListDetails,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const user = useSelector((state: RootState) => state.auth.user);

// console.log("user dari zustand",user);

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {
          user &&
        <NavUser user={user} />
        }
      </SidebarFooter>
    </Sidebar>
  )
}
