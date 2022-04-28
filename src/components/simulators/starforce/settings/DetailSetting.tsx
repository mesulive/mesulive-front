import React from "react";
import Box from "components/module/Box";
import SimNum from "./SimNum";
import Safeguard from "./Safeguard";
import Starcatch from "./Starcatch";
import Event from "./Event";
import Discount from "./Discount";

const DetailSetting = () => {
  return (
    <Box title="세부 설정" id="sim/starforce/DetailSetting">
      <SimNum />
      <Safeguard />
      <Starcatch />
      <Event />
      <Discount />
    </Box>
  );
};

export default DetailSetting;
