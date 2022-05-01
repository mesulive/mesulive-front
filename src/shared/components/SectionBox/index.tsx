import React, { ReactNode } from "react";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import {createStyles, FontWeight, mergeStyles, setFont} from "shared/utils/styles";
import {COLOR_PRIMARY_MAIN} from "shared/assets/colors";

interface SectionBoxProps {
  title?: string;
  sx?: SxProps<Theme>;
  id?: string;
  children: ReactNode;
}

function SectionBox({ title, sx, id, children }: SectionBoxProps) {
  const style = useStyle();

  return (
    <Box sx={mergeStyles(style.box, sx)} id={id}>
      {title && <Typography sx={style.title}>{title}</Typography>}
      {children}
    </Box>
  );
}

const useStyle = createStyles((theme) => ({
  box: {
    bgcolor: "white",
    padding: "16px",
    borderRadius: "20px",
    boxShadow: "0 0 30px #7176791A",
    marginBottom: "16px",

    "&:last-child": {
      marginBottom: 0,
    },
  },

  title: {
    ...setFont(16, FontWeight.BOLD),
    color: COLOR_PRIMARY_MAIN,
    display: "block",
    margin: "0 0 16px 0",

    [theme.breakpoints.up("laptop")]: setFont(18),
  },
}));

export default SectionBox;
