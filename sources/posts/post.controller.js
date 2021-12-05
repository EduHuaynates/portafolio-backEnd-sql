const Post = require("./post.model");

function createPost(post) {
  return new Post({
    ...post,
  }).save();
}

function getPosts(Entitie) {
  return Post.find({ Entitie }).sort({ createdAt: -1 });
}
module.exports = {
  createPost,
  getPosts,
};
