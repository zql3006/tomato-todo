import * as React from 'react'
import { connect } from "react-redux";
import _ from "lodash";
import { format } from "date-fns";
import { Tabs,Empty } from "antd";
import './TodoHistory.scss'
import TodoHistoryTodoItem from "./TodoHistoryTodoItem";

interface ITodoHistoryProps{
  todos:any[];
}

const TabPane = Tabs.TabPane

const weekDay = ["周天", "周一", "周二", "周三", "周四", "周五", "周六"]

class TodoHistory extends React.Component<ITodoHistoryProps>{

  get finishedTodos(){
    return this.props.todos.filter(item=>item.completed&&!item.deleted)
  }

  get deletedTodos(){
    return this.props.todos.filter(item=>item.deleted)
  }

  get dailyFinishedTodos(){
    return _.groupBy(this.finishedTodos,(todo)=>{
      return format(new Date(todo.completed_at),'yyyy-MM-dd')
    })
  }

  get dailydeletedTodos(){
    return _.groupBy(this.deletedTodos,(todo)=>{
      return format(new Date(todo.updated_at),'yyyy-MM-dd')
    })
  }

  get finishedDates(){
    return Object.keys(this.dailyFinishedTodos).sort((a,b)=>Date.parse(b)-Date.parse(a))
  }

  get deletedDates(){
    return Object.keys(this.dailydeletedTodos).sort((a,b)=>Date.parse(b)-Date.parse(a))
  }

  render(){
    const finishedTodoList = this.finishedDates.map(item=>{
      
      return(
        <div key={item} className="dailyTodos">
          <div className='summary'>
            <div className='date'>
              <span>{format(new Date(item),'MM月dd日')}</span>
              <span>{weekDay[new Date(item).getDay()]}</span>
            </div>
            <div className="finishedCount">完成了{this.dailyFinishedTodos[item].length}个任务</div>
          </div>
          <div className='todoList'>
          {
            this.dailyFinishedTodos[item].map(todo=>
              <TodoHistoryTodoItem key={todo.id} {...todo} itemType='finished'/>)
          }
          </div>
        </div>
      )
    })
    const deletedTodoList = this.deletedDates.map(item=>{
      return(
          <div className='todoList'>
          {
            this.dailydeletedTodos[item].map(todo=>
              <TodoHistoryTodoItem key={todo.id} {...todo} itemType='deleted'/>
            )
          }
          </div>
      )
    })
    return(
      <Tabs defaultActiveKey="1">
        <TabPane tab="已完成的任务" key="1">
          <div className='TodoHistory'>
            {finishedTodoList.length>0?finishedTodoList:<Empty description='暂无数据'/>}
          </div>
        </TabPane>
        <TabPane tab="已删除的任务" key="2">
          <div className='TodoHistory'>
            {deletedTodoList.length>0?deletedTodoList:<Empty description='暂无数据'/>}
          </div>
        </TabPane>
      </Tabs>
    )
  }
} 
const mapStateToProps = (state:any,ownProps:any) =>({
  todos:state.todos,
  ...ownProps
})

export default connect(mapStateToProps)(TodoHistory)