import React, { Component } from "react";

import { Card } from "antd";

import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import { LineChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

import echartTheme from "../echartTheme";

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
]);

export default class Line extends Component {
  getOptions = () => {
    let option = {
      title: { text: "用户骑行订单" },
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "订单量",
          type: "line",
          data: [1000, 2000, 1500, 3000, 2000, 1500, 800],
        },
      ],
    };
    return option;
  };

  getOptions2 = () => {
    let option = {
      title: { text: "用户骑行订单" },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["OFO订单量", "摩拜订单量"],
      },
      xAxis: {
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "OFO订单量",
          type: "line",
          data: [1000, 2000, 1500, 3000, 2000, 1500, 800],
        },
        {
          name: "摩拜订单量",
          type: "line",
          data: [1200, 2300, 800, 5600, 3100, 2200, 1000],
        },
      ],
    };
    return option;
  };

  getOptions3 = () => {
    let option = {
      title: { text: "用户骑行订单" },
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        //   X轴从0开始
        boundaryGap: false,
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "订单量",
          type: "line",
          data: [1000, 2000, 1500, 3000, 2000, 1500, 800],
          areaStyle: {},
        },
      ],
    };
    return option;
  };

  componentWillMount() {
    echarts.registerTheme("echartTheme", echartTheme);
  }

  render() {
    return (
      <div>
        <Card title="折线图之一">
          <ReactEChartsCore
            echarts={echarts}
            option={this.getOptions()}
            lazyUpdate={true}
            theme={"echartTheme"}
            style={{ height: 500 }}
          />
        </Card>
        <Card title="折线图之二" style={{ marginTop: 10 }}>
          <ReactEChartsCore
            echarts={echarts}
            option={this.getOptions2()}
            lazyUpdate={true}
            theme={"echartTheme"}
            style={{ height: 500 }}
          />
        </Card>
        <Card title="折线图之三" style={{ marginTop: 10 }}>
          <ReactEChartsCore
            echarts={echarts}
            option={this.getOptions3()}
            lazyUpdate={true}
            theme={"echartTheme"}
            style={{ height: 500 }}
          />
        </Card>
      </div>
    );
  }
}
