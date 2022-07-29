import { ThemeComponents } from "lib/types";

const MuiButton: ThemeComponents["MuiButton"] = {
  styleOverrides: {
    root: ({ ownerState, theme }) => ({
      whiteSpace: "nowrap",
      "&, &:hover, &:active": {
        boxShadow: "none",
      },
    }),
  },
};

export default MuiButton;
