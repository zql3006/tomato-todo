import * as React from 'react'
import {Input,Icon,Button,message} from 'antd'
import axios from '../../config/axios'
import {Link } from "react-router-dom";
import './Login.scss'
interface ILoginState{
  account:string,
  password:string,
}

export default class Login extends React.Component<any,ILoginState>{
  constructor(props:any){
    super(props)
    this.state = {
      account:'',
      password:'',
    }
  }

  onChange = (key: keyof ILoginState,value:string) =>{
    const newState:any = {}
    newState[key] = value
    this.setState(newState)
  }

  submit = async() =>{
    const {account,password} = this.state
    if(account===''){
      message.destroy()
      message.warning('账号不能为空')
      return
    }
    if(password===''){
      message.destroy()
      message.warning('密码不能为空')
      return
    }
    try{
      await axios.post('sign_in/user',{
        account,
        password
      })
      this.props.history.push('/')
    }catch(e){
      message.destroy()
      message.warning(e.response.data.errors)
      //throw new Error(e)
    }
  }

  render(){
    const {account,password} = this.state
    return(
      <div className='Login' id='Login'>
        <h1>登录</h1>
        <Input
          placeholder='请输入你的用户名'
          prefix={<Icon type='user' style={{color:'rgba(0,0,0,.25)'}}></Icon>}
          value={account}
          onChange={(e)=>this.onChange("account",e.target.value)}
        />
        <Input.Password value={password} placeholder='请输入密码' onChange={(e)=>this.onChange("password",e.target.value)}></Input.Password>
        <Button type='primary' className='loginButton' onClick={this.submit}>登录</Button>
        <p>如果你没有账号，请立即<Link to="/signUp">注册</Link></p>
      </div>
    )
  }
}