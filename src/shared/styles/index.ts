import { SxProps, Theme, useTheme } from "@mui/material";

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

export function createStyles<T extends Record<string, SxProps<Theme>>>(
  styles: T | ((theme: Theme) => T)
): () => Readonly<T> {
  return () => {
    const theme = useTheme();
    return typeof styles === "function" ? styles(theme) : styles;
  };
}

export enum FontWeight {
  THIN = 100,
  EXTRA_LIGHT = 200,
  LIGHT = 300,
  REGULAR = 400,
  MEDIUM = 500,
  SEMI_BOLD = 600,
  BOLD = 700,
  EXTRA_BOLD = 800,
  BLACK = 900,
}

export function setFont(px: number, weight?: number): SxProps<Theme> {
  return {
    fontSize: `${px}px`,
    ...(weight && {
      fontWeight: weight,
    }),
    letterSpacing: `${px * -0.025}px`,
    lineHeight: "normal",
  };
}
