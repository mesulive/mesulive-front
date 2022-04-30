import React, { ReactNode } from "react";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import { mergeStyles } from "common/utils/styles";
import useStyle from "./style";

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

export default SectionBox;
