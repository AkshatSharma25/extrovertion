import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique:true,
    },
    email:{
      type: String,
      required: true,
      unique: true,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    requestBuffer:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    ],
    profile: {
      type: String, // Assuming profile is a URL or path to an image
    },
    tagline:{
      type:String,
      default:"Hi there! I am using Extroversion"
    },
    pendingRequests:{
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    messagesSent: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
    messagesReceived: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  { timestamps: true }
);

const User=mongoose.models.User || mongoose.model("User",userSchema);
export default User;
