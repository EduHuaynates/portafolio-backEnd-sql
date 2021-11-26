const entitieController = require("./Entitie.controller");
const express = require("express");
const entitieRouter = express.Router();
const handleError = require("../../libs/errorHandler").handleError;
const log = require("../../utils/logger");
const config = require("../../config");

entitieRouter.put(
  "/:id",
  handleError((req, res) => {
    // const { _id, ...others } = req.body;
    console.log(req.body, "put log");
    return entitieController
      .updateEntitie(req.params.id, req.body)
      .then((newEntitie) => {
        res.status(201).json(newEntitie);
      });
  })
);

entitieRouter.post(
  "/",
  handleError((req, res) => {
    console.log(req.body);
    return entitieController.createEntitie(req.body).then((post) => {
      res.status(201).json(post);
    });
  })
);

entitieRouter.get(
  "/",
  handleError((req, res) => {
    // console.log(req.query.user,'params');
    return entitieController.getEntitie().then((ents) => {
      res.status(201).json(ents);
    });
  })
);

module.exports = entitieRouter;
