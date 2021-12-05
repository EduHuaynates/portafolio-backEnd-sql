const postController = require("./post.controller");
const express = require("express");
const postRouter = express.Router();
const handleError = require("../../libs/errorHandler").handleError;
const passport = require("passport");
const jwtAuthenticate = passport.authenticate("jwt", { session: false });

postRouter.post(
  "/",
  handleError((req, res) => {
    return postController.createPost(req.body).then((newPost) => {
      res.status(201).json(newPost);
    });
  })
);

postRouter.get(
  "/:id",
  //   [jwtAuthenticate],
  handleError((req, res) => {
    console.log(req.params, "params");
    return postController.getPosts(req.params.id).then((posts) => {
      res.status(201).json(posts);
    });
  })
);

module.exports = postRouter;
