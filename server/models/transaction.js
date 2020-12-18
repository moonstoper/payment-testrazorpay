import mongoose from "mongoose";
const TransSchema = new mongoose.Schema({ //schema for list of transactions
    transaction_id:String,
    amount:Number,
    date:{type:Date,default:new Date()},
    payee_name:String,
    name:String,
    description:String,
    reciept:String,
    order_id:String,

})
const transaction = mongoose.model("transactions",TransSchema);
export default transaction;