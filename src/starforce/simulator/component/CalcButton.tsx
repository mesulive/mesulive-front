import React from "react";
import LoadingButton from "shared/components/CustomButton/LoadingButton";
import classNames from "classnames/bind";
import { CalculateRounded } from "@mui/icons-material";
import { useStarforce, useStarforceAction } from "shared/hooks/redux/starforce";
import Button from "shared/components/CustomButton/Button";
import styles from "starforce/simulator/component/CalcButton.module.scss";

const cx = classNames.bind(styles);

const CalcButton = () => {
  const isLoading = useStarforce((s) => s.flag.isLoading);
  const progress = useStarforce((s) => s.result.progress);
  const { startCalc, cancelCalc } = useStarforceAction();

  return (
    <div className={cx("container")}>
      <LoadingButton
        className={cx("button")}
        startIcon={<CalculateRounded />}
        loading={isLoading}
        handleClick={() => {
          startCalc();
        }}
      >
        {isLoading ? `계산 중...${progress}%` : "계산하기"}
      </LoadingButton>
      <Button
        className={cx("button")}
        disabled={!isLoading}
        handleClick={() => {
          cancelCalc();
        }}
      >
        계산 취소
      </Button>
    </div>
  );
};

export default CalcButton;
