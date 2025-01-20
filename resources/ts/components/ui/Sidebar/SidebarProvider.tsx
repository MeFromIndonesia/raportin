import type { ReactNode } from "react";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useTheme } from "@mui/material/styles";
import getCookie from "@/utils/getCookie";
import { useMediaQuery } from "@mui/material";

const SIDEBAR_KEYBOARD_SHORTCUT = "b";
const SIDEBAR_COOKIE_NAME = "sidebar:state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

type SidebarContext = {
  open: boolean;
  toggleSidebar: () => void;
  setOpen: (open: boolean) => void;
  mobile: boolean;
};

export const SidebarContext = createContext<SidebarContext | null>(null);

function SidebarProvider({ children }: { children: ReactNode }) {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("lg"));
  const [open, setOpenState] = useState(() => {
    const savedState = getCookie(SIDEBAR_COOKIE_NAME);
    return savedState === "true";
  });

  const setOpen = useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const newValue = typeof value === "function" ? value(open) : value;
      setOpenState(newValue);

      document.cookie = `${SIDEBAR_COOKIE_NAME}=${newValue};path=/;max-age=${SIDEBAR_COOKIE_MAX_AGE};SameSite=Lax`;
    },
    [open]
  );

  const toggleSidebar = useCallback(() => {
    setOpen((prev) => !prev);
  }, [setOpen]);

  useEffect(() => {
    const savedState = getCookie(SIDEBAR_COOKIE_NAME);
    if (savedState !== null) {
      setOpenState(savedState === "true");
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  const contextValue = useMemo<SidebarContext>(
    () => ({ open, toggleSidebar, setOpen, mobile }),
    [open, toggleSidebar, setOpen, mobile]
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
}

export default SidebarProvider;
