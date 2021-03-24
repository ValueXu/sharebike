import React from "react";
import { Card } from "antd";

import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import { PieChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

import echartTheme from "../echartThemeLight";

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
]);

export default class Pie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getOptions = () => {
    let option = {
      title: { text: "用户骑行订单", x: "center" },
      legend: {
        orient: "vertical",
        right: 10,
        top: 20,
        bottom: 20,
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      },
      tooltip: {
        trigger: "item",
        formatter: "{a}<br/>{b}:{c}({d}%)",
      },
      series: [
        {
          name: "订单量",
          type: "pie",
          data: [
            {
              value: 1000,
              name: "周一",
            },
            {
              value: 3000,
              name: "周二",
            },
            {
              value: 4000,
              name: "周三",
            },
            {
              value: 2300,
              name: "周四",
            },
            {
              value: 3200,
              name: "周五",
            },
            {
              value: 3100,
              name: "周六",
            },
            {
              value: 5500,
              name: "周日",
            },
          ],
        },
      ],
    };
    return option;
  };

  getOptions2 = () => {
    let option = {
      title: { text: "用户骑行订单", x: "center" },
      legend: {
        orient: "vertical",
        right: 10,
        top: 20,
        bottom: 20,
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      },
      tooltip: {
        trigger: "item",
        formatter: "{a}<br/>{b}:{c}({d}%)",
      },
      series: [
        {
          name: "订单量",
          type: "pie",
          radius: ["50%", "80%"],
          // 设置圆的中心
          center: ["50%", "55%"],
          data: [
            {
              value: 1000,
              name: "周一",
            },
            {
              value: 3000,
              name: "周二",
            },
            {
              value: 4000,
              name: "周三",
            },
            {
              value: 2300,
              name: "周四",
            },
            {
              value: 3200,
              name: "周五",
            },
            {
              value: 3100,
              name: "周六",
            },
            {
              value: 5500,
              name: "周日",
            },
          ],
        },
      ],
    };
    return option;
  };

  getOptions3 = () => {
    let option = {
      title: { text: "用户骑行订单", x: "center" },
      legend: {
        orient: "vertical",
        right: 10,
        top: 20,
        bottom: 20,
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      },
      tooltip: {
        trigger: "item",
        formatter: "{a}<br/>{b}:{c}({d}%)",
      },
      series: [
        {
          name: "订单量",
          type: "pie",
          // 设置圆的中心
          center: ["50%", "55%"],
          data: [
            {
              value: 1000,
              name: "周一",
            },
            {
              value: 3000,
              name: "周二",
            },
            {
              value: 4000,
              name: "周三",
            },
            {
              value: 2300,
              name: "周四",
            },
            {
              value: 3200,
              name: "周五",
            },
            {
              value: 3100,
              name: "周六",
            },
            {
              value: 5500,
              name: "周日",
            },
          ].sort((a, b) => {
            return a.value - b.value;
          }),
          roseType: "radius",
          animationType: "scale",
          animationEasing: "elasticOut",
          animationDelay: function (idx) {
            return Math.random() * 200;
          },
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
        <Card title="饼图之一">
          <ReactEChartsCore
            echarts={echarts}
            option={this.getOptions()}
            lazyUpdate={true}
            theme={"echartTheme"}
            style={{ height: 500 }}
          />
        </Card>
        <Card title="饼图之二" style={{ marginTop: 10 }}>
          <ReactEChartsCore
            echarts={echarts}
            option={this.getOptions2()}
            lazyUpdate={true}
            theme={"echartTheme"}
            style={{ height: 500 }}
          />
        </Card>
        <Card title="饼图之三" style={{ marginTop: 10 }}>
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
