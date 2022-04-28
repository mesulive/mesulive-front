import React from 'react';
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import {Button} from "@mui/material";

const cx = classNames.bind(styles);

type HeaderProps = {
  toggleNavi: () => any;
}

const Header = ({toggleNavi}: HeaderProps) => {
  return (
    <header className={cx("box")}>
      <Button className={cx("menu-button")} onClick={toggleNavi}>
        <MenuRoundedIcon className={cx("menu-icon")}/>
      </Button>
      <a href="/">
        <img className={cx("logo")} src={`${process.env.PUBLIC_URL}/img/logo.svg`} alt="logo"/>
      </a>
    </header>
  );
};

export default React.memo(Header);