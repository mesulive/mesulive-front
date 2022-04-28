import React from 'react';
import classNames from "classnames/bind";
import styles from "./Loading.module.scss";
import {CircularProgress} from "@mui/material";

const cx = classNames.bind(styles);

type Props = {
  wrapperClassName?: string;
}

const Loading: React.FC<Props> = (
  {
    wrapperClassName
  }
) => {
  return (
    <div className={cx("wrapper", wrapperClassName)}>
      <CircularProgress/>
    </div>
  );
};

export default Loading;