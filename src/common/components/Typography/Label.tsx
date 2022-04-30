import React, { ReactNode } from "react";
import { SxProps, Theme, Typography } from "@mui/material";
import {
  createStyles,
  FontWeight,
  mergeStyles,
  setFont,
} from "common/utils/styles";
import { COLOR_BLACK_2 } from "common/assets/colors";
import HelperText from "common/components/Typography/HelperText";

interface InputLabelProps {
  sx?: SxProps<Theme>;
  children: ReactNode;
  helperText?: string;
}

const Label = ({ sx, children, helperText }: InputLabelProps) => {
  const style = useStyle();
  return (
    <>
      <Typography
        sx={mergeStyles(
          {
            ...style.label,
            ...(helperText && {
              marginBottom: 0,
            }),
          },
          sx
        )}
      >
        {children}
      </Typography>
      {helperText && <HelperText>{helperText}</HelperText>}
    </>
  );
};

const useStyle = createStyles((theme) => ({
  label: {
    ...setFont(14, FontWeight.BOLD),
    color: COLOR_BLACK_2,
    margin: "16px 0 8px",

    [theme.breakpoints.up("laptop")]: setFont(16),
  },
}));

export default Label;
