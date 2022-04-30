import React from "react";
import { useStarforce } from "lib/hooks/redux/starforce";
import * as Highcharts from "highcharts";
import { putUnit } from "lib/utils";
import variable from "lib/styles/utils.module.scss";
import HighchartsReact from "highcharts-react-official";
import classNames from "classnames/bind";
import { Skeleton } from "@mui/material";
import styles from "./CostChart.module.scss";

const cx = classNames.bind(styles);

const CostChart = () => {
  const isLoading = useStarforce((s) => s.flag.isLoading);
  const simNum = useStarforce((s) => s.result.simNum);
  const costArr = useStarforce((s) => s.result.costArr);
  const data = costArr.slice(0, Math.round(simNum * 0.999));
  let bin = 30;
  let width = Math.ceil((data[data.length - 1] - data[0]) / bin);
  const digit = width.toString().length;
  width = Math.round(width / 10 ** (digit - 1)) * 10 ** (digit - 1);

  for (let i = 0; i < data.length; i++) {
    data[i] = Math.floor(data[i] / width) * width;
  }
  bin = data[data.length - 1] / width + 1;

  // 마지막 바가 A 이상 ~ B 이하를 모두 포함하는 Highcharts의 문제를 해결
  for (let i = data.length - 2; i >= 0; i--) {
    if (data[i] < data[data.length - 1]) break;
    data[i] += width;
  }
  data[data.length - 1] += width;

  const options: Highcharts.Options = {
    title: {
      text: "",
    },

    credits: {
      enabled: false,
    },

    xAxis: [
      {
        title: { text: "Data" },
        alignTicks: false,
        visible: false,
      },
      {
        title: { text: "메소" },
        alignTicks: false,
        labels: {
          formatter() {
            let value;
            if (typeof this.value === "string")
              value = parseInt(this.value, 10);
            else value = this.value;

            return `${putUnit(value)}`;
          },
        },
      },
    ],

    yAxis: [
      {
        title: { text: "Data" },
        visible: false,
      },
      {
        title: { text: "횟수" },
      },
    ],

    plotOptions: {
      scatter: {
        turboThreshold: 1000,
      },
      histogram: {
        accessibility: {
          point: {
            valueDescriptionFormat:
              "{index}. {point.x:.3f} to {point.x2:.3f}, {point.y}.",
          },
        },
        color: variable.primaryColor_light_2,
      },
    },

    tooltip: {
      formatter() {
        return `${putUnit(this.point.x)} ~ ${putUnit(
          this.point.x + width
        )} : <b x=8 y=40>${this.point.y}회</b>`;
      },
    },

    series: [
      {
        name: "소모 비용",
        type: "histogram",
        baseSeries: "s1",
        xAxis: 1,
        yAxis: 1,
        binsNumber: bin,
        binWidth: width,
        showInLegend: false,
      },
      {
        name: "Data",
        type: "scatter",
        data,
        id: "s1",
        marker: {
          radius: 1.5,
        },
        visible: false,
        showInLegend: false,
      },
    ],
  };

  return !isLoading ? (
    <div className={cx("container")}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  ) : (
    <Skeleton
      variant="rectangular"
      height={400}
      animation="wave"
      className={cx("skeleton")}
    />
  );
};

export default React.memo(CostChart);
