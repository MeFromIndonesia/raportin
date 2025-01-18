/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ContainerProps as MuiContainerProps } from "@mui/material/Container";

import { styled } from "@mui/material/styles";
import MuiContainer from "@mui/material/Container";

interface ContainerProps extends MuiContainerProps {
  disableNavbarOffset?: boolean;
}

const Container = styled(({ disableNavbarOffset = false, maxWidth = "2xl", ...props }: ContainerProps) => (
  <MuiContainer maxWidth={maxWidth} {...props} />
))(({ theme, disableNavbarOffset }) => ({
  minHeight: "100svh",
  paddingTop: disableNavbarOffset ? 0 : "4.125rem",
  [theme.breakpoints.down("2xl")]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  [theme.breakpoints.down("sm")]: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
}));

export default Container;
