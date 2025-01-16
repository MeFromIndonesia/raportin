import { createTheme } from "@mui/material/styles";
import focusVisibleStyles from "@/utils/focusVisibleStyles";

import deepOrange from "@mui/material/colors/deepOrange";
import deepPurple from "@mui/material/colors/deepPurple";
import red from "@mui/material/colors/red"

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    "2xl": true;
  }
}

export default function getTheme(mode: "light" | "dark") {
  // Golden ratio
  const lineHeightRatio = 1.61803398875;

  function getLineHeight(fontSize: number) {
    const lineHeight = fontSize * lineHeightRatio;
    return `${lineHeight.toFixed(3)}rem`;
  }

  return createTheme({
    cssVariables: true,

    // fonts
    typography: {
      fontFamily: [
        "Mulish",
        "system-ui",
        "Avenir",
        "Helvetica",
        "Arial",
        "sans-serif",
      ]
        .map((font) => `"${font}"`)
        .join(", "),
      h1: {
        fontSize: "2.25rem",
        lineHeight: getLineHeight(2.25),
        fontWeight: 500,
      },
      h2: {
        fontSize: "1.875rem",
        lineHeight: getLineHeight(1.875),
        fontWeight: 500,
      },
      h3: {
        fontSize: "1.5rem",
        lineHeight: getLineHeight(1.5),
        fontWeight: 500,
      },
      h4: {
        fontSize: "1.25rem",
        lineHeight: getLineHeight(1.25),
        fontWeight: 500,
      },
      h5: {
        fontSize: "1.125rem",
        lineHeight: getLineHeight(1.125),
        fontWeight: 500,
      },
      h6: {
        fontSize: "1rem",
        lineHeight: getLineHeight(1),
        fontWeight: 500,
      },
      subtitle1: {
        fontSize: "1rem",
        lineHeight: getLineHeight(1),
        fontWeight: 400,
      },
      subtitle2: {
        fontSize: ".875rem",
        lineHeight: getLineHeight(0.875),
        fontWeight: 500,
      },
      body1: {
        fontSize: "1rem",
        lineHeight: getLineHeight(1),
        fontWeight: 400,
      },
      body2: {
        fontSize: ".875rem",
        lineHeight: getLineHeight(0.875),
        fontWeight: 400,
      },
      caption: {
        fontSize: ".75rem",
        lineHeight: getLineHeight(0.75),
        fontWeight: 400,
      },
      overline: {
        fontSize: ".75rem",
        lineHeight: getLineHeight(0.75),
        fontWeight: 400,
      },
      button: {
        textTransform: "none",
        fontSize: "1rem",
        lineHeight: getLineHeight(1),
        fontWeight: 500,
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
        "2xl": 1536,
      },
    },

    // components
    components: {
      MuiTouchRipple: {
        styleOverrides: {
          root: {
            "& .MuiTouchRipple-rippleVisible": {
              animationDuration: "250ms",
            },
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
          disableFocusRipple: true,
        },
        styleOverrides: {
          root: ({ theme, ownerState }) => {
            const { color = "primary" } = ownerState;
            const colorMap = {
              inherit: theme.palette.primary,
              primary: theme.palette.primary,
              secondary: theme.palette.secondary,
              success: theme.palette.success,
              error: theme.palette.error,
              info: theme.palette.info,
              warning: theme.palette.warning,
            };
            const hoverOpacity = theme.palette.action.hoverOpacity;

            return {
              "&.Mui-focusVisible": {
                "--variant-containedBg": colorMap[color]["dark"],
                "--variant-textBg": `rgba(${colorMap[color]["mainChannel"]} / ${hoverOpacity})`,
                "--variant-outlinedBorder": colorMap[color]["main"],
                "--variant-outlinedBg": `rgba(${colorMap[color]["mainChannel"]} / ${hoverOpacity})`,
              },
            };
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: ({ theme }) =>
            focusVisibleStyles(theme, {
              muiComponent: true,
              width: 1,
            }),
        },
      },
      MuiAppBar: {
        defaultProps: {
          color: "default",
        },
      },
    },

    // colors
    palette: {
      mode,
      primary: {
        main: deepOrange.A400,
      },
      secondary: {
        main: deepPurple.A400,
      },
      error: {
        main: red[600],
      },
      ...(mode === "light"
        ? {
            background: {
              default: "#fcfcfc",
            },
            text: {
              primary: "rgba(0, 0, 0, 1)",
              secondary: "rgba(0, 0, 0, .7)",
              disabled: "rgba(0, 0, 0, .5)",
            },
          }
        : {
            background: {
              default: "#111111",
            },
            text: {
              primary: "rgba(252, 252, 252, 1)",
              secondary: "rgba(252, 252, 252, .7)",
              disabled: "rgba(252, 252, 252, .5)",
            },
          }),
    },
  });
}