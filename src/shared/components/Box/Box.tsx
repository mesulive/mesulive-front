import React, { ReactNode } from "react";
import "shared/components/Box/Box.scss";
import classNames from "classnames";

interface BoxProps {
  title?: string;
  className?: string;
  id?: string;
  children: ReactNode;
}

// @deprecated SectionBox로 이전할 것
function Box({ title, children, className, id }: BoxProps) {
  return (
    <div className={classNames("styled-box", className)} id={id}>
      {title && <h2 className="title">{title}</h2>}
      {children}
    </div>
  );
}

export default Box;
