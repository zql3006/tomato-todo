import * as React from 'react'
import './Statistics.scss'
import { connect } from "react-redux";
import Polygon from "./Polygon";
import _ from "lodash";
import { format } from "date-fns";
import TodoHistory from "./TodoHistory/TodoHistory";
import TomatoHistory from "./TomatoHistory/TomatoHistory";

interface IStatisticsProps{
  todos:any[];
  tomatoes:any[];
}
interface IStatisticsState{
  type:string;
}
class Statistics extends React.Component<IStatisticsProps,IStatisticsState>{
  constructor(props:IStatisticsProps){
    super(props)
    this.state={
      type:''
    }
  }

  get finishedTomatoes(){
    return this.props.tomatoes.filter(item=>item.ended_at&&!item.aborted)
  }

  get dailyTomatoes(){
    return _.groupBy(this.finishedTomatoes,(tomato)=>{
      return format(new Date(tomato.ended_at),'yyyy-MM-dd')
    })
  }

  get finishedTodos(){
    return this.props.todos.filter(item=>item.completed&&!item.deleted)
  }

  get dailyTodos(){
    return _.groupBy(this.finishedTodos,(todo)=>{
      return format(new Date(todo.completed_at),'yyyy-MM-dd')
    })
  }

  render(){
    let History
    if(this.state.type==='tomato'){
      History =  <TomatoHistory/>
    }else if(this.state.type==='todo'){
      History = <TodoHistory/>
    }else{
      History = <span></span>
    }
    return(
      <div className='Statistics' id='Statistics'>
        <ul>
          <li onClick={()=>this.setState({type:'tomato'})}>
            <div className="textHistory">
              <div className="title">番茄历史</div>
              <p>累计完成番茄</p>
              <div className="num">{this.finishedTomatoes.length}</div>
            </div>
              <Polygon data={this.dailyTomatoes} finished={this.finishedTomatoes}/>
          </li>
          <li onClick={()=>this.setState({type:'todo'})}>
            <div className="textHistory">
              <div className="title">任务历史</div>
              <p>累计完成任务</p>
              <div className="num">{this.finishedTodos.length}</div>
            </div>
              <Polygon data={this.dailyTodos} finished={this.finishedTodos}/>        
          </li>
        </ul>
        {History}
      </div>
    )
  }
} 
const mapStateToProps = (state:any,ownProps:any) =>({
  todos:state.todos,
  tomatoes:state.tomatoes,
  ...ownProps
})

export default connect(mapStateToProps)(Statistics)