import React from "react";
import "./RadioGroup.scss";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup as MuiRadioGroup,
} from "@mui/material";
import classNames from "classnames";

type RadioButtonProps = {
  name: string;
  value: any;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  itemList: { v: any; label: any }[];
  className?: string;
};

const RadioGroup = ({
  name,
  value,
  handleChange,
  itemList,
  className,
}: RadioButtonProps) => {
  return (
    <FormControl className={classNames("styled-mui-radio", className)}>
      <MuiRadioGroup name={name} value={value} onChange={handleChange}>
        {itemList.map(({ v, label }) => (
          <FormControlLabel
            key={`${name}/${v}`}
            value={v}
            control={<Radio />}
            label={label}
          />
        ))}
      </MuiRadioGroup>
    </FormControl>
  );
};

export default RadioGroup;
