interface profile {
    accessToken: string;
    name: string,
    pic: string
  }
  // --------------------------------
  type storeState = {
    profile: profile
  }
  
  type storeAction = {
    type: string
    payload: profile
  }
  
  type DispatchType = (args: storeState) => storeAction