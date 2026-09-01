import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    trim: true,
  },

  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    trim: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: [true, "password is required"],
    minlength: 8,
    select: false,
  },

  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },

plan: {
  type: String,
  enum: ["free", "premium", "lifetime"],
  default: "free",
},

bio: {
  type: String,
default: "Learning new words, one day at a time.",
  trim: true,
  maxlength: 300,
},

avatar: {
  type: String,
  default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB61i82Qk05oY30g4CdU8vbMxdB193xm44voNvYnSxNw&s",
},

banner: {
  type: String,
  default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3_KouyVrkle-kaYdW1vNwQkobqMCOPtdfpq__gFaQdW7EWMpPGHV5zFs&s=10",
},

  verified: {
    type: Boolean,
    default: false,
  },

  isActive: {
    type: Boolean,
    default: true,
  },

  nativeLanguage: {
    type: String,
    default: "en",
  },

  learningLevel: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    default: "beginner",
  },
});

const userModel = mongoose.model("users", userSchema);

export default userModel;