import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    username:String,
    transid: [String],
    password:String,
    pendingPayment: {
        reciept : String, 
        amount : {type:Number,default:0}
    },
    checkindate: Date,

});
const userprofile = mongoose.model("profiles",UserSchema);
export default userprofile;