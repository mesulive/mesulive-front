import React, { ReactNode } from "react";
import { IconButton as MuiIconButton } from "@mui/material";
import "shared/components/CustomButton/Button.scss";
import classNames from "classnames";

type IconButtonProps = {
  handleClick?: () => void;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
};

const IconButton = ({
  children,
  handleClick,
  disabled,
  className,
}: IconButtonProps) => {
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
