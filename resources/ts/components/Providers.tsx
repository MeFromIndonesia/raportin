import type { ReactNode } from "react";

import ThemeProvider from "components/ThemeContext";
import ReactQueryProvider from "./ReactQueryProvider";
import NotificationProvider from "ui/NotificationsContext";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ReactQueryProvider>
        <NotificationProvider>{children}</NotificationProvider>
      </ReactQueryProvider>
    </ThemeProvider>
  );
}
