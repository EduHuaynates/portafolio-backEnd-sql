const entitieController = require("./Entitie.controller");
const express = require("express");
const entitieRouter = express.Router();
const handleError = require("../../libs/errorHandler").handleError;
const log = require("../../utils/logger");
const config = require("../../config");
const passport = require("passport");
const jwtAuthenticate = passport.authenticate("jwt", { session: false });

entitieRouter.put(
  "/:id",
  [jwtAuthenticate],
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

entitieRouter.get(
  "/:id",
  [jwtAuthenticate],
  handleError((req, res) => {
    console.log(req.params.id, "Error en entidad");
    return entitieController
      .getSingleEntitie(req.params.id)
      .then((singleEntitie) => {
        res.status(201).json(singleEntitie);
      });
  })
);

entitieRouter.get(
  "/mantein/:userId",
  [jwtAuthenticate],
  handleError((req, res) => {
    // console.log(req.params.id, "Error en entidad");
    return entitieController
      .getEntitieToOwner(req.params.userId)
      .then((entitieToOwner) => {
        res.status(201).json(entitieToOwner);
      });
  })
);

entitieRouter.get(
  "/similar/:id",
  [jwtAuthenticate],
  handleError((req, res) => {
    console.log(req.query, "Tipo Env");
    return entitieController
      .getSimilarEntities(req.query.TipoInversion, req.params.id)
      .then((singleEntitie) => {
        res.status(201).json(singleEntitie);
      });
  })
);

entitieRouter.get(
  "/filter",
  [jwtAuthenticate],
  handleError((req, res) => {
    console.log(req.query, "Tipo Env");
    return entitieController
      .getFilteredEntities(req.query.TipoInversion)
      .then((singleEntitie) => {
        res.status(201).json(singleEntitie);
      });
  })
);

entitieRouter.post(
  "/",
  [jwtAuthenticate],
  handleError((req, res) => {
    console.log(req.body, "body of new Entitie");
    return entitieController.createEntitie(req.body).then((post) => {
      res.status(201).json(post);
    });
  })
);

entitieRouter.get(
  "/",
  [jwtAuthenticate],
  handleError((req, res) => {
    // console.log(req.query.user,'params');
    return entitieController.getEntitie().then((ents) => {
      res.status(201).json(ents);
    });
  })
);

module.exports = entitieRouter;
