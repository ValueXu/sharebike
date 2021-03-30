import React from "react";
import { Menu } from "antd";
import MenuConfig from "./../../config/menuConfig";
import "./index.less";
import { NavLink } from "react-router-dom";

import { connect } from "react-redux";
import { switchMenu } from "../../redux/action/action";

const { SubMenu } = Menu;

class NavLeft extends React.Component {
  constructor(props) {
    super(props);
    let selectedKeys = [window.location.hash.replace(/#|\?.*$/g, "")];
    this.state = {
      selectedKeys,
    };
    this.menuTreeNode = this.renderMenu(MenuConfig);
  }

  //菜单渲染
  renderMenu = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <SubMenu title={item.title} key={item.key}>
            {this.renderMenu(item.children)}
          </SubMenu>
        );
      }
      //   菜单渲染的时候顺便判断一下初始的key处在哪个title下并初始化面包屑
      if (item.key === this.state.selectedKeys[0]) {
        this.changeTitle(item.title);
      }
      return (
        <Menu.Item title={item.title} key={item.key}>
          <NavLink to={item.key}>{item.title}</NavLink>
        </Menu.Item>
      );
    });
  };

  handleClick = (e) => {
    this.changeTitle(e.item.props.title);
    this.setState({
      selectedKeys: [e.key],
    });
  };

  changeTitle = (title) => {
    //   使用redux更改值
    const { dispatch } = this.props;
    dispatch(switchMenu(title));
  };

  render() {
    return (
      <div>
        <div className="logo">
          <img src="/assets/logo-ant.svg" alt="" />
          <h1>共享单车管理</h1>
        </div>
        <Menu
          theme="dark"
          selectedKeys={this.state.selectedKeys}
          onClick={this.handleClick}
          onSelect={this.handleSelect}
        >
          {this.menuTreeNode}
        </Menu>
      </div>
    );
  }
}

export default connect()(NavLeft);
