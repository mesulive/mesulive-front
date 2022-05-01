import React from "react";
import { useStarforce, useStarforceAction } from "shared/hooks/redux/starforce";
import { filterValue, sliceString } from "shared/utils";
import Input from "shared/components/CustomTextField/Input";

const TargetStar = () => {
  const targetStar = useStarforce((s) => s.equipInfo.targetStar);
  const errorMessage = useStarforce((s) => s.errorMessage.targetStar);
  const { setTargetStar } = useStarforceAction();

  return (
    <Input
      id="sim/starforce/target-star"
      label="목표 스타포스"
      endAdornment="성"
      type="number"
      error={errorMessage !== ""}
      helperText={errorMessage}
      value={filterValue(targetStar, undefined, "")}
      handleChange={({ target: { value } }) => {
        if (value === "") {
          setTargetStar(undefined);
        } else {
          const n = parseInt(sliceString(value, 3), 10);
          setTargetStar(n);
        }
      }}
    />
  );
};

export default TargetStar;
