import { Categories } from '../routes/Menu/Items/Categories/hardcode';
export interface profile {
    name: string,
    pic: string
  }
  // --------------------------------
 export type storeState = {
    profile: profile,
    logsPage: number, 
    plan: string,
    plans: any[],
    categories : Categories[]
  }
  
 export type storeAction = {
    type: string
    payload: any
  }
  
 export type DispatchType = (args: storeState) => storeAction