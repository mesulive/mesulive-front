import React, {ReactNode} from 'react';
import {ToggleButton as MuiToggleButton} from "@mui/material";
import "./ToggleButton.scss";
import classNames from "classnames";

type ToggleButtonProps = {
  value: boolean;
  handleChange: () => void;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

const ToggleButton = (
  {
    children,
    value,
    handleChange,
    disabled,
    className
  }: ToggleButtonProps
) => {
  return (
    <MuiToggleButton
      className={classNames("styled-mui-toggle", className)}
      value={value}
      onChange={handleChange}
      disabled={disabled}
    >
      {children}
    </MuiToggleButton>
  );
};

export default ToggleButton;