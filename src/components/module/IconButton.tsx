import React from 'react';
import {IconButton as MuiIconButton} from "@mui/material";
import "./Button.scss";
import classNames from "classnames";

type IconButtonProps = {
  handleClick?: () => void;
  disabled?: boolean;
  className?:string;
}

const IconButton: React.FC<IconButtonProps> = (
  {
    children,
    handleClick,
    disabled,
    className,
  }
) => {
  return (
    <MuiIconButton
      className={classNames("styled-mui-button", className)}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </MuiIconButton>
  );
};

export default IconButton;