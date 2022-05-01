import React from "react";
import Box from "shared/components/Box/Box";
import classNames from "classnames/bind";
import factory from "highcharts/modules/histogram-bellcurve";
import * as Highcharts from "highcharts";
import { useStarforce } from "shared/hooks/redux/starforce";
import Boost from "highcharts/modules/boost";
import Cost from "starforce/simulator/component/result/Cost";
import Destroyed from "starforce/simulator/component/result/Destroyed";
import styles from "starforce/simulator/component/result/Result.module.scss";

factory(Highcharts);
Boost(Highcharts);

const cx = classNames.bind(styles);

type ResultProps = {
  className?: string;
};

const Result = ({ className }: ResultProps) => {
  const simNum = useStarforce((s) => s.result.simNum);

  return simNum !== 0 ? (
    <div className={className}>
      <Box
        title="시뮬레이션 결과"
        id="sim/starforce/result"
        className={cx("box")}
      >
        <div className={cx("helper-text")}>
          각 차트에선 하위 0.1%가 생략되어 있습니다.
        </div>
        <Cost />
        <Destroyed />
      </Box>
    </div>
  ) : null;
};

export default Result;
