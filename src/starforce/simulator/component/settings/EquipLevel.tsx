import React from "react";
import { useStarforce, useStarforceAction } from "shared/hooks/redux/starforce";
import { filterValue, sliceString } from "shared/utils";
import Input from "shared/components/CustomTextField/Input";

const EquipLevel = () => {
  const equipLevel = useStarforce((s) => s.equipInfo.equipLevel);
  const errorMessage = useStarforce((s) => s.errorMessage.equipLevel);
  const { setEquipLevel } = useStarforceAction();

  return (
    <Input
      id="sim/starforce/equip-level"
      label="장비 레벨"
      endAdornment="Lev"
      type="number"
      value={filterValue(equipLevel, undefined, "")}
      error={errorMessage !== ""}
      helperText={errorMessage}
      handleChange={({ target: { value } }) => {
        if (value === "") {
          setEquipLevel(undefined);
        } else {
          const level = parseInt(sliceString(value, 4), 10);
          setEquipLevel(level);
        }
      }}
    />
  );
};

export default EquipLevel;
