import {createTheme} from "@mui/material";
import variables from "lib/styles/utils.module.scss";

const theme = createTheme({
  palette: {
    primary: {
      main: variables.primaryColor,
      dark: variables.primaryColor_dark
    },
    secondary: {
      main: variables.secondaryColor
    },
    error: {
      main: variables.errorColor
    }
  }
});

export default theme;