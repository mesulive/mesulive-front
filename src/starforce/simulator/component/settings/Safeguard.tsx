import React from "react";
import { useStarforce, useStarforceAction } from "shared/hooks/redux/starforce";
import { shallowEqual } from "react-redux";
import classNames from "classnames/bind";
import ToggleButton from "shared/components/CustomToggle/ToggleButton";
import { getReachableStar } from "starforce/shared/utils/starforce";
import Label from "shared/components/Typography/Label";
import styles from "starforce/simulator/component/settings/Safeguard.module.scss";

const cx = classNames.bind(styles);

const Safeguard = () => {
  const [equipLevel, targetStar] = useStarforce(
    ({ equipInfo }) => [equipInfo.equipLevel, equipInfo.targetStar],
    shallowEqual
  );
  const safeguardArr = useStarforce((s) => s.detail.safeguardArr);
  const event = useStarforce((s) => s.detail.event);
  const { toggleSafeguard } = useStarforceAction();

  return (
    <>
      <Label>파괴 방지</Label>
      <div className={cx("toggle-grid-container")}>
        {safeguardArr.map((v, i) => {
          return (
            <div
              className={cx("toggle-button")}
              key={`sim/starforce/safeguard/${i + 12}`}
            >
              <ToggleButton
                value={v}
                handleChange={() => toggleSafeguard(i)}
                disabled={
                  (equipLevel !== undefined &&
                    i + 12 >= getReachableStar(equipLevel)) ||
                  (targetStar !== undefined && i + 12 >= targetStar) ||
                  ((event === "1516" || event === "shining") && i + 12 === 15)
                }
              >
                {`${i + 12}성`}
              </ToggleButton>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Safeguard;
