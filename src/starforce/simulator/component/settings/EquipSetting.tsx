import React from "react";
import Box from "shared/components/Box/Box";
import classNames from "classnames/bind";
import styles from "starforce/simulator/component/settings/EquipSetting.module.scss";
import EquipLevel from "starforce/simulator/component/settings/EquipLevel";
import SpareCost from "starforce/simulator/component/settings/SpareCost";
import CurrentStar from "starforce/simulator/component/settings/CurrentStar";
import TargetStar from "starforce/simulator/component/settings/TargetStar";

const cx = classNames.bind(styles);

const EquipSetting = () => {
  return (
    <Box title="장비 정보" id="sim/starforce/EquipSetting">
      <div className={cx("flex-container")}>
        <EquipLevel />
        <SpareCost />
        <CurrentStar />
        <TargetStar />
      </div>
    </Box>
  );
};

export default EquipSetting;
