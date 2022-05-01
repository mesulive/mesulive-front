import { createTheme } from "@mui/material";
import {
  COLOR_ERROR_MAIN,
  COLOR_PRIMARY_DARK,
  COLOR_PRIMARY_LIGHT,
  COLOR_PRIMARY_MAIN,
  COLOR_SECONDARY_MAIN,
} from "shared/assets/colors";
import {
  BREAKPOINT_DESKTOP,
  BREAKPOINT_LAPTOP,
  BREAKPOINT_TABLET,
} from "shared/assets/breakpoints";

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
    tablet: true;
    laptop: true;
    desktop: true;
  }
}

export default createTheme({
  palette: {
    primary: {
      light: COLOR_PRIMARY_LIGHT,
      main: COLOR_PRIMARY_MAIN,
      dark: COLOR_PRIMARY_DARK,
    },
    secondary: {
      main: COLOR_SECONDARY_MAIN,
    },
    error: {
      main: COLOR_ERROR_MAIN,
    },
  },
  typography: {
    fontFamily: ["Roboto", "Noto Sans KR", "sans-serif"].join(", "),
  },
  breakpoints: {
    values: {
      tablet: BREAKPOINT_TABLET,
      laptop: BREAKPOINT_LAPTOP,
      desktop: BREAKPOINT_DESKTOP,
    }
  },
});
