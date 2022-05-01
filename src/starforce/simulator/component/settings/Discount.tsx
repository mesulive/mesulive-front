import React from "react";
import classNames from "classnames/bind";
import { starforceDiscount } from "starforce/shared/utils/starforce";
import CheckBox from "shared/components/CustomCheckBox/CheckBox";
import { useStarforce, useStarforceAction } from "shared/hooks/redux/starforce";
import Label from "shared/components/Typography/Label";
import styles from "starforce/simulator/component/settings/Discount.module.scss";

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
