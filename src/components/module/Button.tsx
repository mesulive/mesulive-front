import React from 'react';
import {Button as MuiButton} from "@mui/material";
import "./Button.scss";
import classNames from "classnames";

type ButtonProps = {
  variant?: "text" | "contained" | "outlined";
  className?: string;
  startIcon?: any;
  endIcon?: any;
  handleClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = (
  {
    children,
    variant,
    className,
    startIcon,
    endIcon,
    handleClick,
    disabled,
  }
) => {
  return (
    <MuiButton
      className={classNames("styled-mui-button", className)}
      disableElevation
      variant={variant || "contained"}
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </MuiButton>
  );
};

export default Button;