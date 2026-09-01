import userModel from "../models/User.model.js";
import bcrypt from 'bcrypt'
import { getHtmlEmailVerify, getOtp } from "../utils/otp.utils.js";
import crypto  from 'crypto'
import otpModel from "../models/Otp.model.js";
import sendEmail from "../utils/email.utils.js";
import jwt from 'jsonwebtoken'
import env from '../config/env.js'
import sessionModel from "../models/Session.model.js";


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
        return res.status(400).json({message:"All filed are required"})
    }
    
    const user = await userModel.findOne({email});

    if(!user){
        return res.status(401).json({message:"Invalid email or password"})
    }
    if(!user.verified){
        return res.status(401).json({message:"user not verified"})
    }
    const isPassword = await bcrypt.compare(password , user.password)
    if(!isPassword){
        return res.status(401).json({message:"Invalid email or password "})
    }
    const accessToken = jwt.sign(
        {id:user._id},
        env.SECRET_KEY,
        {expiresIn:'15m'}
    )
    const refreshToken = jwt.sign(
        {id:user._id},
        env.SECRET_KEY,
        {expiresIn:'7d'}
    )
    const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex')
    await sessionModel.create({
        user:user._id,
        refreshTokenHash,
        ip:req.ip,
        userAgent:req.header('user-agent'),
    })
    res.cookie('refreshToken' , refreshToken,{
        httpOnly:true,
        sameSite:true,
        secure:true,
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
    return res.status(200).json({message: "User logged in successfully",user:{name:user.name,email:user.email} ,accessToken});
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "Internal server error"});
  }
}


export async function refreshToken(req, res) {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token not found" });
    }
    const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex')
    const session = await sessionModel.findOne({refreshTokenHash})
    if(!session){
        return res.status(400).json({message:"session not find"})
    }
    const decode =  jwt.verify(refreshToken, env.SECRET_KEY)
    const user = await userModel.findById(decode.id)
    
    const accessToken = jwt.sign(
        {id:user._id},
        env.SECRET_KEY,
        {expiresIn:'15m'}
    )
     const newrefreshToken = jwt.sign(
        {id:user._id},
        env.SECRET_KEY,
        {expiresIn:'15m'}
    )
    const newrefreshTokenHash = crypto.createHash('sha256').update(newrefreshToken).digest('hex')
    session.refreshTokenHash = newrefreshTokenHash
    await session.save();
    res.cookie('refreshToken' , newrefreshToken,{
        httpOnly:true,
        sameSite:true,
        secure:true,
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
    return res.status(200).json({message: "Token refreshed successfully" , accessToken});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}


export async function logout(req, res) {
  try {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){
        return res.status(400).json({message:"refresh token not find"})
    }
    const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex')
    const session = await sessionModel.findOne({refreshTokenHash});
    if(!session){
        return res.status(400).json({message:"session not find"})
    }
    console.log("session",session)
    session.revoked = true
    await session.save();        
    res.clearCookie('refreshToken')        
    return res.status(200).json({message: "User logged out successfully"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "Internal server error"});
  }
}


export async function logoutAll(req, res) {
  try {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){
        return res.status(400).json({message:"refresh token not find"})
    }
    const decode = jwt.verify(refreshToken, env.SECRET_KEY)
    const user = await userModel.findById(decode.id)    
    await sessionModel.deleteMany(user.user)
    res.clearCookie('refreshToken')
    return res.status(200).json({message: "User logged out from all devices successfully"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "Internal server error"});
  }
}


export async function changePassword(req, res) {
  try {
    const user = req.user; 
    if(!user){
        return res.status(400).json({message:"user not find"})
    }
    const { currentPassword, newPassword, confirmPassword } = req.body;
    if(!currentPassword || !newPassword || !confirmPassword){
        return res.status(400).json({message:"All filed are required"})
    }
    const machPassword = await bcrypt.compare(currentPassword, user.password)
    if(!machPassword){
        return res.status(401).json({message:"Current Password is wrong"})
    }
    if(newPassword  !== confirmPassword){
        return res.status(400).json({message:"New and Comfirm password not match"})
    }
    const hashedPassword = await bcrypt.hash(newPassword , 10)
    user.password = hashedPassword;
    await user.save();    
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