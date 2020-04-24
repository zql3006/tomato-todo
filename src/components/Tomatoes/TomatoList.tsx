import * as React from 'react'
import { format } from "date-fns";
import './TomatoList.scss';

interface ITomatoListProps{
  finishedTomato:any,
}

function TomatoItem(props:any){
  return(
    <div className="TomatoItem">
      <span className='timeRange'>{format(new Date(props.started_at),'HH:mm')} - {format(new Date(props.ended_at),'HH:mm')}</span>
      <span className='description'>{props.description}</span>
    </div>
  )
}

export default class TomatoList extends React.Component<ITomatoListProps>{
  constructor(props:ITomatoListProps){
    super(props)
    this.state={

    }
  }

  get dateSort(){
    const dates = Object.keys(this.props.finishedTomato)
    return dates.sort((a,b)=>Date.parse(b)-Date.parse(a)).splice(0,3)
  }

  render(){
    const list = this.dateSort.map(item=>{
                   const tomato = this.props.finishedTomato[item]
                   return(
                     <div key={item} className='dailyTomato'>
                       <div className="title">
                          <span className='dateTime'>{format(new Date(item),'M月d日')}</span>
                          <span className='finishedCount'>完成了{tomato.length}个番茄</span>
                       </div>
                       {
                         tomato.map((t:any)=><TomatoItem key={t.id} {...t}/>)
                       }
                     </div>
                   )
                 })
    return(
      <div className='TomatoList' id='TomatoList'>
        {list}
      </div>
    )
  }
} 