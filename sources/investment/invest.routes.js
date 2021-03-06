const investController = require("./invest.controller");
const scheduleController = require("../schedule/schedule.controller");

const express = require("express");
const investRouter = express.Router();
const handleError = require("../../libs/errorHandler").handleError;
const log = require("../../utils/logger");
const config = require("../../config");
const passport = require("passport");
const jwtAuthenticate = passport.authenticate("jwt", { session: false });

//CREA UNA NUEVA INVERSION
investRouter.post(
  "/creation",
  // [jwtAuthenticate],
  handleError((req, res) => {
    return investController.createInvest(req.body[0],req.body[1]).then((invest) => {
      res.status(201).json(invest);
    });
  })
);

//ELIMINA UNA INVERSION
investRouter.delete(
  "/:id/delete",
  // [jwtAuthenticate],
  handleError((req, res) => {
    return investController
      .deleteInvest(req.params.id)
      .then((investDeleted) => {
        res.status(201).json(investDeleted);
      });
  })
);

//ACTUALIZA UNA INVERSION
investRouter.put(
  "/:id/update",
  // [jwtAuthenticate],
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

//CREA UN CRONOGRAMA PARA UNA INVERSION
investRouter.post(
  "/:id/schedule/creation",
  // [jwtAuthenticate],
  handleError((req, res) => {
    console.log(req.body, "req.body");
    return scheduleController
      .createSchedule(req.params.id, req.body)
      .then((sch) => {
        res.status(201).json(sch);
      });
  })
);

//OBTIENE EL CRONOGRAMA DE UNA INVERSION
investRouter.get(
  "/:id/schedule",
  // [jwtAuthenticate],
  handleError((req, res) => {
    console.log(req.params.id, "entro");
    return scheduleController.getSchedule(req.params.id).then((sch) => {
      res.status(201).json(sch);
    });
  })
);

// investRouter.get(
//   "/",
//   [jwtAuthenticate],
//   handleError((req, res) => {
//     // console.log(req.query.user,'params');
//     return investController.getInvest(req.query.user).then((is) => {
//       res.status(201).json(is);
//     });
//   })
// );

// investRouter.get(
//   "/totales/:id",
//   [jwtAuthenticate],
//   handleError((req, res) => {
//     console.log(req.params.id, "gettotalId");
//     return investController.getCapitalPerUser(req.params.id).then((tot) => {
//       res.status(201).json(tot);
//     });
//   })
// );

module.exports = investRouter;
