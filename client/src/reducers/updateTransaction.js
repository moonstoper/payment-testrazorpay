const updateTransaction = (state=null, action)=>{
    //console.log(action);
    switch (action.type) {  
    case "UPDATE_TRANSACTION_DOCUMENT":
          return action.payload || null 
      default:
        return state;
    }
  }

  export default updateTransaction;