import type { FC } from "react";
import type { IconButtonProps } from "@mui/material/IconButton";
import type { TooltipProps } from "@mui/material/Tooltip";

import useThemeContext from "./ThemeContext/useThemeContext";
import Tooltip from "ui/Tooltip";
import IconButton from "@mui/material/IconButton";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MonitorIcon from "@mui/icons-material/Monitor"

interface ModeToggleProps extends IconButtonProps {
  slots: {
    tooltip?: Omit<TooltipProps, "title" | "children">;
  }
}

const ModeToggle: FC<ModeToggleProps> = ({
    onClick,
    color = "primary",
    slots,
    ...props
}) => {
    const { mode, toggleMode } = useThemeContext();

    const modeSwitch =
        mode === "light" ? "dark" : mode === "dark" ? "system" : "light";

    return (
        <Tooltip title={`Switch to ${modeSwitch} mode`} arrow {...slots.tooltip}>
            <IconButton
                color={color}
                onClick={(e) => {
                    toggleMode();
                    onClick?.(e);
                }}
                {...props}
            >
                {mode === "light" ? (
                    <LightModeIcon />
                ) : mode === "dark" ? (
                    <DarkModeIcon />
                ) : (
                    <MonitorIcon />
                )}
            </IconButton>
        </Tooltip>
    );
};

export default ModeToggle;
