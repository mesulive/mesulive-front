import React from "react";
import { useStarforce, useStarforceAction } from "shared/hooks/redux/starforce";
import { shallowEqual } from "react-redux";
import classNames from "classnames/bind";
import ToggleButton from "shared/components/CustomToggle/ToggleButton";
import { getReachableStar } from "starforce/shared/utils/starforce";
import Label from "shared/components/Typography/Label";
import styles from "starforce/simulator/component/settings/Starcatch.module.scss";

const cx = classNames.bind(styles);

const Starcatch = () => {
  const [equipLevel, currentStar, targetStar] = useStarforce(
    ({ equipInfo }) => [
      equipInfo.equipLevel,
      equipInfo.currentStar,
      equipInfo.targetStar,
    ],
    shallowEqual
  );
  const starcatchArr = useStarforce((s) => s.detail.starcatchArr);
  const event = useStarforce((s) => s.detail.event);
  const { toggleStarcatch } = useStarforceAction();
  return (
    <>
      <Label>스타캐치</Label>
      <div className={cx("toggle-grid-container")}>
        {starcatchArr.map((v, i) => {
          return (
            <div
              className={cx("toggle-button")}
              key={`sim/starforce/starcatch/${i}`}
            >
              <ToggleButton
                value={v}
                handleChange={() => toggleStarcatch(i)}
                disabled={
                  (equipLevel !== undefined &&
                    i >= getReachableStar(equipLevel)) ||
                  (currentStar !== undefined &&
                    ((i < currentStar && i < 10) ||
                      (event === "1+1" &&
                        i > currentStar &&
                        i <= 10 &&
                        i % 2 === 1))) ||
                  (targetStar !== undefined && i >= targetStar) ||
                  ((event === "1516" || event === "shining") &&
                    i > 0 &&
                    i < 16 &&
                    i % 5 === 0)
                }
              >
                {`${i}성`}
              </ToggleButton>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Starcatch;
