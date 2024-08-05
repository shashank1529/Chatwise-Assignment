import { Post } from "../models/post.model.js";

export async function createPost(req, res) {
  try {
    const { text } = req.body;
    const userId = req.user._id;

    const newPost = new Post({
      user: userId,
      text
    });

    await newPost.save();
    res.status(201).json({ success: true, post: newPost });
  } catch (error) {
    console.log("Error in createPost controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function commentOnPost(req, res) {
  try {
    const { postId, text } = req.body;
    const userId = req.user._id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    const newComment = {
      user: userId,
      text
    };

    post.comments.push(newComment);
    await post.save();

    res.status(201).json({ success: true, post });
  } catch (error) {
    console.log("Error in commentOnPost controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
