import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  text: {
    type: String,
    required: true
  }
}, { timestamps: true });

const postSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  text: {
    type: String,
    required: true
  },
  comments: [commentSchema]
}, { timestamps: true });

export const Post = mongoose.model("Post", postSchema);
