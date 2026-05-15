"use client"

import * as React from "react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
} from "@/pkg/theme/ui/sidebar"
import { GalleryVerticalEndIcon } from "lucide-react"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      items: [
        { title: "Overview", url: "/dashboard" },
        { title: "Today", url: "/dashboard/today", isActive: true },
      ],
    },
    {
      title: "Habits",
      url: "/habits",
      items: [
        { title: "All Habits", url: "/habits" },
        { title: "Create Habit", url: "/habits/create" },
        { title: "Categories", url: "/habits/categories" },
      ],
    },
    {
      title: "Progress",
      url: "/progress",
      items: [
        { title: "Streaks", url: "/progress/streaks" },
        { title: "Calendar", url: "/progress/calendar" },
        { title: "History", url: "/progress/history" },
      ],
    },
    {
      title: "Analytics",
      url: "/analytics",
      items: [
        { title: "Weekly Report", url: "/analytics/weekly" },
        { title: "Monthly Report", url: "/analytics/monthly" },
        { title: "Completion Rate", url: "/analytics/completion" },
      ],
    },
    {
      title: "Goals",
      url: "/goals",
      items: [
        { title: "Active Goals", url: "/goals" },
        { title: "Completed Goals", url: "/goals/completed" },
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      items: [
        { title: "Profile", url: "/settings/profile" },
        { title: "Notifications", url: "/settings/notifications" },
        { title: "Integrations", url: "/settings/integrations" },
      ],
    },
  ],
}

const SidebarComponent = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEndIcon className="size-4" />
                </div>

                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Documentation</span>

                  <span className="">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>

                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={item.isActive}>
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}

                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

export default SidebarComponent