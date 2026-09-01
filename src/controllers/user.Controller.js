import cloudinary from "../config/cloudinary.js";
import userModel from "../models/User.model.js";
import fs from 'fs/promises'

export async function getUser(req, res) {
  try {
    const user = req.user;
    if (!user) {
      return res.status(400).json({ message: "User not find" });
    }
    return res
      .status(200)
      .json({ message: "User profile fetched successfully", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateUser(req, res) {
  try {
    const userId = req.user._id;
    const { name, bio, nativeLanguage, learningLevel } = req.body;

    const user = await userModel.findById(userId);
    if(!user){
        return res.status(400).json({message:"user not find"})
    }
    if(name !== undefined ){user.name = name;};
    if(bio !== undefined ){user.bio = bio;};
    if(nativeLanguage !== undefined ){user.nativeLanguage = nativeLanguage;};
    if(learningLevel !== undefined ){user.learningLevel = learningLevel;};
    await user.save();
    return res.status(200).json({ message: "User profile updated successfully" ,user});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateAvatar(req, res) {
  try {
    const file = req.file    
     if (!file) {
      return res.status(400).json({ message: "Avatar file is required" });
    }
    const userId = req.user._id;
    const user = await userModel.findById(userId)
    if(!user){
        return res.status(400).json({message:"user not find"})
    }
    console.log("user",user)
    const resulte = await cloudinary.uploader.upload(file.path)
    fs.unlink(file.path)
    user.avatar = resulte.secure_url    
    await user.save();
    return res.status(200).json({ message: "Avatar updated successfully" , avatar: user.avatar});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateBanner(req, res) {
  try {
    const file = req.file;
    const userId = req.user._id
    if(!file){
        return res.status(400).json({message:"file not find"})
    }
    const user = await userModel.findById(userId);
    if(!user){
        return res.status(400).json({message:"user not find"})
    }
    const resulte = await cloudinary.uploader.upload(file.path)
    fs.unlink(file.path)
    user.banner = resulte.secure_url
    await user.save();
    return res.status(200).json({ message: "Banner updated successfully" , banner:user.banner});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteAvatar(req, res) {
  try {
    const userId = req.user._id
    const user = await userModel.findById(userId);
    if(!user){
        return res.status(400).json({message:"user not find"})
    }
    user.avatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB61i82Qk05oY30g4CdU8vbMxdB193xm44voNvYnSxNw&s"
    await user.save();
    return res.status(200).json({ message: "Avatar deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteBanner(req, res) {
  try {
       const userId = req.user._id
    const user = await userModel.findById(userId);
    if(!user){
        return res.status(400).json({message:"user not find"})
    }
    user.banner = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3_KouyVrkle-kaYdW1vNwQkobqMCOPtdfpq__gFaQdW7EWMpPGHV5zFs&s=10"
    await user.save();
    return res.status(200).json({ message: "Banner deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function deactivateAccount(req, res) {
  try { 
    const userId = req.user._id
    const user = await userModel.findById(userId)
    if(!user){
        return res.status(400).json({message:"User not find"})
    }
    user.isActive = false,
    await user.save();
    return res.status(200).json({ message: "Account deactivated successfully" , isActive:user.isActive });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteAccount(req, res) {
  try {
    const userId = req.user._id;
    const user = await userModel.findById(userId);
    if(!user){
        return res.status(400).json({message:"user not find"})
    }
  
    await userModel.deleteOne(user._id)
    return res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
