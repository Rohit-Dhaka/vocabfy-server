import userModel from "../models/User.model.js";
import bcrypt from 'bcrypt'
import { getHtmlEmailVerify, getOtp } from "../utils/otp.utils.js";
import crypto  from 'crypto'
import otpModel from "../models/Otp.model.js";
import sendEmail from "../utils/email.utils.js";


export async function register(req, res) {
  try {
    const {name,email,password} = req.body;
    if(!name || !email || !password){
        return res.status(400).json({message:"All fields are required"})
    }
    const isExists = await userModel.findOne({email});
    if(isExists){
        return res.status(400).json({message:"User already exists"})
    }
    const otp = getOtp();
    const otpHash = crypto.createHash('sha256').update(otp).digest('hex')
    const hashPassword = await bcrypt.hash(password , 10)
    const user = await userModel.create({name,email,password:hashPassword})
    await otpModel.create({user:user.id,otpHash, email , type:"verify-email"})
    const html = getHtmlEmailVerify(otp,name);
    await sendEmail({email , subject:"Your Verification code", text:`Your otp is ${otp}`,html})
    return res.status(201).json({message: "User registered successfully",user:{name:user.name,email:user.email}});
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "Internal server error"});
  }
}


export async function verifyEmail(req, res) {
  try {
    const {otp ,email} = req.body;
    if(!otp || !email){
        return res.status(400).json({message:"All fields are required"})
    }
    const otpHash = crypto.createHash('sha256').update(otp).digest('hex');
    const otpRecord = await otpModel.findOne({email ,otpHash});
    if(!otpRecord){
        return res.status(400).json({message:"user not find"})
    }
    const user = await userModel.findById(otpRecord.user)
     if(!user){
        return res.status(400).json({message:"user not find"})
    }
    user.verified = true
    await user.save();
    await otpModel.deleteOne(otpRecord._id)
    return res.status(200).json({message: "Email verified successfully"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "Internal server error"});
  }
}


export async function login(req, res) {
  try {
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({message:"All "})
    }
    return res.status(200).json({message: "User logged in successfully"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "Internal server error"});
  }
}




export async function refreshToken(req, res) {
  try {
    return res.status(200).json({message: "Token refreshed successfully"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "Internal server error"});
  }
}


export async function logout(req, res) {
  try {
    return res.status(200).json({message: "User logged out successfully"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "Internal server error"});
  }
}


export async function logoutAll(req, res) {
  try {
    return res.status(200).json({message: "User logged out from all devices successfully"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "Internal server error"});
  }
}


export async function changePassword(req, res) {
  try {
    return res.status(200).json({message: "Password changed successfully"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "Internal server error"})
  }
}

export async function sendForgotPasswordOtp(req, res) {
  try {
    return res.status(200).json({message: "OTP sent successfully"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "Internal server error"});
  }
}


export async function verifyForgotPasswordOtp(req, res) {
  try {
    return res.status(200).json({message: "OTP verified successfully"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "Internal server error"});
  }
}


export async function resetPassword(req, res) {
  try {
    return res.status(200).json({message: "Password reset successfully"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "Internal server error"});
  }
}