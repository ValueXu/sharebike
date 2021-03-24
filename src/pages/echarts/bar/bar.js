import React from "react";
import { Card } from "antd";

import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import { BarChart } from "echarts/charts";
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
  LegendComponent,
  GridComponent,
  BarChart,
  CanvasRenderer,
]);

export default class Bar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getOptions = () => {
    let option = {
      title: {
        text: "用户骑行订单",
      },
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
          type: "bar",
          data: [1000, 2000, 1500, 3000, 2000, 1200, 800],
        },
      ],
    };
    return option;
  };

  getOptions2 = () => {
    let option = {
      title: {
        text: "用户骑行订单",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: [
          {
            name: "OFO",
          },
          {
            name: "摩拜",
          },
          {
            name: "小蓝",
          },
        ],
      },
      xAxis: {
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "OFO",
          type: "bar",
          data: [1000, 2000, 5500, 7000, 8000, 12000, 20000],
        },
        {
          name: "摩拜",
          type: "bar",
          data: [1500, 2800, 3500, 6000, 8000, 10000, 15800],
        },
        {
          name: "小蓝",
          type: "bar",
          data: [1000, 2000, 2500, 3000, 3800, 4000, 6000],
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
        <Card title="柱形图表之一">
          <ReactEChartsCore
            echarts={echarts}
            option={this.getOptions()}
            lazyUpdate={true}
            theme={"echartTheme"}
            style={{ height: 500 }}
          />
        </Card>
        <Card title="柱形图表之二" style={{ marginTop: 10 }}>
          <ReactEChartsCore
            echarts={echarts}
            option={this.getOptions2()}
            lazyUpdate={true}
            theme={"echartTheme"}
            style={{ height: 500 }}
          />
        </Card>
      </div>
    );
  }
}
