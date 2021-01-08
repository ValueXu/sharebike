import React from "react";
import { Card, Table } from "antd";
import Axios from "../../axios/index.js";

const columns = [
    {
      title: "id",
      dataIndex: "id",
    },
    {
      title: "用户名",
      dataIndex: "username",
    },
    {
      title: "性别",
      dataIndex: "sex",
      render(sex) {
        return sex === 1 ? "男" : "女";
      },
    },
    {
      title: "状态",
      dataIndex: "state",
      render(state) {
        let config = {
          1: "咸鱼一条",
          2: "风华浪子",
          3: "北大才子",
          4: "高管",
          5: "创业者",
        };
        return config[state];
      },
    },
    {
      title: "爱好",
      dataIndex: "interest",
      render(state) {
        let config = {
          1: "游泳",
          2: "打篮球",
          3: "踢足球",
          4: "跑步",
          5: "爬山",
          6: "骑行",
          7: "桌球",
          8: "麦霸",
        };
        return config[state];
      },
    },
    {
      title: "生日",
      dataIndex: "birthday",
    },
    {
      title: "地址",
      dataIndex: "address",
    },
    {
      title: "早起时间",
      dataIndex: "time",
    },
  ];
  

export default class HighTable extends React.Component {
  state = {
    dataSource: [],
    loading:false,
  };
  params = {
    page: 1,
  };

  require = () => {
      this.setState({
          loading:true,
      })
    Axios.ajax({
      url: "/table/list",
      data: {
        params: {
          page: this.params.page,
        },
        isShowLoading: false,
      },
    }).then((res) => {
      if (res.code === "0") {
        this.setState({
          dataSource: res.result.list,
          loading:false
        });
      }
    });
  };
  componentDidMount(){
    this.require();
    
}
  render() {
    return (
      <div>
        <Card title="高级表格">
            <Table
                dataSource={this.state.dataSource}
                loading={this.loading}
                columns={columns}
            >
            </Table>
        </Card>
      </div>
    );
  }
}
