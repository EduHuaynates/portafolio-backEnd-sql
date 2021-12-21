const investController = require("./invest.controller");
const express = require("express");
const investRouter = express.Router();
const handleError = require("../../libs/errorHandler").handleError;
const log = require("../../utils/logger");
const config = require("../../config");

investRouter.put(
  "/:id",
  handleError((req, res) => {
    // const { _id, ...others } = req.body;
    console.log(req.body, "put log");
    return investController
      .updateInvest(req.params.id, req.body)
      .then((newInvest) => {
        res.status(201).json(newInvest);
      });
  })
);

investRouter.post(
  "/",
  handleError((req, res) => {
    console.log(req.body);
    return investController.createInvest(req.body).then((post) => {
      res.status(201).json(post);
    });
  })
);

investRouter.get(
  "/",
  handleError((req, res) => {
    // console.log(req.query.user,'params');
    return investController.getInvest(req.query.user).then((is) => {
      res.status(201).json(is);
    });
  })
);

investRouter.get(
  "/totales/:id",
  handleError((req, res) => {
    console.log(req.params.id, "gettotalId");
    return investController.getCapitalPerUser(req.params.id).then((tot) => {
      res.status(201).json(tot);
    });
  })
);

module.exports = investRouter;
