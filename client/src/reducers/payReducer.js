const payReducer = (state=null, action)=>{
    //console.log(action);
    switch (action.type) {
    case "FETCH_ORDER":
      console.log("updating--payment",action.payload)
        return action.payload || null;
      default:
        return state;
    }
  }

  export default payReducer;
  //THis reducer recievers order instant created for psp server by our server