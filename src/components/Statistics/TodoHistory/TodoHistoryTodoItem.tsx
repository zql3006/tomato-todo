import * as React from 'react'
import { connect } from "react-redux";
import { format } from "date-fns";
import { updateTodo } from "../../../redux/actions/todos";
import './TodoHistoryTodoItem.scss'
import { Icon } from "antd";
import axios from "../../../config/axios";

interface ITodoHistoryTodoItemProps{
  todos:any[];
  updated_at:string;
  completed_at:string;
  description:string;
  itemType:string;
  id:number;
  updateTodo:(payload:any)=>any;
}

class TodoHistoryTodoItem extends React.Component<ITodoHistoryTodoItemProps>{

  updateTodo = async(params:any) =>{
    try {
      const response = await axios.put(`todos/${this.props.id}`,params)
      this.props.updateTodo(response.data.resource)
    } catch (error) {
      throw new Error(error)
    }
  }

  render(){
    let action,newFormat='',time=''
    if(this.props.itemType === 'finished'){
      newFormat = 'HH:mm'
      time = this.props.completed_at
      action = (
        <div className="action">
          <Icon type='rollback' onClick={()=>this.updateTodo({completed:false})}/>
          <Icon type='delete' theme='filled' onClick={()=>this.updateTodo({deleted:true})}/>
        </div>
      )
    }else if(this.props.itemType === 'deleted'){
      newFormat = 'yyyy-MM-dd  HH:mm'
      time = this.props.updated_at
      action = (
        <div className="action">
          <Icon type='rollback' onClick={()=>this.updateTodo({deleted:false})}/>
        </div>
      )
    }
    
    return(
      <div className='TodoHistoryTodoItem'>
        <div className="text">
          <span>{format(new Date(time),newFormat)}</span>
          <span>{this.props.description}</span>
        </div>
        {action}
      </div>
    )
  }
} 
const mapStateToProps = (state:any,ownProps:any) =>({
  todos:state.todos,
  ...ownProps
})

const mapDispatchToProps = {
  updateTodo
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoHistoryTodoItem)