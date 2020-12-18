import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({ //schema for user profile
    username:String,
    transid: [{
        receipt:String,
        duepayment:Number,
        total:Number,
        paid:Number,
        checkindate:String,
        checkoutdate:String,

    }],
    password:String,
    checkindate: Date,

});
const userprofile = mongoose.model("profiles",UserSchema);
export default userprofile;