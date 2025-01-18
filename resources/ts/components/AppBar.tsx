import type { AppBarProps } from "@mui/material/AppBar";
import type { PageProps } from "@/types";

import MuiAppBar from "@mui/material/AppBar";
import MuiToolbar from "@mui/material/Toolbar";
import Link, { LinkPrimitive } from "ui/Link";
// import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import ModeToggle from "./ModeToggle";
import Button from "@mui/material/Button";
import { usePage } from "@inertiajs/react";

import LoginIcon from "@mui/icons-material/Login";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountMenu from "./AccountMenu";
// import MenuIcon from "@mui/icons-material/Menu";
// import MenuOpenIcon from "@mui/icons-material/MenuOpen";

const AB = styled(({ ...props }: AppBarProps) => <MuiAppBar position="fixed" color="transparent" elevation={0} {...props} />)(({ theme }) => ({
  height: "4rem",
  backdropFilter: "blur(4px)",
  borderBottom: 1,
  borderBottomStyle: "solid",
  borderColor: theme.palette.divider,
}));

const Toolbar = styled(MuiToolbar)(() => ({
  justifyContent: "space-between",
  height: "4rem",
}));

function LoginButton() {
  return (
    <Button LinkComponent={LinkPrimitive} href={route("login")} variant="contained" startIcon={<LoginIcon />}>
      Masuk
    </Button>
  );
}

function DashboardButton() {
  return (
    <Button LinkComponent={LinkPrimitive} href={route("dashboard")} variant="outlined" size="small" startIcon={<DashboardIcon />}>
      Dashboard
    </Button>
  );
}

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

const items = [
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export default function AppBar() {
  const { props } = usePage<PageProps>();
  const { auth } = props;

  return (
    <AB>
      <Toolbar>
        <Box
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <IconButton onClick={() => {}} sx={{ mr: 4 }}>
                        {!open ? <MenuIcon /> : <MenuOpenIcon />}
                    </IconButton> */}
          <Link href="/" variant="h2" underline="none" sx={{ color: "primary.light" }}>
            {appName}
          </Link>
        </Box>
        <Box
          component="ul"
          sx={{
            listStyleType: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {items.map((item) => (
            <Box key={item.href} component="li" sx={{ marginRight: 3 }}>
              <Link
                href={item.href}
                sx={{
                  color: "primary.light",
                  transition: (theme) =>
                    theme.transitions.create(["color", "text-decoration"], {
                      duration: theme.transitions.duration.short,
                    }),
                  "&:hover": { color: "primary.main" },
                }}
              >
                {item.label}
              </Link>
            </Box>
          ))}
          <Box component="li" sx={{ marginRight: 2 }}>
            {auth.user ? <DashboardButton /> : <LoginButton />}
          </Box>
          <Box component="li">{auth.user ? <AccountMenu /> : <ModeToggle slots={{ tooltip: { placement: "left" } }} edge="end" />}</Box>
        </Box>
      </Toolbar>
    </AB>
  );
}
