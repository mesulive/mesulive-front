import React from 'react';
import styles from "./NotFoundPage.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const NotFoundPage = () => {
  return (
    <div className={cx("wrapper")}>
      <h1>404</h1>
      <h2>잘못된 페이지입니다. 주소를 확인해주세요.</h2>
    </div>
  );
};

export default NotFoundPage;