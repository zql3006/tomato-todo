import * as React from 'react'
import { connect } from "react-redux";
import _ from "lodash";
import { format } from "date-fns";
import { Tabs,Empty } from "antd";
import './TomatoHistory.scss'
import TomatoHistoryTomatoItem from "./TomatoHistoryTomatoItem";

interface ITomatoHistoryProps{
  tomatoes:any[];
}

const TabPane = Tabs.TabPane

const weekDay = ["周天", "周一", "周二", "周三", "周四", "周五", "周六"]

class TomatoHistory extends React.Component<ITomatoHistoryProps>{

  get finishedTomatoes(){
    return this.props.tomatoes.filter(item=>item.ended_at&&!item.aborted)
  }

  get abortedTomatoes(){
    return this.props.tomatoes.filter(item=>item.aborted)
  }

  get dailyFinishedTomatoes(){
    return _.groupBy(this.finishedTomatoes,(tomato)=>{
      return format(new Date(tomato.ended_at),'yyyy-MM-dd')
    })
  }

  get dailyAbortedTomatoes(){
    return _.groupBy(this.abortedTomatoes,(tomato)=>{
      return format(new Date(tomato.updated_at),'yyyy-MM-dd')
    })
  }

  get finishedDates(){
    return Object.keys(this.dailyFinishedTomatoes).sort((a,b)=>Date.parse(b)-Date.parse(a))
  }

  get abortedDates(){
    return Object.keys(this.dailyAbortedTomatoes).sort((a,b)=>Date.parse(b)-Date.parse(a))
  }

  render(){
    const finishedTomatoList = this.finishedDates.map(item=>{
      let countNum = 0
      this.dailyFinishedTomatoes[item].forEach((item)=>{
        countNum = (Date.parse(item.ended_at)-Date.parse(item.started_at))+countNum
      })
      let num = countNum%3600000%60000
      const hours = Math.floor(countNum/3600000)
      const minute = Math.floor(num!==0?((countNum+60000)%3600000/60000):countNum%3600000/60000)
      let text =''
      if(hours&&minute){
        text = `${hours}小时${minute}分钟`
      }else if(hours){
        text = `${hours}小时`
      }else if(minute){
        text = `${minute}分钟`
      }
      return(
        <div key={item} className="dailyTomatoes">
          <div className='summary'>
            <div className='date'>
              <span>{format(new Date(item),'MM月dd日')}</span>
              <span>{weekDay[new Date(item).getDay()]}</span>
            </div>
            <div className="finishedCount">完成了{this.dailyFinishedTomatoes[item].length}个番茄</div>
            <div className='countNum'>总计{text}</div>
          </div>
          <div className='tomatoList'>
          {
            this.dailyFinishedTomatoes[item].map(tomato=>
              <TomatoHistoryTomatoItem key={tomato.id} {...tomato} itemType='finished'/>)
          }
          </div>
        </div>
      )
    })
    const abortedTomatoList = this.abortedDates.map(item=>{
      return(
          <div className='tomatoList'>
          {
            this.dailyAbortedTomatoes[item].map(tomato=>
              <TomatoHistoryTomatoItem key={tomato.id} {...tomato} itemType='aborted'/>
            )
          }
          </div>
      )
    })
    return(
      <Tabs defaultActiveKey="1">
        <TabPane tab="已完成的番茄" key="1">
          <div className='TomatoHistory'>
            {finishedTomatoList.length>0?finishedTomatoList:<Empty description='暂无数据'/>}
          </div>
        </TabPane>
        <TabPane tab="打断的番茄" key="2">
          <div className='TomatoHistory'>
            {abortedTomatoList.length>0?abortedTomatoList:<Empty description='暂无数据'/>}
          </div>
        </TabPane>
      </Tabs>
    )
  }
} 
const mapStateToProps = (state:any,ownProps:any) =>({
  tomatoes:state.tomatoes,
  ...ownProps
})

export default connect(mapStateToProps)(TomatoHistory)