const payReducer = (state=null, action)=>{
    //console.log(action);
    switch (action.type) {
    case "FETCH_ORDER":
        return action.payload || null;
      default:
        return state;
    }
  }

  export default payReducer;