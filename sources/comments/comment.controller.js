const Comment = require("./comment.model");
const Post = require("../posts/post.model");

async function createComment(comment) {
  // const post = await Post.findOneAndUpdate(
  //   { _id: comment.Post },
  //   {
  //     $inc: { NumComments: 1 },
  //   },
  //   {
  //     new: true,
  //   }
  // );

  // console.log(post, "Despues de aumentar el contador");
  // if (!post) {
  //   let err = new Error(`Post con id [${comment.Post}] no existe.`);
  //   err.status = 404;
  //   throw err;
  // }
  return await new Comment({
    ...comment,
  }).save();
}

function getComments(Post) {
  return Comment.find({ Post }).sort({ createdAt: -1 });
}

module.exports = {
  createComment,
  getComments,
};
