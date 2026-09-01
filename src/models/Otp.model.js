import mongoose from 'mongoose';


const otpSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    otpHash:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        enum:['verify-email','forget-password'],
        default:'verify-email'
    },
    verified:{
        type:Boolean,
        default:false
    },
    expiredAt:{
        type:Date,
        default: ()=> new Date(Date.now() + 10 * 60 * 1000)
    }
},{timestamps:true})

const otpModel = mongoose.model('otps' , otpSchema)
export default otpModel;