import React from 'react'
import {Card,
     Spin, Alert} from 'antd'
import {LoadingOutlined} from '@ant-design/icons'
import './ui.less'

export default class Loading extends React.Component{
    render(){
        const icon=<LoadingOutlined style={{fontSize:24}}/>
        return(
            <div>
                <Card title="Spin的用法" className="card-wrap">
                    <Spin size="small"/>
                    <Spin style={{margin:'0 10px'}}/>
                    <Spin size="large"/>
                    <Spin indicator={icon} style={{marginLeft:10}}/>
                </Card>
                <Card title="内容遮罩" className='card-wrap'>
                    <Alert message="React" description="欢迎来到ValueXu的React+AntD系统" type="info"/>
                    <Spin>
                        <Alert message="React" description="欢迎来到ValueXu的React+AntD系统" type="warning"/>
                    </Spin>
                    <Spin tip="加载中...">
                        <Alert message="React" description="欢迎来到ValueXu的React+AntD系统" type="warning"/>
                    </Spin>
                    <Spin indicator={icon}>
                        <Alert message="React" description="欢迎来到ValueXu的React+AntD系统" type="warning"/>
                    </Spin>
                </Card>
            </div>
        )
    }
}