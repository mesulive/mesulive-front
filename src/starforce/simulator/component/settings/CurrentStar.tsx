import React from "react";
import { useStarforce, useStarforceAction } from "shared/hooks/redux/starforce";
import { filterValue, sliceString } from "shared/utils";
import Input from "shared/components/CustomTextField/Input";

const CurrentStar = () => {
  const currentStar = useStarforce((s) => s.equipInfo.currentStar);
  const errorMessage = useStarforce((s) => s.errorMessage.currentStar);
  const { setCurrentStar } = useStarforceAction();

  return (
    <Input
      id="sim/starforce/current-star"
      label="현재 스타포스"
      endAdornment="성"
      type="number"
      value={filterValue(currentStar, undefined, "")}
      error={errorMessage !== ""}
      helperText={errorMessage || "빈칸이면 0성으로 계산합니다."}
      handleChange={({ target: { value } }) => {
        if (value === "") {
          setCurrentStar(undefined);
        } else {
          const n = parseInt(sliceString(value, 3), 10);
          setCurrentStar(n);
        }
      }}
    />
  );
};

export default CurrentStar;
