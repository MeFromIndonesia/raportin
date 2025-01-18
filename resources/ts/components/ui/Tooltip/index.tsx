import type { TooltipProps } from "@mui/material/Tooltip";

import MuiTooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

const Tooltip = styled(({ className, classes, disableInteractive = true, ...props }: TooltipProps) => (
  <MuiTooltip disableInteractive={disableInteractive} classes={{ popper: className, ...classes }} arrow {...props} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: `color-mix(in oklab, ${theme.palette.common.black} 80%, transparent)`,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: `color-mix(in oklab, ${theme.palette.common.black} 80%, transparent)`,
    backdropFilter: "blur(4px)",
    borderRadius: theme.shape.borderRadius * 2,
    ...theme.typography.body2,
  },
  [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]: {
    marginTop: "12px",
  },
  [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]: {
    marginBottom: "12px",
  },
  [`&.${tooltipClasses.popper}[data-popper-placement*="right"] .${tooltipClasses.tooltip}`]: {
    marginLeft: "12px",
  },
  [`&.${tooltipClasses.popper}[data-popper-placement*="left"] .${tooltipClasses.tooltip}`]: {
    marginRight: "12px",
  },
}));

export default Tooltip;
