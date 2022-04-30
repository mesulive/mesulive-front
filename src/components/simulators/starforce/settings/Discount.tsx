import React from "react";
import classNames from "classnames/bind";
import { starforceDiscount } from "lib/starforce";
import CheckBox from "components/module/CheckBox";
import { useStarforce, useStarforceAction } from "lib/hooks/redux/starforce";
import Label from "common/components/Typography/Label";
import styles from "./Discount.module.scss";

const cx = classNames.bind(styles);

const Discount = () => {
  const discount = useStarforce((s) => s.detail.discount);
  const { toggleDiscount } = useStarforceAction();

  return (
    <>
      <Label helperText="MVP 할인은 선택한 항목 중 가장 높은 등급으로 계산합니다.">
        강화 비용 할인
      </Label>
      {Object.keys(starforceDiscount).map((key) => (
        <CheckBox
          key={`sim/starforce/discount/${key}`}
          label={starforceDiscount[key].label}
          handleChange={() => toggleDiscount(key)}
          checked={discount[key]}
          className={cx("checkbox-label")}
        />
      ))}
    </>
  );
};

export default Discount;
