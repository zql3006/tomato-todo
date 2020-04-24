import * as React from 'react'
import { Button,Modal, Input,Icon } from "antd";
import axios from "../../config/axios";
import CountDown from "./CountDown";
import "./TomatoAction.scss";

interface ITomatoActionProps{
  startTomato:()=>void,
  updateTomato:(payload:any)=>any,
  unfinishedTomato:any,
}

interface ITomatoActionState{
  description:string,
}

const confirm = Modal.confirm

export default class TomatoAction extends React.Component<ITomatoActionProps,ITomatoActionState>{

  constructor(props:ITomatoActionProps){
    super(props)
    this.state = {
      description:''
    }
  }

  updateTomato = async(params:any) =>{
    try {
      const response = await axios.put(`tomatoes/${this.props.unfinishedTomato.id}`,params)
      this.props.updateTomato(response.data.resource)
    } catch (error) {
      throw new Error(error)
    }
  }

  onKeyUp = (e:any) =>{
    if(e.keyCode===13&&this.state.description!==''){
      this.updateTomato({
        description:this.state.description,
        ended_at:new Date()
      })
      this.setState({description:''})
    }
  }

  onFinish = () =>{
    this.forceUpdate()
  }

  abortTomato = () =>{
    this.updateTomato({aborted:true})
  }

  showConfirm = () =>{
    confirm({
      title:'您目前正在一个番茄工作时间中，要放弃这个番茄吗？',
      onCancel(){},
      onOk:()=>{this.abortTomato()},
      okText:'确认',
      cancelText:'取消'
    })
  }

  render(){
    const {startTomato,unfinishedTomato} = this.props
    let html = <div/>
    if(unfinishedTomato===undefined){
      html = <Button className='startTomatoButton' onClick={()=>{startTomato()}}>开始番茄</Button>
    }else{
      const startAt = Date.parse(unfinishedTomato.started_at)
      const duration = unfinishedTomato.duration
      const timeNow = new Date().getTime()
      if(timeNow-startAt>duration){
        html = (<div className='inputWrapper'>
                  <Input
                    value={this.state.description}
                    onChange={e=>this.setState({description:e.target.value})}
                    onKeyUp={e=>this.onKeyUp(e)}
                    placeholder='请输入你刚刚完成的任务'
                  />
                  <Icon type='close-circle' className='abort' onClick={this.showConfirm}/>
                </div>)
      }else if(timeNow-startAt<duration){
        const timer = duration-timeNow+startAt
        html = <div className="countDownWrapper">
                  <CountDown timer={timer} onFinish={this.onFinish} duration={duration}/>
                  <Icon type='close-circle' className='abort' onClick={this.showConfirm}/>
               </div>
      }
    }
    
    return(
      <div className='TomatoAction' id='TomatoAction'>
        {html}
      </div>
    )
  }
} 