import React from "react";
import { Checkbox as MuiCheckbox, FormControlLabel } from "@mui/material";
import "shared/components/CustomCheckBox/CheckBox.scss";
import classNames from "classnames";

type CheckboxProps = {
  label: any;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  className?: string;
};

const CheckBox = ({
  label,
  handleChange,
  checked,
  className,
}: CheckboxProps) => {
  return (
    <FormControlLabel
      className={classNames("styled-mui-checkbox", className)}
      control={<MuiCheckbox checked={checked} onChange={handleChange} />}
      label={label}
    />
  );
};

export default CheckBox;