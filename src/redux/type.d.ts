interface profile {
    name: string,
    pic: string
  }
  // --------------------------------
  type storeState = {
    profile: profile,
    logsPage: number, 
    plan: string,
    plans: any[],
  }
  
  type storeAction = {
    type: string
    payload: any
  }
  
  type DispatchType = (args: storeState) => storeAction