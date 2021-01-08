import React from 'react'
import {notification, Card, Button} from 'antd'
import './ui.less'

export default class Notification extends React.Component{
    openNotification=(type,direction)=>{
        if(direction){
            notification.config({
                placement:direction
            })
        }
        notification[type]({
            mesage:"发工资了",
            description:"上个月考勤22天，迟到12天，实发工资250，请笑纳"
        });
    }
    render(){
        return(
            <div>
                <Card title="通知提醒框" className='card-wrap'>
                    <Button type="primary" onClick={()=>this.openNotification('success')}>Success</Button>
                    <Button type="primary" onClick={()=>this.openNotification('info')}>Info</Button>
                    <Button type="primary" onClick={()=>this.openNotification('error')}>Error</Button>
                    <Button type="primary" onClick={()=>this.openNotification('warning')}>Warning</Button>
                </Card>
                <Card title="通知提醒框(全局配置)" className='card-wrap'>
                    <Button type="primary" onClick={()=>this.openNotification('success','topLeft')}>左上</Button>
                    <Button type="primary" onClick={()=>this.openNotification('info','topRight')}>右上</Button>
                    <Button type="primary" onClick={()=>this.openNotification('error','bottomLeft')}>左下</Button>
                    <Button type="primary" onClick={()=>this.openNotification('warning','bottomRight')}>右下</Button>
                </Card>
            </div>
        )
    }
} 