import { CHANGE_PROFILE, LOGOUT } from "./actions"

const initialState: storeState = {
    // Que nos van a traer
    /*
    
    categories : [{},{}] -.
    
    persons : [{},{}] -.
    
    */ 
    profile: {accessToken: '', name: '',pic: ''},
  }

  // ..... ..... ..... .....
const reducer = (
    state: storeState = initialState,
    action: storeAction
  ): storeState => {
    switch (action.type) {
      case CHANGE_PROFILE: 
        return {
          ...state, 
          profile: action.payload
      }
      case LOGOUT: 
        return {
          ...state, 
          profile: {accessToken: '', name:'', pic:''}
      }
    }
    return state
  }
  
  // ..... ..... ..... .....
  export default reducer