const payStatusReducer = (state=null, action)=>{
    //console.log(action);
    switch (action.type) {
    case "FETCH_SUCCESS_ORDER":
          return action.payload || null;    
      default:
        return state;
    }
  }

  export default payStatusReducer;