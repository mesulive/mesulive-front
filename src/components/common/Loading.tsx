import React from "react";
import classNames from "classnames/bind";
import styles from "./Loading.module.scss";
import { CircularProgress } from "@mui/material";

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
