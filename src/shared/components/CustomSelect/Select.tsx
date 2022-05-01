import React from "react";
import {
  Select as MuiSelect,
  InputLabel,
  FormControl,
  MenuItem,
  SelectChangeEvent,
  FormHelperText,
} from "@mui/material";
import "shared/components/CustomTextField/Input.scss";
import classNames from "classnames";

type SelectProps = {
  labelId: string;
  selectId: string;
  label: string;
  helperText?: string;
  value: any;
  handleChange: (event: SelectChangeEvent) => void;
  itemList: { value: any; name: any }[];
  disabled?: boolean;
  error?: boolean;
  readOnly?: boolean;
  required?: boolean;
  className?: string;
};

const Select = ({
  labelId,
  selectId,
  label,
  helperText,
  value,
  handleChange,
  itemList,
  disabled,
  error,
  readOnly,
  required,
  className,
}: SelectProps) => {
  return (
    <FormControl
      fullWidth
      className={classNames("styled-mui-input", className)}
      disabled={disabled}
      error={error}
      required={required}
    >
      <InputLabel id={labelId}>{label}</InputLabel>
      <MuiSelect
        labelId={labelId}
        id={selectId}
        value={value}
        label={label}
        onChange={handleChange}
        inputProps={{ readOnly }}
      >
        {itemList.map(({ value, name }) => (
          <MenuItem value={value} key="id/value">
            {name}
          </MenuItem>
        ))}
      </MuiSelect>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default Select;