import React from "react";
import { useStarforce, useStarforceAction } from "lib/hooks/redux/starforce";
import { shallowEqual } from "react-redux";
import classNames from "classnames/bind";
import ToggleButton from "components/module/ToggleButton";
import { getReachableStar } from "lib/starforce";
import { Button, Stack } from "@mui/material";
import styles from "./Safeguard.module.scss";

const cx = classNames.bind(styles);

const Safeguard = () => {
  const [equipLevel, targetStar] = useStarforce(
    ({ equipInfo }) => [equipInfo.equipLevel, equipInfo.targetStar],
    shallowEqual
  );
  const safeguardArr = useStarforce((s) => s.detail.safeguardArr);
  const event = useStarforce((s) => s.detail.event);
  const { toggleSafeguard, toggleAllSafeguard } = useStarforceAction();

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        sx={{ marginTop: 16, marginBottom: 8 }}
      >
        <h3 style={{ margin: 0 }}>파괴 방지</h3>
        <Button
          sx={{
            fontSize: "12px",
            fontWeight: "bold",
            padding: 4,
            minWidth: 0,
            boxSizing: "content-box",
            height: 16,
            marginLeft: 8,
          }}
          onClick={toggleAllSafeguard}
        >
          {safeguardArr.some((value) => value) ? "모두 해제" : "모두 선택"}
        </Button>
      </Stack>
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
