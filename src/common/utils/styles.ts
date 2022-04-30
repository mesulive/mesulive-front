import { SxProps, Theme, useTheme } from "@mui/material";
import { SerializedStyles } from "@emotion/react";

export function mergeStyles(
  ...styles: (SxProps<Theme> | undefined)[]
): SxProps<Theme> {
  return styles.flatMap((s) => {
    if (s) {
      return Array.isArray(s) ? s : [s];
    }
    return {};
  });
}

export function createStyles<
  T extends Record<string, SxProps<Theme> | SerializedStyles>
>(styles: T | ((theme: Theme) => T)): () => Readonly<T> {
  return () => {
    const theme = useTheme();
    return typeof styles === "function" ? styles(theme) : styles;
  };
}
