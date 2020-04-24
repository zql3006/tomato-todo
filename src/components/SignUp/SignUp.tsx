import * as React from 'react'
import {Input,Icon,Button,message} from 'antd'
import axios from '../../config/axios'
import {Link } from "react-router-dom";
import './SignUp.scss'
interface ISignUpState{
  account:string,
  password:string,
  passwordConfirmation:string
}
const errortext:any = {
  "has already been taken":'已有此登录名',
  "doesn't match Password":'确认密码不正确'
}

export default class SignUp extends React.Component<any,ISignUpState>{
  constructor(props:any){
    super(props)
    this.state = {
      account:'',
      password:'',
      passwordConfirmation:''
    }
  }

  onChange = (key: keyof ISignUpState,value:string) =>{
    const newState:any = {}
    newState[key] = value
    this.setState(newState)
  }

  submit = async() =>{
    const {account,password,passwordConfirmation} = this.state
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
    if(passwordConfirmation===''){
      message.destroy()
      message.warning('确认密码不能为空')
      return
    }
    try{
      await axios.post('sign_up/user',{
        account,
        password,
        password_confirmation:passwordConfirmation
      })
      this.props.history.push('/')
    }catch(e){
      let text
      Object.keys(e.response.data.errors).forEach((key)=>{
        text = errortext[e.response.data.errors[key][0]]
      })
      message.destroy()
      message.warning(text)
    }
  }

  render(){
    const {account,password,passwordConfirmation} = this.state
    return(
      <div className='SignUp' id='SignUp'>
        <h1>注册</h1>
        <Input
          placeholder='请输入你的用户名'
          prefix={<Icon type='user' style={{color:'rgba(0,0,0,.25)'}}></Icon>}
          value={account}
          onChange={(e)=>this.onChange('account',e.target.value)}
        />
        <Input.Password value={password} placeholder='请输入密码' onChange={(e)=>this.onChange('password',e.target.value)}></Input.Password>
        <Input.Password value={passwordConfirmation} placeholder='请确认密码' onChange={(e)=>this.onChange('passwordConfirmation',e.target.value)}></Input.Password>
        <Button type='primary' className='signUpButton' onClick={this.submit}>注册</Button>
        <p>如果你有账号，请立即<Link to="/login">登录</Link></p>
      </div>
    )
  }
}