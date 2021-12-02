import { CHANGE_PROFILE, CHANGE_LOGSPAGE, LOGOUT, REFRESH, PRICING_SELECT } from "./actions"

const initialState: storeState = {
    // Que nos van a traer
    /*
    
    categories : [{},{}] -.
    
    persons : [{},{}] -.
    
    */ 
    profile: {name: 'Not logged in', pic: ''},
    logsPage: 0,
    plan: ''
  }

  // ..... ..... ..... .....
const reducer = (
    state: storeState = initialState,
    action: storeAction
  ): storeState => {
    switch (action.type) {
      case CHANGE_PROFILE: 
        return state
      case CHANGE_LOGSPAGE: 
        return {...state, logsPage: action.payload}
      case PRICING_SELECT: 
        return {...state, plan: action.payload}
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