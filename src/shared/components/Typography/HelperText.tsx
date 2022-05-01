import React, { ReactNode } from "react";
import { SxProps, Theme, Typography } from "@mui/material";
import {
  createStyles,
  FontWeight,
  mergeStyles,
  setFont,
} from "shared/styles";
import { COLOR_BLACK_5 } from "shared/assets/colors";

interface HelperTextProps {
  sx?: SxProps<Theme>;
  children: ReactNode;
}

const HelperText = ({ sx, children }: HelperTextProps) => {
  const style = useStyle();
  return (
    <Typography sx={mergeStyles(sx, style.helperText)}>{children}</Typography>
  );
};

const useStyle = createStyles((theme) => ({
  helperText: {
    ...setFont(10, FontWeight.MEDIUM),
    color: COLOR_BLACK_5,
    margin: 0,

    [theme.breakpoints.up("laptop")]: setFont(11),
  },
}));
export default HelperText;
