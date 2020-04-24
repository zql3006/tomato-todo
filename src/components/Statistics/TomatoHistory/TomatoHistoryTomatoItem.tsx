import * as React from 'react'
import { connect } from "react-redux";
import { format } from "date-fns";
import { updateTomato } from "../../../redux/actions/tomatoes";
import './TomatoHistoryTomatoItem.scss'
import { Icon } from "antd";
import axios from "../../../config/axios";

interface ITomatoHistoryTomatoItemProps{
  tomatoes:any[];
  updated_at:string;
  started_at:string;
  ended_at:string;
  description:string;
  itemType:string;
  id:number;
  updateTomato:(payload:any)=>any;
}

class TomatoHistoryTomatoItem extends React.Component<ITomatoHistoryTomatoItemProps>{

  updateTomato = async(params:any) =>{
    try {
      const response = await axios.put(`tomatoes/${this.props.id}`,params)
      this.props.updateTomato(response.data.resource)
    } catch (error) {
      throw new Error(error)
    }
  }

  render(){
    let action,newFormat='',time1='',time2='',newFormat2 = 'HH:mm'
    if(this.props.itemType === 'finished'){
      newFormat = 'HH:mm'
      time1 = this.props.started_at
      time2 = this.props.ended_at
      action = (
        <div className="action">
          {/* <Icon type='rollback' onClick={()=>this.updateTomato({completed:false})}/> */}
          <Icon type='delete' theme='filled' onClick={()=>this.updateTomato({aborted:true})}/>
        </div>
      )
    }else if(this.props.itemType === 'aborted'){
      newFormat = 'yyyy-MM-dd  HH:mm'
      time1 = this.props.started_at
      time2 = this.props.updated_at
      action = (
        <div className="action">
          {/* <Icon type='rollback' onClick={()=>this.updateTomato({aborted:false})}/> */}
        </div>
      )
    }
    return(
      <div className='TomatoHistoryTomatoItem'>
        <div className="text">
          <span>{`${format(new Date(time1),newFormat)}-${format(new Date(time2),newFormat2)}`}</span>
          <span>{this.props.description?this.props.description:'未添加番茄描述'}</span>
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
  updateTomato
}

export default connect(mapStateToProps,mapDispatchToProps)(TomatoHistoryTomatoItem)