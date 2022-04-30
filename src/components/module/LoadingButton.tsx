import React, { ReactNode } from "react";
import { LoadingButton as MuiLoadingButton } from "@mui/lab";
import "./Button.scss";
import classNames from "classnames";

type LoadingButtonProps = {
  variant?: "text" | "contained" | "outlined";
  className?: string;
  startIcon?: any;
  endIcon?: any;
  loading?: boolean;
  handleClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
};

const LoadingButton = ({
  children,
  variant,
  className,
  startIcon,
  endIcon,
  loading,
  handleClick,
  disabled,
}: LoadingButtonProps) => {
  return (
    <MuiLoadingButton
      className={classNames("styled-mui-button", className)}
      disableElevation
      variant={variant || "contained"}
      startIcon={startIcon}
      endIcon={endIcon}
      loading={loading}
      loadingPosition={endIcon !== undefined ? "end" : "start"}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </MuiLoadingButton>
  );
};

export default LoadingButton;