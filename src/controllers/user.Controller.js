import userModel from "../models/User.model.js";

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
    return res.status(200).json({ message: "Avatar updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateBanner(req, res) {
  try {
    return res.status(200).json({ message: "Banner updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteAvatar(req, res) {
  try {
    return res.status(200).json({ message: "Avatar deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteBanner(req, res) {
  try {
    return res.status(200).json({ message: "Banner deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function deactivateAccount(req, res) {
  try {
    return res
      .status(200)
      .json({ message: "Account deactivated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteAccount(req, res) {
  try {
    return res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
