const userInfo = (state=null, action)=>{
    //console.log(action);
    switch (action.type) {
    case "USER_INFO":
        console.log("updating")
        return action.payload || null;
      default:
        return state;
    }
  }

  export default userInfo;
  // stores all the user's information