import * as React from 'react'
import './Todos.scss'
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import { connect } from "react-redux";
import { Empty } from "antd";
import { format } from "date-fns";

class Todos extends React.Component<any>{
  
  get CompletedTodos(){
    return this.unDeletedTodos.filter((item:any) => item.completed&&(Date.parse(item.completed_at)>Date.parse(format(new Date(),'yyyy-MM-dd'))))
  }

  get unCompletedTodos(){
    return this.unDeletedTodos.filter((item:any) => !item.completed)
  }

  get unDeletedTodos(){
    return this.props.todos.filter((item:any) => !item.deleted)
  }

  render(){
    return(
      <div className='Todos' id='Todos'>
        <TodoInput/>
        <div className='todoLists'>
          {this.unCompletedTodos.map((item:any) => <TodoItem key={item.id} {...item}/>)}
          {this.unCompletedTodos.length<1&&this.CompletedTodos.length<1?<Empty description='暂无数据'/>:'最近已完成：'}
          {this.CompletedTodos.map((item:any) => <TodoItem key={item.id} {...item}/>)}
        </div>
      </div>
    )
  }
} 

const mapStateToProps = (state:any,ownProps:any) =>({
  todos:state.todos,
  ...ownProps
})


export default connect(mapStateToProps)(Todos)