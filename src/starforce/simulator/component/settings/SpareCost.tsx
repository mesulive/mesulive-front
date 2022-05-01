import React from "react";
import { useStarforce, useStarforceAction } from "shared/hooks/redux/starforce";
import { filterValue, putUnit, sliceString } from "shared/utils";
import Input from "shared/components/CustomTextField/Input";

const SpareCost = () => {
  const spareCost = useStarforce((s) => s.equipInfo.spareCost);
  const errorMessage = useStarforce((s) => s.errorMessage.spareCost);
  const { setSpareCost } = useStarforceAction();

  return (
    <Input
      id="sim/starforce/spare-cost"
      label="스페어 가격"
      endAdornment="메소"
      type="number"
      value={filterValue(spareCost, undefined, "")}
      error={errorMessage !== ""}
      helperText={
        errorMessage ||
        (spareCost !== undefined
          ? putUnit(spareCost!)
          : "빈칸이면 0메소로 계산합니다.")
      }
      handleChange={({ target: { value } }) => {
        if (value === "") {
          setSpareCost(undefined);
        } else {
          const n = parseInt(sliceString(value, 12), 10);
          setSpareCost(n);
        }
      }}
    />
  );
};

export default SpareCost;
