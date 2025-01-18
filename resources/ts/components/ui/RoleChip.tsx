import type { FC } from "react";
import type { ChipProps } from "@mui/material/Chip";
import type { UserRole } from "@/types";

import Chip from "@mui/material/Chip";
import Tooltip from "ui/Tooltip";
import getCapitalize from "@/utils/getCapitalize";

import { green, cyan } from "@mui/material/colors";
import useThemeContext from "components/ThemeContext/useThemeContext";

interface RoleChipProps extends Omit<ChipProps, "label"> {
  role: UserRole;
}

const RoleChip: FC<RoleChipProps> = ({ role, sx, ...props }) => {
  const { activeMode } = useThemeContext();

  const admincolor = activeMode === "dark" ? cyan[800] : cyan[100];
  const studentcolor = activeMode === "dark" ? green[800] : green[100];

  return (
    <Tooltip title={role === "siswa" ? "Student" : "Admin"}>
      <Chip
        label={getCapitalize(role)}
        size="small"
        sx={{
          bgcolor: role === "siswa" ? studentcolor : admincolor,
          ...sx,
        }}
        {...props}
      />
    </Tooltip>
  );
};

export default RoleChip;
