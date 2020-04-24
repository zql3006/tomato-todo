import { ADD_TODO,INIT_TODO,UPDATE_TODO,EDIT_TODO } from "../actionTypes";

export const addTodo = (payload:any)=>{
  return {
    type:ADD_TODO,
    payload
  }
}
export const initTodo = (payload:any[])=>{
  return {
    type:INIT_TODO,
    payload
  }
}
export const updateTodo = (payload:any)=>{
  return {
    type:UPDATE_TODO,
    payload
  }
}
export const editTodo = (payload:any[])=>{
  return {
    type:EDIT_TODO,
    payload
  }
}