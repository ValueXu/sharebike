import React from "react";
import { Card, Table, Badge, Modal, message, Button } from "antd";
import Axios from "../../axios/index.js";

const columns = [
  {
    title: "id",
    dataIndex: "id",
    width: 80,
  },
  {
    title: "用户名",
    dataIndex: "username",
    width: 80,
  },
  {
    title: "性别",
    dataIndex: "sex",
    render(sex) {
      return sex === 1 ? "男" : "女";
    },
    width: 80,
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
    width: 80,
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
    width: 80,
  },
  {
    title: "生日",
    dataIndex: "birthday",
    width: 120,
  },
  {
    title: "地址",
    dataIndex: "address",
    width: 120,
  },
  {
    title: "早起时间",
    dataIndex: "time",
    width: 120,
  },
];

const columns2 = [
  {
    title: "id",
    dataIndex: "id",
    width: 80,
    fixed: "left",
  },
  {
    title: "用户名",
    dataIndex: "username",
    width: 80,
    fixed: "left",
  },
  {
    title: "性别",
    dataIndex: "sex",
    render(sex) {
      return sex === 1 ? "男" : "女";
    },
    width: 80,
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
    width: 80,
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
    width: 80,
  },
  {
    title: "生日",
    dataIndex: "birthday",
    width: 120,
  },
  {
    title: "生日",
    dataIndex: "birthday",
    width: 120,
  },
  {
    title: "生日",
    dataIndex: "birthday",
    width: 120,
  },
  {
    title: "生日",
    dataIndex: "birthday",
    width: 120,
  },
  {
    title: "生日",
    dataIndex: "birthday",
    width: 120,
  },
  {
    title: "生日",
    dataIndex: "birthday",
    width: 120,
  },
  {
    title: "生日",
    dataIndex: "birthday",
    width: 120,
  },
  {
    title: "生日",
    dataIndex: "birthday",
    width: 120,
  },
  {
    title: "生日",
    dataIndex: "birthday",
    width: 120,
  },
  {
    title: "生日",
    dataIndex: "birthday",
    width: 120,
  },
  {
    title: "生日",
    dataIndex: "birthday",
    width: 120,
  },
  {
    title: "生日",
    dataIndex: "birthday",
    width: 120,
  },
  {
    title: "地址",
    dataIndex: "address",
    width: 120,
    fixed: "right",
  },
  {
    title: "早起时间",
    dataIndex: "time",
    width: 120,
    fixed: "right",
  },
];

const columns3 = [
  {
    title: "id",
    dataIndex: "id",
    width: 80,
  },
  {
    title: "用户名",
    dataIndex: "username",
    width: 80,
  },
  {
    title: "性别",
    dataIndex: "sex",
    render(sex) {
      return sex === 1 ? "男" : "女";
    },
    width: 80,
  },
  {
    title: "年龄",
    dataIndex: "age",
    width: 80,
    sorter: (a, b) => {
      return a.age - b.age;
    },
    sortDirections: ["ascend", "descend", "ascend"],
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
    width: 80,
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
    width: 80,
  },
  {
    title: "生日",
    dataIndex: "birthday",
    width: 120,
  },
  {
    title: "地址",
    dataIndex: "address",
    width: 120,
  },
  {
    title: "早起时间",
    dataIndex: "time",
    width: 120,
  },
];



export default class HighTable extends React.Component {
  state = {
    dataSource: [],
    loading: false,
  };
  params = {
    page: 1,
  };

  handleChange = (pagination, filters, sorter, extra) => {
    // this.setState({
    //   sorterOrder:sorter.order
    // })
  };

  handleDelete=(item)=>{
    // let id=item.id;
    Modal.confirm({
      title:'确认',
      content:'您确认要删除此条数据吗？',
      onOk:()=>{
        message.success({
          content:'删除成功'
        });
        this.request();
      }
    })
  }

  request = () => {
    this.setState({
      loading: true,
    });
    Axios.ajax({
      url: "/table/high/list",
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
          loading: false,
        });
      }
    });
  };
  columns4 = [
    {
      title: "id",
      dataIndex: "id",
      width: 80,
    },
    {
      title: "用户名",
      dataIndex: "username",
      width: 80,
    },
    {
      title: "性别",
      dataIndex: "sex",
      render(sex) {
        return sex === 1 ? "男" : "女";
      },
      width: 80,
    },
    {
      title: "年龄",
      dataIndex: "age",
      width: 80,
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
      width: 80,
    },
    {
      title: "爱好",
      dataIndex: "interest",
      render(state) {
        let config = {
          1: <Badge status="success" text="游泳"/>,
          2: <Badge status="error" text="打篮球"/>,
          3: <Badge status="default" text="踢足球"/>,
          4: <Badge status="processing" text="跑步"/>,
          5: <Badge status="warning" text="爬山"/>,
          6: <Badge status="success" text="骑行"/>,
          7: <Badge status="error" text="桌球"/>,
          8: <Badge status="default" text="麦霸"/>,
        };
        return config[state];
      },
      width: 80,
    },
    {
      title: "生日",
      dataIndex: "birthday",
      width: 120,
    },
    {
      title: "地址",
      dataIndex: "address",
      width: 120,
    },
    {
      title: "操作",
      render:(text,item)=>{
        return <Button size="small" onClick={(item)=>{this.handleDelete(item)}}>删除</Button>
      },
      width: 120,
    },
  ];

  componentDidMount() {
    this.request();
  }
  render() {
    return (
      <div>
        <Card title="头部固定">
          <Table
            dataSource={this.state.dataSource}
            loading={this.state.loading}
            columns={columns}
            pagination={false}
            scroll={{ y: 240 }}
            rowKey={(columns) => {
              return columns.id;
            }}
          ></Table>
        </Card>
        <Card title="两侧固定">
          <Table
            dataSource={this.state.dataSource}
            loading={this.state.loading}
            columns={columns2}
            pagination={false}
            scroll={{ x: 2088, y: 240 }}
            rowKey={(columns) => {
              return columns.id;
            }}
          ></Table>
        </Card>
        <Card title="表格排序">
          <Table
            dataSource={this.state.dataSource}
            loading={this.state.loading}
            columns={columns3}
            pagination={false}
            scroll={{ y: 240 }}
            rowKey={(columns) => {
              return columns.id;
            }}
            onChange={this.handleChange}
          ></Table>
        </Card>
        <Card title="操作按钮">
          <Table
            dataSource={this.state.dataSource}
            loading={this.state.loading}
            columns={this.columns4}
            pagination={false}
            scroll={{ y: 240 }}
            rowKey={(columns) => {
              return columns.id;
            }}
          ></Table>
        </Card>
      </div>
    );
  }
}
