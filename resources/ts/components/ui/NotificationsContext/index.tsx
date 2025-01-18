import type { FC, ReactNode } from "react";

import { createContext, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
// import AlertTitle from "@mui/material/AlertTitle";

import CloseIcon from "@mui/icons-material/Close";
// import getCapitalize from "@/utils/getCapitalize";

export interface NotificationOptions {
  severity?: "success" | "error" | "warning" | "info";
  duration?: number;
}

interface NotificationsContextProps {
  show: (message: string, options: NotificationOptions) => void;
}

export const NotificationsContext = createContext<NotificationsContextProps | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

const NotificationProvider: FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<({ message: string } & NotificationOptions) | null>(null);

  const show = (message: string, options: NotificationOptions) => {
    setNotifications({
      message,
      severity: options.severity || "info",
      duration: options.duration || 3000,
    });
  };

  const hide = () => {
    setNotifications(null);
  };

  return (
    <NotificationsContext.Provider value={{ show }}>
      {children}
      {notifications && (
        <Snackbar
          open={!!notifications}
          onClose={hide}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={notifications.duration}
        >
          <Alert
            onClose={hide}
            severity={notifications.severity}
            action={
              <IconButton size="small" aria-label="close" color="inherit" onClick={hide}>
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          >
            {/* <AlertTitle>{getCapitalize(notifications.severity as string)}!</AlertTitle> */}
            {notifications.message}
          </Alert>
        </Snackbar>
      )}
    </NotificationsContext.Provider>
  );
};

export default NotificationProvider;
