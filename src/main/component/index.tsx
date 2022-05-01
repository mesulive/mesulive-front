import React from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { GA } from "shared/utils/ga";
import styles from "main/component/MainPage.module.scss";
import { createStyles, FontWeight, setFont } from "shared/styles";
import { BREAKPOINT_DESKTOP } from "shared/assets/breakpoints";
import { NAVI_WIDTH_DESKTOP } from "shared/components/Navigation/Navigation";
import { Theme, Typography } from "@mui/material";
import { SystemStyleObject } from "@mui/system/styleFunctionSx/styleFunctionSx";
import { COLOR_BLACK_3, COLOR_BLACK_4 } from "shared/assets/colors";
import SectionBox from "shared/components/SectionBox";

const cx = classNames.bind(styles);

const MainPage = () => {
  const style = useStyle();

  return (
    <div className={cx("wrapper")}>
      <Helmet>
        <title>메수라이브 - 메이플 시뮬레이터, 계산기</title>
        <meta
          name="description"
          content="메수라이브, 각종 메이플 시뮬레이터와 기댓값 계산기"
        />
        <meta
          property="og:title"
          content="메수라이브 - 메이플 시뮬레이터, 계산기"
        />
        <meta
          property="og:description"
          content="메수라이브, 각종 메이플 시뮬레이터와 기댓값 계산기"
        />
      </Helmet>
      <SectionBox sx={style.sectionBox}>
        <Typography variant="h1">mesu.live</Typography>
        <Typography variant="h2">
          메이플스토리의 각종 확률형 시스템에 대한 기댓값 계산기와 시뮬레이션
          웹서비스입니다.
          <br />
          문의는 help@mesu.live로 부탁드립니다.
        </Typography>
        <div className={cx("menu-container")}>
          <Link
            to="/calc/flame"
            className={cx("link-button", "button-disabled")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="20.48 5 63.25999999999999 89.94"
            >
              <path d="M 63.3 30.22 l -0.2 -0.09 A 22.53 22.53 0 0 1 50 5 A 33.77 33.77 0 0 0 27.63 33.9 q -0.09 1.09 -0.12 2.19 c 0 0.24 0 0.48 0 0.73 a 33.59 33.59 0 0 0 5.66 18.71 A 11.23 11.23 0 0 1 20.48 44.88 A 33.76 33.76 0 0 0 47.94 94.94 a 15.48 15.48 0 0 1 -9.19 -13.81 c 0 -0.11 0 -0.22 0 -0.33 a 15.46 15.46 0 0 1 9.37 -14.22 l 0.08 0 h 0 a 12.65 12.65 0 0 0 7.64 -11.61 A 15.49 15.49 0 0 1 64 67.24 c 0 0.34 0 0.68 0.05 1 c 0 0.11 0 0.22 0 0.33 a 15.39 15.39 0 0 1 -2.59 8.58 L 60.21 79 l 2.25 0.29 a 7.12 7.12 0 0 0 0.9 0.06 a 7 7 0 0 0 5.71 -2.92 a 15.45 15.45 0 0 1 -3.34 14.65 A 33.75 33.75 0 0 0 83.74 62 c 0 -0.24 0 -0.48 0 -0.73 A 33.76 33.76 0 0 0 63.3 30.22 Z" />
            </svg>
            <div className={cx("button-name")}>환생의 불꽃 기댓값 계산기</div>
          </Link>
          <a
            href="https://cubemesu.co"
            target="_blank"
            className={cx("link-button")}
            rel="noreferrer"
            onClick={() => {
              GA.takeOtherEvent({ action: "move to cubemesu.co" });
            }}
          >
            <svg id="Icons" version="1.1" viewBox="0 0 32 32">
              <g>
                <path d="m 16 15.8 l 12.3 -7.1 l -12.3 -7.1 l -12.3 7.1 l 12.3 7.1 z" />
                <path d="M 15 17.6 l -12 -6.9 v 13 l 12 6.9 v -13 z" />
                <path d="M 17 17.6 v 13 l 12 -6.9 v -13 l -12 6.9 z" />
              </g>
            </svg>
            <div className={cx("button-name")}>큐브 기댓값 계산기</div>
          </a>
          <Link to="/sim/starforce" className={cx("link-button")}>
            <svg version="1.1" viewBox="0 0 24 24">
              <g id="info" />
              <g id="icons">
                <path
                  d="M12.9,2.6l2.3,5c0.1,0.3,0.4,0.5,0.7,0.6l5.2,0.8C22,9,22.3,10,21.7,10.6l-3.8,3.9c-0.2,0.2-0.3,0.6-0.3,0.9   l0.9,5.4c0.1,0.8-0.7,1.5-1.4,1.1l-4.7-2.6c-0.3-0.2-0.6-0.2-0.9,0l-4.7,2.6c-0.7,0.4-1.6-0.2-1.4-1.1l0.9-5.4   c0.1-0.3-0.1-0.7-0.3-0.9l-3.8-3.9C1.7,10,2,9,2.8,8.9l5.2-0.8c0.3,0,0.6-0.3,0.7-0.6l2.3-5C11.5,1.8,12.5,1.8,12.9,2.6z"
                  id="favorite"
                />
              </g>
            </svg>
            <div className={cx("button-name")}>스타포스 시뮬레이터</div>
          </Link>
          <Link to="/sim/cube" className={cx("link-button", "button-disabled")}>
            <svg id="Icons" version="1.1" viewBox="0 0 32 32">
              <g>
                <path d="m 16 15.8 l 12.3 -7.1 l -12.3 -7.1 l -12.3 7.1 l 12.3 7.1 z" />
                <path d="M 15 17.6 l -12 -6.9 v 13 l 12 6.9 v -13 z" />
                <path d="M 17 17.6 v 13 l 12 -6.9 v -13 l -12 6.9 z" />
              </g>
            </svg>
            <div className={cx("button-name")}>큐브 시뮬레이터</div>
          </Link>
        </div>
        <a
          className={cx("made-by-character")}
          href="https://maple.gg/u/%EC%BF%A0%EB%9D%BC%ED%85%8C"
          target="_blank"
          rel="noreferrer"
          onClick={() => {
            GA.takeOtherEvent({ action: "move to maple.gg" });
          }}
        >
          <img
            src="https://avatar.maplestory.nexon.com/Character/180/BCNAOFMJFMMDLCEIJAPMMIMKKPFAKBDFEEBHIBLHJCCNNEPADJGEOGIJPIDNPAEIEIMPGLHKCNMOCDGOHGBFCDJLMGILHPDEHOGMEFLIKMJBAJGILNAJLCMGOLBBCBPMLEBCHMIPGCDPNKHDPJDKCGFGPOJAODKIDOEJDGBDNGOGAKEAOBHEOCODNGCIEJMKMLFPGBIJMFFDJIILDDICOOLAFNMMMGFHBIDCIJMMOJPPIFEEIECCKCOFIPFAGLIL.png"
            alt="character"
          />
        </a>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <a
            className={cx("made-by-nickname")}
            href="https://maple.gg/u/%EC%BF%A0%EB%9D%BC%ED%85%8C"
            target="_blank"
            rel="noreferrer"
            onClick={() => {
              GA.takeOtherEvent({ action: "move to maple.gg" });
            }}
          >
            제작자: 쿠라테
            <img
              src="https://ssl.nexon.com/s2/game/maplestory/renewal/common/world_icon/icon_3.png"
              alt="reboot-icon"
            />
          </a>
        </div>
      </SectionBox>
    </div>
  );
};

const useStyle = createStyles((theme) => ({
  sectionBox: {
    [theme.breakpoints.between("laptop", "desktop")]: {
      width: "100%",
    },

    [theme.breakpoints.up("desktop")]: {
      width: BREAKPOINT_DESKTOP - NAVI_WIDTH_DESKTOP - 16 * 2,
    },

    "& .MuiTypography-root": {
      margin: 0,
    },

    "& .MuiTypography-h1": {
      ...(setFont(32, FontWeight.BOLD) as SystemStyleObject<Theme>),
      color: COLOR_BLACK_3,
    },

    "& .MuiTypography-h2": {
      ...(setFont(12, FontWeight.MEDIUM) as SystemStyleObject<Theme>),
      color: COLOR_BLACK_4,
      marginTop: "4px",

      [theme.breakpoints.up("laptop")]: {
        ...setFont(14, FontWeight.REGULAR),
      },
    },
  },
}));

export default React.memo(MainPage);
