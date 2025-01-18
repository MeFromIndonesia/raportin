import type { Theme } from "@mui/material/styles";

interface Options {
  muiComponent?: boolean;
  width?: number;
  offset?: number;
}

const focusVisibleStyles = (theme: Theme, options: Options = { width: 2, offset: 1 }) => ({
  "&:focus": {
    outline: "none",
  },
  ...(options.muiComponent
    ? {
        "&.Mui-focusVisible": {
          outlineWidth: options.width,
          outlineStyle: "solid",
          outlineColor: theme.palette.primary.main,
          outlineOffset: options.offset,
        },
      }
    : {
        "&:focus-visible": {
          outlineWidth: options.width,
          outlineStyle: "solid",
          outlineColor: theme.palette.primary.main,
          outlineOffset: options.offset,
        },
      }),
});

export default focusVisibleStyles;
