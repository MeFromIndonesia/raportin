import { useContext } from "react";
import { NotificationsContext } from ".";

function useNotifications() {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
}

export default useNotifications;
