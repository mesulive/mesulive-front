import React, {Suspense} from 'react';
import styles from "./Starforce.module.scss";
import classNames from "classnames/bind";
import {Helmet} from "react-helmet";
import Loading from "components/common/Loading";

const EquipSetting = React.lazy(() => import("components/simulators/starforce/settings/EquipSetting"));
const DetailSetting = React.lazy(() => import("components/simulators/starforce/settings/DetailSetting"));
const CalcButton = React.lazy(() => import("components/simulators/starforce/CalcButton"));
const Result = React.lazy(() => import("components/simulators/starforce/result/Result"));

const cx = classNames.bind(styles);

const Starforce = () => {
  return (
    <div className={cx("wrapper")}>
      <Helmet>
        <title>스타포스 시뮬레이터</title>
        <meta name="description" content="메이플스토리 스타포스 시뮬레이터"/>
        <meta property="og:title" content="스타포스 시뮬레이터"/>
        <meta property="og:description" content="메이플스토리 스타포스 시뮬레이터"/>
      </Helmet>
      <div className={cx("container")}>
        <h1 className={cx("title")}>스타포스 시뮬레이터</h1>
        <p className={cx("info")}>모바일 환경에서 실행 시 렉이 있을 수 있습니다. PC 환경에서의 사용을 권장드립니다.</p>
        <Suspense fallback={<Loading wrapperClassName={cx("loading-wrapper")}/>}>
          <div className={cx("content-container")}>
            <div className={cx("column")}>
              <EquipSetting/>
              <DetailSetting/>
              <CalcButton/>
            </div>
            <Result className={cx("column")}/>
          </div>
        </Suspense>
      </div>
    </div>
  )
};

export default React.memo(Starforce);