import React from "react"
import { CHANGE_PROFILE, LOGOUT, REFRESH, PRICING_SELECT, GET_PLANS } from "./actions"
import { storeState, storeAction } from "./type"
const initialState: storeState = {
    // Que nos van a traer
    /*
    
    categories : [{},{}] -.
    
    persons : [{},{}] -.
    
    */ 
    profile: {name: 'Not logged in', pic: ''},
    plan: '',
    plans: []
  }

  // ..... ..... ..... .....
const reducer = (
    state: storeState = initialState,
    action: storeAction
  ): storeState => {
    switch (action.type) {
      case CHANGE_PROFILE: 
        return state
      case PRICING_SELECT: 
        return {...state, plan: action.payload}
      case GET_PLANS: 
        return {...state, plans: action.payload}
      case LOGOUT: 
        return state
      case REFRESH:
        return {
          ...state,
          profile: {name: action.payload.name, pic: action.payload.pic},
        }
    }
    return state
  }
  
  // ..... ..... ..... .....
  export default reducer