import React, { useEffect, useState } from "react";
import { useStarforce } from "lib/hooks/redux/starforce";
import styles from "./Cost.module.scss";
import classNames from "classnames/bind";
import { putUnit, sliceString } from "lib/utils";
import Input from "components/module/Input";
import { CompareArrowsRounded } from "@mui/icons-material";
// import {mean} from "mathjs";
import CostChart from "./CostChart";

const cx = classNames.bind(styles);

const Cost = () => {
  const simNum = useStarforce((s) => s.result.simNum);
  const costArr = useStarforce((s) => s.result.costArr);
  const sum = costArr.reduce((a, b) => a + b, 0);
  const avg = Math.round(sum / costArr.length) || 0;
  // const avg = Math.round(mean(costArr));
  const [topPct, setTopPct] = useState("");
  const [cost, setCost] = useState("");

  useEffect(() => {
    if (simNum !== 1) {
      setCost(avg.toString());
      let i;
      for (i = 0; i < costArr.length; i++) {
        if (costArr[i] > avg) break;
      }
      setTopPct(
        (Math.round((i / costArr.length) * 100 * 1000) / 1000).toString()
      );
    }
  }, [avg, costArr, simNum]);

  return (
    <div className={cx("container")}>
      <h3>소모 비용</h3>
      {simNum === 1 ? (
        <p>{putUnit(costArr[0])}</p>
      ) : (
        <>
          <CostChart />
          <p>평균: {putUnit(avg)}</p>
          <div className={cx("input-container")}>
            <Input
              id="sim/starforce/cost/topPct"
              label=""
              value={topPct}
              startAdornment="상위"
              endAdornment="%"
              type="number"
              step="0.001"
              handleChange={({ target: { value: str } }) => {
                const value = sliceString(str, 6);
                setTopPct(value);

                if (value !== "") {
                  const pct = parseFloat(value);
                  if (0 < pct && pct <= 100) {
                    let i = Math.ceil((costArr.length * pct) / 100) - 1;
                    i = i < 0 ? 0 : i;
                    i = i >= costArr.length ? costArr.length - 1 : i;

                    setCost(costArr[i].toString());
                  } else {
                    setCost("");
                  }
                }
              }}
            />
            <CompareArrowsRounded />
            <Input
              id="sim/starforce/cost/cost"
              label=""
              helperText={cost !== "" ? putUnit(parseInt(cost, 10)) : "0"}
              value={cost}
              endAdornment="메소"
              type="number"
              handleChange={({ target: { value: str } }) => {
                const value = sliceString(str, 16);
                setCost(value);

                if (value !== "") {
                  const c = parseInt(value);
                  if (0 < c) {
                    let i;
                    for (i = 0; i < costArr.length; i++) {
                      if (costArr[i] > c) break;
                    }

                    if (i === 0) setTopPct("");
                    else if (
                      i === costArr.length &&
                      costArr[i - 1] === costArr[costArr.length - 1]
                    )
                      setTopPct("100");
                    else
                      setTopPct(
                        (
                          Math.round((i / costArr.length) * 100 * 1000) / 1000
                        ).toString()
                      );
                  }
                }
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Cost;