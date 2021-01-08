import React from "react";
import { Tabs, Card, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./ui.less";
const { TabPane } = Tabs;

const initPanes = [
  {
    title: "页签1",
    content: "页签内容",
    key: "1",
    closable: false,
  },
  {
    title: "页签2",
    content: "页签内容",
    key: "2",
  },
  {
    title: "页签3",
    content: "页签内容",
    key: "3",
  },
];

export default class Tab extends React.Component {
  state = {
    activeKey: initPanes[0].key,
    panes: initPanes,
  };

  callBack = (key) => {
    message.info(`您选择了页签：${key}`);
  };

  setActiveKey = (activeKey) => {
    this.setState({
      activeKey,
    });
    message.info(`你选择了页签${activeKey}`);
  };

  newTabIndex = 0;

  edit = (targetKey, action) => {
    this[action](targetKey);
  };

  add = () => {
    const panes = this.state.panes;
    const activeKey = Number(panes[panes.length - 1].key) + 1;
    const newPanes = [...panes];
    newPanes.push({
      title: `页签${activeKey}`,
      content: "页签内容",
      key: `${activeKey}`,
    });
    this.setState({
      panes: newPanes,
      activeKey: `${activeKey}`,
    });
  };

  remove = (targetKey) => {
    let newActiveKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      //pane: 当前对象，i: 当前元素的索引值
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = this.state.panes.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    this.setState({
      panes: newPanes,
      activeKey: `${newActiveKey}`,
    });
  };

  render() {
    return (
      <div>
        <Card title="Tab页签" className="card-wrap">
          <Tabs defaultActiveKey="1" onChange={this.callBack}>
            <TabPane tab="页签1" key="1">
              页签内容
            </TabPane>
            <TabPane tab="页签2" key="2" disabled={true}>
              页签内容
            </TabPane>
            <TabPane tab="页签3" key="3">
              页签内容
            </TabPane>
          </Tabs>
        </Card>
        <Card title="Tab带图的页签" className="card-wrap">
          <Tabs defaultActiveKey="1" onChange={this.callBack}>
            <TabPane
              tab={
                <span>
                  <PlusOutlined />
                  页签1
                </span>
              }
              key="1"
            >
              页签内容
            </TabPane>
            <TabPane
              tab={
                <span>
                  <EditOutlined />
                  页签2
                </span>
              }
              key="2"
            >
              页签内容
            </TabPane>
            <TabPane
              tab={
                <span>
                  <DeleteOutlined />
                  页签3
                </span>
              }
              key="3"
            >
              页签内容
            </TabPane>
          </Tabs>
        </Card>
        <Card title="Tab可编辑页签" className="card-wrap">
          <Tabs
            activeKey={this.state.activeKey}
            onChange={this.setActiveKey}
            type="editable-card"
            onEdit={this.edit}
          >
            {this.state.panes.map((items) => (
              <TabPane tab={items.title} key={items.key}>
                {items.content}
              </TabPane>
            ))}
          </Tabs>
        </Card>
      </div>
    );
  }
}
