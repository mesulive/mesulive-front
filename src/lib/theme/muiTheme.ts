import { createTheme } from "@mui/material";
import MuiButton from "lib/theme/button";
import palette from "./palette";

const theme = createTheme({
  typography: {
    fontFamily: "Noto Sans KR, Roboto",
  },
  spacing: 1,
  palette,
  components: {
    MuiButton,
  },
});

export default theme;
