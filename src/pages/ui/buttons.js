import React from 'react';
import {Card,Button,Radio} from 'antd'
import {PlusOutlined,SearchOutlined,DeleteOutlined,EditOutlined,DownloadOutlined,LeftOutlined,RightOutlined} from '@ant-design/icons'

import './ui.less'

export default class Buttons extends React.Component {
  state={
    loading:true,
    size:'default'
  }

  handleStartLoading=()=>{
    this.setState({
      loading:true,
    })
  }

  handleCloseLoading=()=>{
    this.setState({
      loading:false
    })
  }

  handleChange=(e)=>{
    this.setState({
      size:e.target.value,
    })
  }

  render(){
    return (
      <div>
        <Card title="基础按钮" className="card-wrap">
          <Button type="primary">Imooc</Button>
          <Button>Imooc</Button>
          <Button type="dashed">Imooc</Button>
          <Button type="danger">Imooc</Button>
          <Button disabled>Imooc</Button>
        </Card>
        <Card title="图形按钮" className="card-wrap">
          <Button icon={<PlusOutlined/>}>创建</Button>
          <Button icon={<EditOutlined />}>编辑</Button>
          <Button icon={<DeleteOutlined />}>删除</Button>
          <Button shape="circle" icon={<SearchOutlined />}></Button>
          <Button type="primary" icon={<SearchOutlined />}>搜索</Button>           
          <Button type="primary" icon={<DownloadOutlined/>}>下载</Button>          
        </Card>
        <Card title="Loading按钮" className="card-wrap">
          <Button type="primary" loading={this.state.loading}>确定</Button>
          <Button type="primary" >确定</Button>          
          <Button loading={this.state.loading} onClick={this.handleStartLoading}>点击加载</Button>
          <Button type="prmary" shape="circle" loading={this.state.loading}></Button>
          <Button type="primary" onClick={this.handleCloseLoading}>关闭</Button>               
        </Card>
        <Card title="按钮组" style={{marginBottom:10}}>
          <Button.Group>
            <Button type="primary" icon={<LeftOutlined />}>返回</Button>
            <Button type="primary" icon={<RightOutlined />}>前进</Button>
          </Button.Group>
        </Card>
        <Card title="按钮尺寸" className="card-wrap">
          <Radio.Group value={this.state.size} onChange={this.handleChange}>
            <Radio value="small">小</Radio>
            <Radio value="default">中</Radio>
            <Radio value="large">大</Radio>
          </Radio.Group>
          <Button type="primary" size={this.state.size}>Imooc</Button>
          <Button size={this.state.size}>Imooc</Button>
          <Button type="dashed" size={this.state.size}>Imooc</Button>
          <Button type="danger" size={this.state.size}>Imooc</Button>
          <Button disabled size={this.state.size}>Imooc</Button>
        </Card>
      </div>
    );
  }
}
