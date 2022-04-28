import React from 'react';
import Box from "components/module/Box";
import styles from "./Result.module.scss";
import classNames from "classnames/bind";
import factory from "highcharts/modules/histogram-bellcurve";
import * as Highcharts from "highcharts";
import Cost from "./Cost";
import Destroyed from "./Destroyed";
import {useStarforce} from "lib/hooks/redux/starforce";
import Boost from 'highcharts/modules/boost';

factory(Highcharts);
Boost(Highcharts);

const cx = classNames.bind(styles);

type Props = {
  className?:string
}

const Result:React.FC<Props> = ({className}) => {
  const simNum = useStarforce(s => s.result.simNum);

  return (
    simNum !== 0 ?
      <div className={className}>
        <Box title="시뮬레이션 결과" id="sim/starforce/result" className={cx("box")}>
          <div className={cx("helper-text")}>각 차트에선 하위 0.1%가 생략되어 있습니다.</div>
          <Cost/>
          <Destroyed/>
        </Box>
      </div> :
      null
  );
};

export default Result;