import React from "react";
import SectionBox from "shared/components/SectionBox";
import SimNum from "starforce/simulator/component/settings/SimNum";
import Safeguard from "starforce/simulator/component/settings/Safeguard";
import Starcatch from "starforce/simulator/component/settings/Starcatch";
import Event from "starforce/simulator/component/settings/Event";
import Discount from "starforce/simulator/component/settings/Discount";

const DetailSetting = () => {
  return (
    <SectionBox title="세부 설정" id="sim/starforce/DetailSetting">
      <SimNum />
      <Safeguard />
      <Starcatch />
      <Event />
      <Discount />
    </SectionBox>
  );
};

export default DetailSetting;
