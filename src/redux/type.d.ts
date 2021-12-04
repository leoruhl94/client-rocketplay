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
  }
  
 export type storeAction = {
    type: string
    payload: any
  }
  
 export type DispatchType = (args: storeState) => storeAction