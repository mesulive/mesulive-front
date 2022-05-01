import React, { ReactNode } from "react";
import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";
import styles from "shared/components/Navigation/Navigation.module.scss";

const cx = classNames.bind(styles);

type NavigationProps = {
  active: boolean;
  toggleNavi: () => any;
};

type LinkProps = {
  to: string;
  onClick: () => any;
  disabled?: boolean;
  beta?: boolean;
  children: ReactNode;
};

const Link = ({ to, onClick, disabled, beta, children }: LinkProps) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        isActive
          ? cx(
              "link",
              { "link-disabled": disabled },
              { "link-beta": beta },
              "link-active"
            )
          : cx("link", { "link-beta": beta }, { "link-disabled": disabled })
      }
    >
      {children}
    </NavLink>
  );
};

const Navigation: React.FC<React.PropsWithChildren<NavigationProps>> = ({
  active,
  toggleNavi,
}) => {
  return (
    <nav className={cx("box", { "navi-active": active })}>
      <div className={cx("group")}>
        <div className={cx("group-label")}>기댓값 계산기</div>
        <Link to="/calc/flame" onClick={toggleNavi} disabled>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="20.48 5 63.25999999999999 89.94"
          >
            <path d="M 63.3 30.22 l -0.2 -0.09 A 22.53 22.53 0 0 1 50 5 A 33.77 33.77 0 0 0 27.63 33.9 q -0.09 1.09 -0.12 2.19 c 0 0.24 0 0.48 0 0.73 a 33.59 33.59 0 0 0 5.66 18.71 A 11.23 11.23 0 0 1 20.48 44.88 A 33.76 33.76 0 0 0 47.94 94.94 a 15.48 15.48 0 0 1 -9.19 -13.81 c 0 -0.11 0 -0.22 0 -0.33 a 15.46 15.46 0 0 1 9.37 -14.22 l 0.08 0 h 0 a 12.65 12.65 0 0 0 7.64 -11.61 A 15.49 15.49 0 0 1 64 67.24 c 0 0.34 0 0.68 0.05 1 c 0 0.11 0 0.22 0 0.33 a 15.39 15.39 0 0 1 -2.59 8.58 L 60.21 79 l 2.25 0.29 a 7.12 7.12 0 0 0 0.9 0.06 a 7 7 0 0 0 5.71 -2.92 a 15.45 15.45 0 0 1 -3.34 14.65 A 33.75 33.75 0 0 0 83.74 62 c 0 -0.24 0 -0.48 0 -0.73 A 33.76 33.76 0 0 0 63.3 30.22 Z" />
          </svg>
          환생의 불꽃
        </Link>
        <Link to="/calc/cube" onClick={toggleNavi} disabled>
          <svg id="Icons" version="1.1" viewBox="0 0 32 32">
            <g>
              <path d="m 16 15.8 l 12.3 -7.1 l -12.3 -7.1 l -12.3 7.1 l 12.3 7.1 z" />
              <path d="M 15 17.6 l -12 -6.9 v 13 l 12 6.9 v -13 z" />
              <path d="M 17 17.6 v 13 l 12 -6.9 v -13 l -12 6.9 z" />
            </g>
          </svg>
          큐브
        </Link>
      </div>
      <div className={cx("group")}>
        <div className={cx("group-label")}>시뮬레이터</div>
        <Link to="/sim/starforce" onClick={toggleNavi} beta>
          <svg version="1.1" viewBox="0 0 24 24">
            <g id="info" />
            <g id="icons">
              <path
                d="M12.9,2.6l2.3,5c0.1,0.3,0.4,0.5,0.7,0.6l5.2,0.8C22,9,22.3,10,21.7,10.6l-3.8,3.9c-0.2,0.2-0.3,0.6-0.3,0.9   l0.9,5.4c0.1,0.8-0.7,1.5-1.4,1.1l-4.7-2.6c-0.3-0.2-0.6-0.2-0.9,0l-4.7,2.6c-0.7,0.4-1.6-0.2-1.4-1.1l0.9-5.4   c0.1-0.3-0.1-0.7-0.3-0.9l-3.8-3.9C1.7,10,2,9,2.8,8.9l5.2-0.8c0.3,0,0.6-0.3,0.7-0.6l2.3-5C11.5,1.8,12.5,1.8,12.9,2.6z"
                id="favorite"
              />
            </g>
          </svg>
          스타포스
        </Link>
        <Link to="/sim/cube" onClick={toggleNavi} disabled>
          <svg id="Icons" version="1.1" viewBox="0 0 32 32">
            <g>
              <path d="m 16 15.8 l 12.3 -7.1 l -12.3 -7.1 l -12.3 7.1 l 12.3 7.1 z" />
              <path d="M 15 17.6 l -12 -6.9 v 13 l 12 6.9 v -13 z" />
              <path d="M 17 17.6 v 13 l 12 -6.9 v -13 l -12 6.9 z" />
            </g>
          </svg>
          큐브
        </Link>
      </div>
    </nav>
  );
};

export default React.memo(Navigation);
