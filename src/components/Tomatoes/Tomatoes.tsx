import * as React from 'react'
import TomatoAction from "./TomatoAction";
import './Tomatoes.scss'
import { Empty } from "antd";
import { connect } from "react-redux";
import { addTomato,updateTomato } from "../../redux/actions/tomatoes";
import axios from "../../config/axios";
import TomatoList from "./TomatoList";
import _ from "lodash";
import { format } from "date-fns";

interface ITomatoesProps{
  addTomato:(payload:any)=>any;
  initTomato:(payload:any[])=>any;
  updateTomato:(payload:any)=>any;
  tomatoes:any,
}

class Tomatoes extends React.Component<ITomatoesProps>{

  startTomato = async() =>{
    try {
      const response = await axios.post('tomatoes',{duration:1500000})
      this.props.addTomato(response.data.resource)
    } catch (error) {
      throw new Error(error)
    }
  }

  get unFinishedTomato(){
    return this.props.tomatoes.filter((item:any) => !item.description&&!item.ended_at&&!item.aborted)[0]
  }

  get finishedTomato(){
    const finishedTomatoes = this.props.tomatoes.filter((item:any) => item.description&&item.ended_at&&!item.aborted)  
    return _.groupBy(finishedTomatoes,(tomato)=>{
      return format(new Date(tomato.started_at),'yyyy-MM-dd')
    })
  }

  render(){
    return(
      <div className='Tomatoes' id='Tomatoes'>
        <TomatoAction 
          startTomato={this.startTomato} 
          unfinishedTomato={this.unFinishedTomato}
          updateTomato={this.props.updateTomato}
        />
        {JSON.stringify(this.finishedTomato)==='{}'?<Empty description='暂无数据'/>:null}
        <TomatoList finishedTomato={this.finishedTomato}/>
      </div>
    )
  }
} 

const mapStateToProps = (state:any,ownProps:any) =>({
  tomatoes:state.tomatoes,
  ...ownProps
})

const mapDispatchToProps = {
  addTomato,
  updateTomato
}

export default connect(mapStateToProps,mapDispatchToProps)(Tomatoes)