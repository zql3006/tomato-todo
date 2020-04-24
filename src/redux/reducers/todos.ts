import { ADD_TODO,INIT_TODO,UPDATE_TODO,EDIT_TODO } from "../actionTypes";

export default function(state=[],action:any){
  switch(action.type){
    case ADD_TODO:
      return [action.payload,...state];
    case INIT_TODO:
      return [...action.payload];
    case UPDATE_TODO:
      return state.map((item:any)=>{
        if(action.payload.id===item.id){
          return action.payload
        }else{
          return item
        }
      });
    case EDIT_TODO:
      return state.map((item:any)=>{
        if(item.id===action.payload){
          return Object.assign({},item,{editing : true}) 
        }else{
          return Object.assign({},item,{editing : false}) 
        }
      });
    default:
      return state;
  }
}