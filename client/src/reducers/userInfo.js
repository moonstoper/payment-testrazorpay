const userInfo = (state=null, action)=>{
    //console.log(action);
    switch (action.type) {
    case "USER_INFO":
        console.log("u[dating")
        return action.payload || false;
      default:
        return state;
    }
  }

  export default userInfo;