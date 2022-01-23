const commentController = require("./comment.controller");
const express = require("express");
const commentRouter = express.Router();
const handleError = require("../../libs/errorHandler").handleError;
const passport = require("passport");
const jwtAuthenticate = passport.authenticate("jwt", { session: false });

commentRouter.post(
  "/",
  [jwtAuthenticate],
  handleError(async (req, res) => {
    return await commentController
      .createComment(req.body)
      .then((newComment) => {
        res.status(201).json(newComment);
      });
  })
);

commentRouter.get(
  "/:id",
  [jwtAuthenticate],
  handleError(async (req, res) => {
    console.log(req.params, "params");
    return await commentController.getComments(req.params.id).then((posts) => {
      res.status(201).json(posts);
    });
  })
);

commentRouter.get(
  "/",
  handleError(async (req, res) => {
    console.log(req.params, "params");
    res.status(201).json({ endpoint: "fuciona" });
  })
);

module.exports = commentRouter;
