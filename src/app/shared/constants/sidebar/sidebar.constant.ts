export const sidebarConstant = {
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