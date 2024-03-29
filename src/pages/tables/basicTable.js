import React from "react";
import { Card, Table, Modal, Button, message } from "antd";
import axios from "./../../axios/index";
import Utils from "../../utils/utils.js";

const colums = [
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

export default class BasicTable extends React.Component {
  state = {
    loading: false,
    dataSource: [],
    dataSource2: [],
    selectedRadioRowKeys: [],
    selectedCheckboxRowKeys: [],
    selectedRadioItem: [],
    selectedCheckboxItem: [],
    pagination: {},
  };
  params = {
    //URL的参数
    page: 1,
  };
  componentDidMount() {
    const data = [
      {
        id: "0",
        username: "Jack",
        sex: "1",
        state: "1",
        interest: "1",
        birthday: "2000-1-1",
        address: "XX省XX市XXXX大学",
        time: "09:00",
      },
      {
        id: "1",
        username: "Tom",
        sex: "1",
        state: "1",
        interest: "1",
        birthday: "2000-1-1",
        address: "XX省XX市XXXX大学",
        time: "09:00",
      },
      {
        id: "2",
        username: "Lily",
        sex: "1",
        state: "1",
        interest: "1",
        birthday: "2000-1-1",
        address: "XX省XX市XXXX大学",
        time: "09:00",
      },
    ];
    this.setState({
      dataSource: data,
    });
    this.request();
  }

  //动态获取mock数据
  request = () => {
    let _this = this;
    this.setState({ loading: true });
    axios
      .ajax({
        url: "/table/list",
        data: {
          params: {
            page: this.params.page,
          },
          isShowLoading: false,
        },
      })
      .then((res) => {
        if (res.code === "0") {
          this.setState({
            dataSource2: res.result.list,
            loading: false,
            //清空选中的选项
            selectedRadioRowKeys: [],
            selectedCheckboxRowKeys: [],
            selectedRadioItem: [],
            selectedCheckboxItem: [],
            //设置分页的页脚的内容
            pagination: Utils.pagination(res, (current) => {
              //to-do
              _this.params.page = current;
              _this.request();
            }),
          });
        }
      });
  };

  onRowClick = (record, index) => {
    const selectKey = [index];
    Modal.info({
      title: "信息",
      content: `用户ID：${index},用户爱好：${record.interest}`,
    });
    this.setState({
      selectedRadioRowKeys: selectKey,
      selectedRadioItem: record,
    });
  };

  handleCheckboxDelete = () => {
    const rows = this.state.selectedCheckboxItem;
    let ids = [];
    rows.map((item) => {
      ids.push(item.id);
      return item;
    });
    Modal.confirm({
      title: "删除提示",
      content: `您确定要删除这些数据吗？${ids.join(",")}`,
      onOk: () => {
        message.success("删除成功");
        this.request();
      },
      okText: "确定",
      cancelText: "取消",
    });
  };

  render() {
    const selectedRadioRowKeys = this.state.selectedRadioRowKeys;
    const selectedCheckboxRowKeys = this.state.selectedCheckboxRowKeys;
    const rowRadioSelection = {
      type: "radio",
      selectedRowKeys: selectedRadioRowKeys,
      onChange: (index, record) => {
        // 参数顺序相反，需要换位
        this.onRowClick(record[0], index[0]);
      },
    };
    const rowCheckboxSelection = {
      type: "checkbox",
      selectedRowKeys: selectedCheckboxRowKeys,
      onChange: (key, rows) => {
        //onChange表示选项改变之后的按钮
        this.setState({
          selectedCheckboxRowKeys: key,
          selectedCheckboxItem: rows,
        });
      },
    };
    return (
      <div>
        <Card title="基础表格">
          <Table
            columns={colums}
            dataSource={this.state.dataSource}
            bordered
            pagination={false}
            rowKey={(colums) => colums.id}
          />
        </Card>
        <Card title="动态数据渲染表格" style={{ margin: "10px 0" }}>
          <Table
            columns={colums}
            dataSource={this.state.dataSource2}
            bordered
            pagination={false}
            rowKey={(colums) => colums.id}
            loading={this.state.loading}
          />
        </Card>
        <Card title="Mock-单选" style={{ margin: "10px 0" }}>
          <Table
            columns={colums}
            dataSource={this.state.dataSource2}
            bordered
            pagination={false}
            rowKey={(colums) => colums.id}
            loading={this.state.loading}
            rowSelection={rowRadioSelection}
            onRow={(record, index) => {
              //onRow表示选中行之后的操作；record: 数据链 index: 索引
              return {
                onClick: () => {
                  this.onRowClick(record, index);
                },
              };
            }}
          />
        </Card>
        <Card title="Mock-复选" style={{ margin: "10px 0" }}>
          <div style={{ marginBottom: "10px" }}>
            <Button onClick={this.handleCheckboxDelete}>删除</Button>
          </div>
          <Table
            columns={colums}
            dataSource={this.state.dataSource2}
            bordered
            pagination={false}
            rowKey={(colums) => colums.id}
            loading={this.state.loading}
            rowSelection={rowCheckboxSelection}
          />
        </Card>
        <Card
          title="Mock-分页（页码不改变是因为mock数据返回的page页码写死了在1）"
          style={{ margin: "10px 0" }}
        >
          <Table
            columns={colums}
            dataSource={this.state.dataSource2}
            bordered
            rowKey={(colums) => colums.id}
            // 分页用的组件封装了
            pagination={this.state.pagination}
            loading={this.state.loading}
          />
        </Card>
      </div>
    );
  }
}
