import * as React from 'react'
import { connect } from "react-redux";
import './Polygon.scss'

interface IPolygonProps{
  data:any;
  finished:any;
}


class Polygon extends React.Component<IPolygonProps>{


  get points(){
    const date = Object.keys(this.props.data).sort((a,b)=>Date.parse(a)-Date.parse(b))
    const firstDay = date[0]
    if(firstDay){
      const range = new Date().getTime()-Date.parse(firstDay)
      let finishedCount = 0
      let finishedY
      const pointsArr = date.map(item=>{
        const x = (Date.parse(item)-Date.parse(firstDay))/range*500
        finishedCount += this.props.data[item].length
        const y = (1-finishedCount/this.props.finished.length)*100
        finishedY = y
        return `${x},${y}`
      })
      return ['0,100',...pointsArr,`500,${finishedY}`,'500,100'].join(' ')
    }else{
      return '0,100 500,100'
    }
  }

  render(){
    return(
      <div className='Polygon' id='Polygon'>
        <svg>
          <polygon 
            fill='rgba(215,78,78,.1)' 
            stroke='rgba(215,78,78,.5)'
            strokeWidth='1'
            points={this.points}
          />
        </svg>
      </div>
    )
  }
} 
const mapStateToProps = (state:any,ownProps:any) =>({
  ...ownProps
})

export default connect(mapStateToProps)(Polygon)