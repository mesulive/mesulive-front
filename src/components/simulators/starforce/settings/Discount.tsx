import React from 'react';
import styles from "./Discount.module.scss";
import classNames from "classnames/bind";
import {starforceDiscount} from "lib/starforce";
import CheckBox from "components/module/CheckBox";
import {useStarforce, useStarforceAction} from "lib/hooks/redux/starforce";

const cx = classNames.bind(styles);

const Discount = () => {
  const discount = useStarforce(s => s.detail.discount);
  const {toggleDiscount} = useStarforceAction();

  return (
    <>
      <h3 style={{marginBottom: 0}}>강화 비용 할인</h3>
      <p className={cx("helper-text")}>MVP 할인은 선택한 항목 중 가장 높은 등급으로 계산합니다.</p>
      {
        Object.keys(starforceDiscount).map(key =>
          <CheckBox
            key={`sim/starforce/discount/${key}`}
            label={starforceDiscount[key].label}
            handleChange={() => toggleDiscount(key)}
            checked={discount[key]}
            className={cx("checkbox-label")}
          />
        )
      }
    </>
  );
};

export default Discount;