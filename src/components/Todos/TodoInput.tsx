import * as React from 'react'
import {Icon, Input} from 'antd'
import { connect } from "react-redux";
import { addTodo } from "../../redux/actions/todos";
import axios from "../../config/axios";

interface ITodoInputState{
  description:string,
}

interface ITodoInputProps{
  addTodo:(payload:any) => any;
}

class TodoInput extends React.Component<ITodoInputProps,ITodoInputState>{
  constructor(props:any){
    super(props)
    this.state={
      description:''
    }
  }
  onKeyUp = (e:any) =>{
    if(e.keyCode === 13 && this.state.description !== ''){
      this.addTodo()
    }
  }

  addTodo = async () =>{
    try {
      const response = await axios.post('todos',{
        description:this.state.description
      })
      this.props.addTodo(response.data.resource)
      this.setState({description:''})
    } catch (error) {
      throw new Error(error)
    }
  }

  render(){
    const {description} = this.state
    const suffix = description?<Icon type='enter' onClick={this.addTodo}/>:<span/>
    return(
      <div className='TodoInput' id='TodoInput'>
        <Input
          placeholder="添加新任务"
          suffix={suffix}
          value={description}
          onChange={e=>this.setState({description:e.target.value})}
          onKeyUp={this.onKeyUp}
        />
      </div>
    )
  }
} 

const mapStateToProps = (state:any,ownProps:any) =>({
  ...ownProps
})

const mapDispatchToProps = {
  addTodo
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoInput)