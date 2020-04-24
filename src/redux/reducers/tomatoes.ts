import { ADD_TOMATO,INIT_TOMATO,UPDATE_TOMATO } from "../actionTypes";

export default function(state=[],action:any){
  switch(action.type){
    case ADD_TOMATO:
      return [action.payload,...state];
    case INIT_TOMATO:
      return [...action.payload];
    case UPDATE_TOMATO:
      return state.map((item:any)=>{
        if(action.payload.id===item.id){
          return action.payload
        }else{
          return item
        }
      });
    default:
      return state;
  }
}