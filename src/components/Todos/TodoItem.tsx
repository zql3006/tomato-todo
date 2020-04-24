import * as React from 'react'
import {Checkbox,Input,Icon} from 'antd'
import './TodoItem.scss'
import classNames from 'classnames'
import { connect } from "react-redux";
import { editTodo,updateTodo } from "../../redux/actions/todos";
import axios from "../../config/axios";

interface ITodoItemProps{
  id:number,
  description:string,
  completed:Boolean,
  editing:Boolean,
  editTodo:(id:number)=>any,
  updateTodo:(payload:any)=>any,
}

interface ITodoItemState{
  editText:string
}

class TodoItem extends React.Component<ITodoItemProps,ITodoItemState>{
  constructor(props:any){
    super(props)
    this.state={
      editText:this.props.description
    }
  }

  updateTodo = async (params:any) =>{
    if(params.completed){
      params.completed_at = new Date()
    }
    try {
      const response = await axios.put(`todos/${this.props.id}`,params)
      this.props.updateTodo(response.data.resource)
    } catch (error) {
      throw new Error(error)
    }
  }

  editTodo = () =>{
    this.props.editTodo(this.props.id)
  }

  handleKeyUp = (e:any) =>{
    if(e.keyCode===13&&this.state.editText!==''){
      this.updateTodo({description:this.state.editText})
    }
  }

  render(){
    const {completed,description,editing} = this.props
    const Editing = (
      <div className="editing">
        <Input 
          type='text' 
          value={this.state.editText} 
          onChange={e=>this.setState({editText:e.target.value})}
          onKeyUp={this.handleKeyUp}
        />
        <div className="iconWrapper">
          <Icon type='enter' onClick={()=>this.updateTodo({description:this.state.editText})}/>
          <Icon type='delete' theme='filled' onClick={()=>this.updateTodo({deleted:true})}/>
        </div>  
      </div>
    )
    const Text = <span className='text' onDoubleClick={this.editTodo}>{description}</span>
    const todoItemClass = classNames({
      TodoItem:true,
      editing,
      completed
    }) 
    return(
      <div className={todoItemClass} id='TodoItem'>
        <Checkbox 
          checked={completed?true:false}
          onChange={e=>this.updateTodo({completed:e.target.checked})}  
        />
        {
          editing?Editing:Text
        }
      </div>
    )
  }
} 

const mapStateToProps = (state:any,ownProps:any) =>({
  ...ownProps
})

const mapDispatchToProps = {
  editTodo,
  updateTodo
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoItem)