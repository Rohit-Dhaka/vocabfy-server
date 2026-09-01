import mongoose from "mongoose";


const sessionSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    refreshTokenHash:{
        type:String,
        required:[true,'refresh token is required']
    },
    ip:{
        type:String,
        required:true
    },
    userAgent:{
        type:String,
        required:[true,"user agent is required"]
    },
    revoked:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

const sessionModel = mongoose.model('sessions' , sessionSchema)
export default sessionModel;