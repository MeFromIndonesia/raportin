/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ContainerProps as MuiContainerProps } from "@mui/material/Container";

import { styled } from "@mui/material/styles";
import MuiContainer from "@mui/material/Container";

interface ContainerProps extends MuiContainerProps {
  disableNavbarOffset?: boolean;
}

const Container = styled(
  ({ disableNavbarOffset = false, maxWidth = "2xl", ...props }: ContainerProps) => (
    <MuiContainer maxWidth={maxWidth} {...props} />
  )
)(({ theme, disableNavbarOffset }) => ({
  minHeight: "100svh",
  paddingTop: disableNavbarOffset ? 0 : theme.spacing(16.5),
  [theme.breakpoints.down("2xl")]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  [theme.breakpoints.down("lg")]: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  [theme.breakpoints.down("sm")]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

export default Container;
