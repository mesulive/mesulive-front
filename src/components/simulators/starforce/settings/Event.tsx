import React from "react";
import { useStarforce, useStarforceAction } from "lib/hooks/redux/starforce";
import classNames from "classnames/bind";
import RadioGroup from "components/module/RadioGroup";
import styles from "./Event.module.scss";

const cx = classNames.bind(styles);

const Event = () => {
  const event = useStarforce((s) => s.detail.event);
  const { setEvent } = useStarforceAction();

  return (
    <>
      <h3>스타포스 이벤트</h3>
      <RadioGroup
        name="sim/starforce/event"
        value={event}
        handleChange={(e) => setEvent(e.target.value)}
        className={cx("radio")}
        itemList={[
          { v: "none", label: "없음" },
          { v: "1+1", label: "10성 이하에서 강화 시 1+1" },
          { v: "30%", label: "비용 30% 할인" },
          { v: "1516", label: "5, 10, 15성에서 강화 시 성공확률 100%" },
          { v: "shining", label: "샤이닝 스타포스" },
        ]}
      />
    </>
  );
};

export default Event;
