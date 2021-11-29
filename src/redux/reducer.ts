import { CHANGE_PROFILE } from "./actions"

const initialState: storeState = {
    // Que nos van a traer
    /*
    
    categories : [{},{}] -.
    
    persons : [{},{}] -.
    
    */ 
    profile: {name: '',pic: ''},
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
    }
    return state
  }
  
  // ..... ..... ..... .....
  export default reducer