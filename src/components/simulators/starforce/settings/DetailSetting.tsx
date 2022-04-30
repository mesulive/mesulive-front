import React from "react";
import SectionBox from "common/components/SectionBox";
import SimNum from "./SimNum";
import Safeguard from "./Safeguard";
import Starcatch from "./Starcatch";
import Event from "./Event";
import Discount from "./Discount";

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
