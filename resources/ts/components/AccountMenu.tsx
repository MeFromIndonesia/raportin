import type { FC, MouseEvent } from "react";
import type { IconButtonProps } from "@mui/material/IconButton";
import type { MenuProps } from "@mui/material/Menu";
import type { PageProps } from "@/types";

import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import MuiMenu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "ui/Tooltip";
import { usePage } from "@inertiajs/react";
import getAbbreviation from "@/utils/getAbbreviation";
import useThemeContext from "./ThemeContext/useThemeContext";
import { styled } from "@mui/material/styles";
import AlertDialog from "ui/AlertDialog";

import PaletteIcon from "@mui/icons-material/Palette";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MonitorIcon from "@mui/icons-material/Monitor";

const Menu = styled((props: MenuProps) => (
  <MuiMenu transformOrigin={{ horizontal: "right", vertical: "top" }} anchorOrigin={{ horizontal: "right", vertical: "bottom" }} {...props} />
))(({ theme }) => ({
  marginTop: theme.spacing(1.5),
}));

function ThemeMenu({ anchorEl, open, onClose }: { anchorEl: Element | null; open: boolean; onClose: () => void }) {
  const { setMode } = useThemeContext();

  const handleClick = (mode: "light" | "dark" | "auto") => {
    setMode(mode);
    onClose();
  };

  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      <MenuItem onClick={() => handleClick("light")}>
        <ListItemIcon>
          <LightModeIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="inherit" noWrap>
          Light Mode
        </Typography>
      </MenuItem>
      <MenuItem onClick={() => handleClick("dark")}>
        <ListItemIcon>
          <DarkModeIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="inherit" noWrap>
          Dark Mode
        </Typography>
      </MenuItem>
      <Divider />
      <MenuItem onClick={() => handleClick("auto")}>
        <ListItemIcon>
          <MonitorIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="inherit" noWrap>
          Auto Mode
        </Typography>
      </MenuItem>
    </Menu>
  );
}

interface AccountMenuProps extends IconButtonProps {}

const AccountMenu: FC<AccountMenuProps> = ({ onClick, ...props }) => {
  const { props: PageProps } = usePage<PageProps>();
  const { auth } = PageProps;

  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [activeMenu, setActiveMenu] = useState<"account" | "theme" | null>(null);
  const [logoutAlertOpen, setLogoutAlertOpen] = useState(false);

  const open = !!anchorEl;

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
    setActiveMenu("account");
  };
  const handleClose = () => {
    setAnchorEl(null);
    setActiveMenu(null);
  };

  const handleThemeMenu = () => {
    setActiveMenu("theme");
  };

  const userAvatar = (
    <Avatar sx={{ width: 32, height: 32, fontSize: "0.875rem", fontWeight: 700 }}>{getAbbreviation(auth.user.name, { maxLength: 2 })}</Avatar>
  );

  return (
    <>
      <Tooltip title="Account Menu">
        <IconButton
          onClick={(e) => {
            handleClick(e);
            onClick?.(e);
          }}
          size="small"
          {...props}
        >
          {userAvatar}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open && activeMenu === "account"}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": { minWidth: 196, maxWidth: 320 },
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.75,
            mr: 1,
          },
        }}
      >
        <MenuItem onClick={handleClose}>
          {userAvatar}
          <Typography variant="inherit" noWrap>
            {auth.user.name}
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleThemeMenu}>
          <ListItemIcon>
            <PaletteIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            Theme
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            Settings
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => setLogoutAlertOpen(true)}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            Logout
          </Typography>
        </MenuItem>
      </Menu>
      <ThemeMenu anchorEl={anchorEl} open={open && activeMenu === "theme"} onClose={handleClose} />
      <AlertDialog
        open={logoutAlertOpen}
        onClose={() => setLogoutAlertOpen(false)}
        url={route("auth.logout")}
        title="Konfirmasi Logout"
        message="Keluar akan mengakhiri sesi Anda saat ini. Anda mungkin perlu masuk lagi untuk mengakses fitur-fitur tersebut."
      />
    </>
  );
};

export default AccountMenu;
