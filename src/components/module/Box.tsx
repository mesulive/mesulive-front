import React from 'react';
import "./Box.scss";
import classNames from "classnames";

type BoxProps = {
  title?: string;
  className?: string;
  id?:string;
}

const Box: React.FC<BoxProps> = (
  {
    title,
    children,
    className,
    id,
  }
) => {
  return (
    <div className={classNames("styled-box", className)} id={id}>
      {
        title && <h2 className="title">{title}</h2>
      }
      {children}
    </div>
  );
};

export default Box;