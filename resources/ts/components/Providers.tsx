import type { ReactNode } from "react";

import ThemeProvider from "components/ThemeContext";
import ReactQueryProvider from "./ReactQueryProvider";
import NotificationProvider from "ui/NotificationsContext";
import SidebarProvider from "ui/Sidebar/SidebarProvider";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ReactQueryProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <NotificationProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </NotificationProvider>
        </LocalizationProvider>
      </ReactQueryProvider>
    </ThemeProvider>
  );
}
