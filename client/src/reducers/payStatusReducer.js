const payStatusReducer = (state=null, action)=>{
    //console.log(action);
    switch (action.type) {
    case "FETCH_SUCCESS_ORDER":
          return action.payload || false;    
      default:
        return state;
    }
  }

  export default payStatusReducer;