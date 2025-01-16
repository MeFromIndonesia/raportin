import type { TooltipProps } from "@mui/material/Tooltip";

import MuiTooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

const Tooltip = styled(
  ({
    className,
    classes,
    disableInteractive = true,
    ...props
  }: TooltipProps) => (
    <MuiTooltip
      disableInteractive={disableInteractive}
      classes={{ popper: className, ...classes }}
      {...props}
    />
  )
)(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: `color-mix(in oklab, ${theme.palette.grey[900]} 80%, transparent)`,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: `color-mix(in oklab, ${theme.palette.grey[900]} 80%, transparent)`,
    backdropFilter: "blur(6px)",
    borderRadius: theme.shape.borderRadius * 2,
  },
  [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
    {
      marginTop: "3px",
    },
  [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]:
    {
      marginBottom: "3px",
    },
  [`&.${tooltipClasses.popper}[data-popper-placement*="right"] .${tooltipClasses.tooltip}`]:
    {
      marginLeft: "3px",
    },
  [`&.${tooltipClasses.popper}[data-popper-placement*="left"] .${tooltipClasses.tooltip}`]:
    {
      marginRight: "3px",
    },
}));

export default Tooltip;
