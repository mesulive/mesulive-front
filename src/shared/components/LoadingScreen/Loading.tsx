import React from "react";
import classNames from "classnames/bind";
import { CircularProgress } from "@mui/material";
import styles from "shared/components/LoadingScreen/Loading.module.scss";

const cx = classNames.bind(styles);

type LoadingProps = {
  wrapperClassName?: string;
};

const Loading = ({ wrapperClassName }: LoadingProps) => {
  return (
    <div className={cx("wrapper", wrapperClassName)}>
      <CircularProgress />
    </div>
  );
};

export default Loading;
