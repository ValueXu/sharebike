import React from 'react'
import {message, Card, Button} from 'antd'
import './ui.less'

export default class Message extends React.Component{
    showMessage=(type)=>{
        message[type]("恭喜你，成功进入ValueXu的系统")
    }
    render(){
        return(
            <div>
                <Card className="card-wrap">
                    <Button type="primary" onClick={()=>this.showMessage('success')}>Success</Button>
                    <Button type="primary" onClick={()=>this.showMessage('info')}>Info</Button>
                    <Button type="primary" onClick={()=>this.showMessage('warning')}>Warning</Button>
                    <Button type="primary" onClick={()=>this.showMessage('error')}>Error</Button>
                    <Button type="primary" onClick={()=>this.showMessage('loading')}>Loading</Button>
                </Card>
            </div>
        )
    }
}