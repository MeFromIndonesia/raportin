import type { FC, ReactNode } from "react";
import { PageProps } from "@/types";

import { useEffect } from "react";
import AppBar from "components/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Head } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import useNotifications from "ui/NotificationsContext/useNotifications";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const Layout: FC<LayoutProps> = ({ children, title }) => {
  const { props } = usePage<PageProps>();
  const { flash } = props;

  const { show } = useNotifications();

  useEffect(() => {
    if (flash.success) {
      show(flash.success, {
        severity: "success",
      });
    }
    if (flash.info) {
      show(flash.info, {
        severity: "info",
      });
    }
    if (flash.warning) {
      show(flash.warning, {
        severity: "warning",
      });
    }
    if (flash.error) {
      show(flash.error, {
        severity: "error",
      });
    }
  }, [flash]);

  return (
    <>
      <Head title={title} />
      <AppBar />
      <Box component="main">
        {children}
        <Box
          component="footer"
          sx={{
            p: 2,
            borderWidth: 2,
            borderStyle: "solid",
            borderColor: "divider",
          }}
        >
          <Typography variant="body1" textAlign="center">
            &copy; {new Date().getFullYear()} {appName}. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Layout;
