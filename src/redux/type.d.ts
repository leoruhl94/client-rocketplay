import { Categories } from '../routes/Menu/Items/Categories/hardcode';
export interface profile {
    name: string,
    pic: string
  }
  // --------------------------------
 export type storeState = {
    profile: profile,
    plan: string,
    plans: any[],
    categories : Categories[],
    notifications : []
  }
  
 export type storeAction = {
    type: string
    payload: any
  }
  
 export type DispatchType = (args: storeState) => storeAction