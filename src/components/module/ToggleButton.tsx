import React from 'react';
import {ToggleButton as MuiToggleButton} from "@mui/material";
import "./ToggleButton.scss";
import classNames from "classnames";

type ToggleButtonProps = {
  value: boolean;
  handleChange: () => void;
  disabled?: boolean;
  className?: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = (
  {
    children,
    value,
    handleChange,
    disabled,
    className
  }
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