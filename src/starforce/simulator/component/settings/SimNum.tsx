import React from "react";
import { useStarforce, useStarforceAction } from "shared/hooks/redux/starforce";
import { filterValue, putUnit, sliceString } from "shared/utils";
import Input from "shared/components/CustomTextField/Input";

const SimNum = () => {
  const simNum = useStarforce((s) => s.detail.simNum);
  const errorMessage = useStarforce((s) => s.errorMessage.simNum);
  const { setSimNum } = useStarforceAction();
  return (
    <Input
      id="sim/starforce/simNumber"
      label="시뮬레이션 횟수"
      helperText={
        errorMessage || (simNum !== undefined ? putUnit(simNum) : undefined)
      }
      type="number"
      value={filterValue(simNum, undefined, "")}
      handleChange={({ target: { value } }) => {
        if (value === "") {
          setSimNum(undefined);
        } else {
          const n = parseInt(sliceString(value, 6), 10);
          setSimNum(n);
        }
      }}
      error={errorMessage !== ""}
    />
  );
};

export default SimNum;
