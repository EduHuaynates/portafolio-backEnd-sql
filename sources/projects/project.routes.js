const projectController = require("./project.controller");
const express = require("express");
const projectRouter = express.Router();
const handleError = require("../../libs/errorHandler").handleError;
const log = require("../../utils/logger");
const config = require("../../config");
const passport = require("passport");
const jwtAuthenticate = passport.authenticate("jwt", { session: false });

projectRouter.post(
  "/",
  [jwtAuthenticate],
  handleError((req, res) => {
    console.log(req.body);
    return projectController.createProject(req.body).then((post) => {
      res.status(201).json(post);
    });
  })
);

projectRouter.get(
  "/:entitieId",
  [jwtAuthenticate],
  handleError((req, res) => {
    console.log(req.params, "params");
    return projectController.getProject(req.params.entitieId).then((is) => {
      res.status(201).json(is);
    });
  })
);

projectRouter.put(
  "/:projectId",
  [jwtAuthenticate],
  handleError((req, res) => {
    // const { _id, ...others } = req.body;
    console.log(req.body, "put log");
    return projectController
      .updateProject(req.params.projectId, req.body)
      .then((newProject) => {
        res.status(201).json(newProject);
      });
  })
);

module.exports = projectRouter;
