import React, { useEffect, useMemo, useState } from "react";
import { useStarforce } from "lib/hooks/redux/starforce";
// import {mean} from "mathjs";
import { putUnit, sliceString } from "lib/utils";
import classNames from "classnames/bind";
import Input from "components/module/Input";
import { CompareArrowsRounded } from "@mui/icons-material";
import DestroyedChart from "./DestroyedChart";
import styles from "./Destroyed.module.scss";

const cx = classNames.bind(styles);

const Destroyed = () => {
  const simNum = useStarforce((s) => s.result.simNum);
  const destroyedArr = useStarforce((s) => s.result.destroyedArr);
  const sum = destroyedArr.reduce((a, b) => a + b, 0);
  const avg = sum / destroyedArr.length || 0;
  // const avg = Math.round(mean(destroyedArr) * 10000) / 10000;
  const [topPct, setTopPct] = useState("");
  const [cnt, setCnt] = useState("");
  const isChartNeeded = useMemo(() => {
    let res = false;
    for (let i = 0; i < destroyedArr.length; i++) {
      if (destroyedArr[i] !== 0) {
        res = true;
        break;
      }
    }
    return res;
  }, [destroyedArr]);

  useEffect(() => {
    if (simNum !== 1) {
      setCnt(avg.toString());
      let i;
      for (i = 0; i < destroyedArr.length; i++) {
        if (destroyedArr[i] > avg) break;
      }
      setTopPct(
        (Math.round((i / destroyedArr.length) * 100 * 1000) / 1000).toString()
      );
    }
  }, [avg, destroyedArr, simNum]);

  return isChartNeeded ? (
    <div className={cx("container")}>
      <h3>파괴 횟수</h3>
      {simNum === 1 ? (
        <p>{putUnit(destroyedArr[0])}</p>
      ) : (
        <>
          <DestroyedChart />
          <p>{`평균 : ${avg}`}</p>
          <div className={cx("input-container")}>
            <Input
              id="sim/starforce/destroyed/topPct"
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
                  if (pct > 0 && pct <= 100) {
                    let i = Math.ceil((destroyedArr.length * pct) / 100) - 1;
                    i = i < 0 ? 0 : i;
                    i = i >= destroyedArr.length ? destroyedArr.length - 1 : i;

                    setCnt(destroyedArr[i].toString());
                  } else {
                    setCnt("");
                  }
                }
              }}
            />
            <CompareArrowsRounded />
            <Input
              id="sim/starforce/destroyed/cnt"
              label=""
              value={cnt}
              endAdornment="회"
              type="number"
              handleChange={({ target: { value: str } }) => {
                const value = sliceString(str, 16);
                setCnt(value);

                if (value !== "") {
                  const c = parseInt(value, 10);
                  if (c >= 0) {
                    let i;
                    for (i = 0; i < destroyedArr.length; i++) {
                      if (destroyedArr[i] > c) break;
                    }

                    if (i === 0) setTopPct("");
                    else if (
                      i === destroyedArr.length &&
                      destroyedArr[i - 1] ===
                        destroyedArr[destroyedArr.length - 1]
                    )
                      setTopPct("100");
                    else
                      setTopPct(
                        (
                          Math.round((i / destroyedArr.length) * 100 * 1000) /
                          1000
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
  ) : null;
};

export default React.memo(Destroyed);
