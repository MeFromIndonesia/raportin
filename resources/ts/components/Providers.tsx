import type { ReactNode } from "react";

import ThemeProvider from "components/ThemeContext";
import ReactQueryProvider from "./ReactQueryProvider";
import NotificationProvider from "ui/NotificationsContext";
import SidebarProvider from "ui/Sidebar/SidebarProvider";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ReactQueryProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <NotificationProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </NotificationProvider>
        </LocalizationProvider>
      </ReactQueryProvider>
    </ThemeProvider>
  );
}
