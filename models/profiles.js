import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    username:String,
    transid: [String],
    pendingPayment: {type:Number,default:0}

});
const userprofile = mongoose.model("profiles",UserSchema);
export default userprofile;