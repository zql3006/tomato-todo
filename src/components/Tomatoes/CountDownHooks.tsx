import React,{ useEffect,useState,FunctionComponent } from "react";

interface ICountDownHooksProps{
  timer:number,
  onFinish:()=>void,
}

let timerId:NodeJS.Timeout

const CountDownHooks:FunctionComponent<ICountDownHooksProps> = (props) =>{
  const [countDown,setCoutDown] = useState(props.timer)

  const min = Math.floor(countDown/60000)
  const second = Math.floor(countDown/1000%60)
  const time = `${min<10?('0'+min):min}:${second<10?('0'+second):second}`

  useEffect(()=>{
    document.title = time

    timerId = setInterval(()=>{
      setCoutDown(countDown - 1000)
      if(countDown<0){
        document.title = ''
        props.onFinish()
        clearInterval(timerId)
      }
    },1000)

    return function clearup(){
      clearInterval(timerId)
    }
  })

  return(
    <div className='CountDown' id='CountDown'>
        {time}
    </div>
  )
}

export default CountDownHooks