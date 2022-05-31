import React from "react";
import Box from "components/module/Box";
import classNames from "classnames/bind";
import styles from "components/simulators/starforce/settings/EquipSetting.module.scss";
import EquipLevel from "components/simulators/starforce/settings/EquipLevel";
import SpareCost from "components/simulators/starforce/settings/SpareCost";
import CurrentStar from "components/simulators/starforce/settings/CurrentStar";
import TargetStar from "components/simulators/starforce/settings/TargetStar";

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
