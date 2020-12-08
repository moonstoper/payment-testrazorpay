const payReducer = (state=null, action)=>{
    //console.log(action);
    switch (action.type) {
    case "FETCH_ORDER":
        return action.payload || false;
      default:
        return state;
    }
  }

  export default payReducer;