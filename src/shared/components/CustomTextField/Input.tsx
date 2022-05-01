import React from "react";
import { InputAdornment, TextField } from "@mui/material";
import "shared/components/CustomTextField/Input.scss";
import classNames from "classnames";

type InputProps = {
  id: string;
  label: string;
  helperText?: string;
  value: any;
  startAdornment?: string;
  endAdornment?: string;
  type?: string;
  maxLength?: number;
  step?: string;
  handleChange: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  disabled?: boolean;
  error?: boolean;
  readOnly?: boolean;
  required?: boolean;
  className?: string;
};

const Input = ({
  id,
  label,
  helperText,
  value,
  startAdornment,
  endAdornment,
  type,
  maxLength,
  step,
  handleChange,
  disabled,
  error,
  readOnly,
  required,
  className,
}: InputProps) => {
  return (
    <TextField
      fullWidth
      className={classNames("styled-mui-input", className)}
      id={id}
      label={label}
      helperText={helperText}
      value={value}
      InputProps={{
        startAdornment: startAdornment ? (
          <InputAdornment position="start">{startAdornment}</InputAdornment>
        ) : undefined,
        endAdornment: endAdornment ? (
          <InputAdornment position="end">{endAdornment}</InputAdornment>
        ) : undefined,
        readOnly,
      }}
      inputProps={{
        type,
        maxLength,
        step,
      }}
      onChange={handleChange}
      disabled={disabled}
      error={error}
      required={required}
    />
  );
};

export default Input;
