import { CHANGE_PROFILE, DEPLOY_LOG_WND, LOGOUT } from "./actions"

const initialState: storeState = {
    // Que nos van a traer
    /*
    
    categories : [{},{}] -.
    
    persons : [{},{}] -.
    
    */ 
    profile: {accessToken: '', name: '',pic: ''},
    accountType: false,
  }

  // ..... ..... ..... .....
const reducer = (
    state: storeState = initialState,
    action: storeAction
  ): storeState => {
    switch (action.type) {
      case CHANGE_PROFILE: 
        return state
      case DEPLOY_LOG_WND: 
        return {...state, accountType: action.payload}
      case LOGOUT: 
        return state
    }
    return state
  }
  
  // ..... ..... ..... .....
  export default reducer