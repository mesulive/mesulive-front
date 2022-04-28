import React from 'react';
import {useStarforce, useStarforceAction} from "lib/hooks/redux/starforce";
import {shallowEqual} from "react-redux";
import styles from "./Starcatch.module.scss";
import classNames from "classnames/bind";
import ToggleButton from "components/module/ToggleButton";
import {getReachableStar} from "lib/starforce";

const cx = classNames.bind(styles);

const Starcatch = () => {
  const [equipLevel, currentStar, targetStar] =
    useStarforce(({equipInfo}) => [equipInfo.equipLevel, equipInfo.currentStar, equipInfo.targetStar], shallowEqual);
  const starcatchArr = useStarforce(s => s.detail.starcatchArr);
  const event = useStarforce(s => s.detail.event);
  const {toggleStarcatch} = useStarforceAction();
  return (
    <>
      <h3>스타캐치</h3>
      <div className={cx("toggle-grid-container")}>
        {
          starcatchArr.map((v, i) => {
            return (
              <div className={cx("toggle-button")} key={`sim/starforce/starcatch/${i}`}>
                <ToggleButton
                  value={v}
                  handleChange={() => toggleStarcatch(i)}
                  disabled={
                    (equipLevel !== undefined && i >= getReachableStar(equipLevel)) ||
                    (currentStar !== undefined &&
                      (
                        (i < currentStar && i < 10) ||
                        (event === "1+1" && i > currentStar && i <= 10 && i % 2 === 1)
                      )
                    ) ||
                    (targetStar !== undefined && i >= targetStar) ||
                    ((event === "1516" || event === "shining") && 0 < i && i < 16 && i % 5 === 0)
                  }
                >
                  {`${i}성`}
                </ToggleButton>
              </div>
            )
          })
        }
      </div>
    </>
  );
};

export default Starcatch;