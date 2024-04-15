import mongoose from "mongoose"; 

const postSchema = new mongoose.Schema({
  title:String
  // username: String,
  // email: String,
});

const Post = mongoose.model("Post", postSchema);

export async function getPosts() {
  const posts = await Post.find();
  return posts;
}

export async function createPost(post) {
  const newPost = await Post.create(post);
  return newPost;
}