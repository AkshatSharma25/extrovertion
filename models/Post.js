import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the schema for the Post
const postSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User' // References to users who liked the post
  }],
  comments: [{
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User' // Reference to the User model
    },
    content: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
});

// Create a model using the schema
const Post=mongoose.models.Post || mongoose.model("Post",postSchema);
export default Post;