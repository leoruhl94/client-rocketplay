interface profile {
    accessToken: string;
    name: string,
    pic: string
  }
  // --------------------------------
  type storeState = {
    profile: profile,
    accountType: boolean
  }
  
  type storeAction = {
    type: string
    payload: any
  }
  
  type DispatchType = (args: storeState) => storeAction