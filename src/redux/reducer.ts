import React from "react"
import { CHANGE_PROFILE, LOGOUT, REFRESH_PROFILE,  PRICING_SELECT, GET_PLANS, POST_CATEGORY, TRUNCATE_CATEGORY, PUT_CATEGORY, POST_NOTIFICATIONS, READ_NOTIFICATIONS, CHANGE_PAGE } from "../constants/constants"
import { storeState, storeAction } from "./type"
const initialState: storeState = {
    // Que nos van a traer
    /*
    
    categories : [{},{}] -.
    
    persons : [{},{}] -.
    
    */ 
    profile: {name: 'Not logged in', pic: ''},
    plan: '',
    plans: [],
    categories : [],
    notifications : [{message:"Welcome to RocketPlay!", readed: false}],
    page: 3
  }

  /*                  // {
                  //     title : "IT",
                  //     videos : 38
                  // },
                  // {
                  //     title : "Data Science",
                  //     videos : 38
                  // },
                  // {
                  //     title : "Javascript",
                  //     videos : 104
                  // },
                  // {
                  //     title : "React",
                  //     videos : 21
                  // },*/ 

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
      case REFRESH_PROFILE:
        return {
          ...state,
          profile: action.payload || {name:'',pic:''},
        }
      case POST_CATEGORY:
        state.categories.push(action.payload) 
        return state
      case TRUNCATE_CATEGORY:
        let catfiltered = state.categories.filter(x => x.title !== action.payload)
        return {
          ...state,
          categories : catfiltered
        }
        case PUT_CATEGORY:

        const newArr = state.categories.map((x) => {
          // Si es el necesario, lo cambiamos
          if(x.title === action.payload.title){
            x.title = action.payload.newTitle
            return x
          }else{ 
            // Si no es, mandamos lo mismo
            return x
          }
        })

        
        return {
          ...state,
          categories : newArr
        }
        
        case POST_NOTIFICATIONS :
          return {
            ...state,
            notifications : [...state.notifications, action.payload]
          }
        case READ_NOTIFICATIONS :
          return {
            ...state,
            notifications : state.notifications.map(n => {return {...n, readed: true}})
          }
        case CHANGE_PAGE :
          return {
            ...state,
            page : action.payload
          }
    }
    return state
  }
  
  // ..... ..... ..... .....
  export default reducer