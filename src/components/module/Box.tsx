import React, { ReactNode } from "react";
import "./Box.scss";
import classNames from "classnames";

type BoxProps = {
  title?: string;
  className?: string;
  id?: string;
  children: ReactNode;
};

const Box = ({ title, children, className, id }: BoxProps) => {
  return (
    <div className={classNames("styled-box", className)} id={id}>
      {title && <h2 className="title">{title}</h2>}
      {children}
    </div>
  );
};

export default Box;