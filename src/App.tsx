import React, { useCallback, useEffect, useMemo, useState } from "react";
import Header from "components/common/Header";
import Navigation from "components/common/Navigation";
import classNames from "classnames/bind";
import variables from "lib/styles/utils.module.scss";
import { Route, Routes } from "react-router-dom";
import MainPage from "pages/MainPage";
import Starforce from "pages/simulators/Starforce";
import NotFoundPage from "pages/NotFoundPage";
import useWindowDimensions from "lib/hooks/useWindowDimensions";
import { Button, Drawer, NoSsr, Stack } from "@mui/material";
import * as Highcharts from "highcharts";
import { createBrowserHistory } from "history";
import { GA } from "lib/ga";
import styles from "./App.module.scss";

const cx = classNames.bind(styles);

const browserHistory = createBrowserHistory();
browserHistory.listen(({ location }) => {
  GA.trackPageView({ path: location.pathname + location.search });
});

const App = () => {
  /*
   * naviActive : boolean - 네비게이션 사이드바의 활성화 여부
   * overlayActive : boolean - 네비게이션과 함께 보여지는 불투명 배경 overlay의 애니메이션 활성화 여부
   */
  const [naviActive, setNaviActive] = useState(false);
  const { width } = useWindowDimensions();
  const { breakpoint_tablet, breakpoint_desktop } = useMemo(
    () => ({
      breakpoint_tablet: Number(variables.breakpoint_tablet),
      breakpoint_desktop: Number(variables.breakpoint_desktop),
    }),
    []
  );

  const toggleNavi = useCallback(() => {
    setNaviActive(!naviActive); // 비동기임에 주의
    for (let i = 0; i < Highcharts.charts.length; i++) {
      if (Highcharts.charts[i] !== undefined) {
        setTimeout(() => Highcharts.charts[i]?.reflow(), 300);
      }
    }
  }, [naviActive]);

  useEffect(() => {
    GA.trackPageView({
      path: window.location.pathname + window.location.search,
    });
  }, []);

  return (
    <>
      <Header toggleNavi={toggleNavi} />
      <NoSsr>
        <Drawer
          open={breakpoint_desktop <= width ? true : naviActive}
          onClose={() => toggleNavi()}
          anchor="left"
          variant={width < breakpoint_tablet ? "temporary" : "persistent"}
          transitionDuration={300}
          className={cx("drawer")}
        >
          <Navigation active={naviActive} toggleNavi={toggleNavi} />
        </Drawer>
      </NoSsr>
      <div
        className={cx("container", {
          "navi-active": breakpoint_desktop <= width ? true : naviActive,
        })}
      >
        <main className={cx("page")}>
          {/*
           * TODO
           *  CubeCalcPage, FlameCalcPage, CubeSimPage 완성
           */}
          <Routes>
            <Route path="calc/*">
              <Route path="flame" element={<NotFoundPage />} />
              <Route path="cube" element={<NotFoundPage />} />
              {/* <Route path="flame" element={<FlameCalcPage/>}/> */}
              {/* <Route path="cube" element={<CubeCalcPage/>}/> */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>
            <Route path="sim/*">
              <Route path="starforce" element={<Starforce />} />
              <Route path="cube" element={<NotFoundPage />} />
              {/* <Route path="cube" element={<CubeSimPage/>}/> */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>
            <Route path="/" element={<MainPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <footer>
          <Stack alignItems="center">
            <a
              href="https://toss.me/vetan2"
              style={{ marginBottom: "12px" }}
              target="_blank"
              rel="noreferrer"
            >
              <Button
                sx={{
                  color: "white",
                  borderRadius: "16px",
                  minWidth: 200,
                  fontFamily: "Jua",
                  fontSize: "18px",
                  padding: "12px 16px 8px",
                  "& .MuiTouchRipple-root": { color: "white" },
                }}
                variant="contained"
              >
                제작자에게 커피 사주기
              </Button>
            </a>
            Copyright 2022. mesulive All rights reserved.
            <br />
            mesulive is not associated with NEXON Korea.
            <br />
            Contact: help@mesu.live
          </Stack>
        </footer>
      </div>
    </>
  );
};

export default App;
