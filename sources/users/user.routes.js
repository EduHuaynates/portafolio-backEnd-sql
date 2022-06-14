const userController = require("./user.controller");
const investController = require("../investment/invest.controller");
const scheduleController = require("../schedule/schedule.controller");
const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const handleError = require("../../libs/errorHandler").handleError;
const log = require("../../utils/logger");
const config = require("../../config");
const { UsersCredencialsInUse, IncorrectCredencials } = require("./user.error");
const jwtAuthenticate = passport.authenticate("jwt", { session: false });

userRouter.get("/retrieve", [jwtAuthenticate], (req, res) => {
  res.send(hideUserFields(req.user));
});

userRouter.put(
  "/:userId/update",
  [jwtAuthenticate],
  handleError((req, res) => {
    return userController
      .updateUser(req.params.userId, req.body)
      .then((userUpdated) => {
        res.status(201).json(userUpdated);
      });
  })
);

userRouter.post(
  "/registration",
  handleError((req, res) => {
    let newUser = req.body;
    console.log(newUser, "userBody");
    return userController
      .userExists(newUser.username)
      .then((usuarioExiste) => {
        console.log(usuarioExiste, "usuarioExiste");
        if (usuarioExiste) {
          log.warn(`Username [${newUser.username}] ya existe en la BD`);
          throw new UsersCredencialsInUse();
        }
        return bcrypt.hash(newUser.password, 10);
      })
      .then((hash) => {
        return userController.createUser(newUser, hash).then((newUser) => {
          console.log(newUser);
          res.status(201).json(`Usuario creado ${newUser}`);
          return newUser;
        });
      });
  })
);

userRouter.post(
  "/login",
  handleError(async (req, res) => {
    let userNotAuthenticated = req.body;
    let userRegistered = await userController.getSingleUser({
      username: userNotAuthenticated.username,
    });
    if (!userRegistered) {
      log.info(`Usuario ${userNotAuthenticated.username} no existe.
    No pudo ser autenticado`);
      throw new IncorrectCredencials();
    }

    let correctPassword = await bcrypt.compare(
      userNotAuthenticated.password,
      userRegistered.password
    );

    if (correctPassword) {
      let token = createToken(userRegistered.id);
      log.info(
        `Usuario con Email ${userRegistered.email}. Autenticacion correcta`
      );

      let user = hideUserFields(userRegistered);
      res.status(200).json({ token, user });
    } else {
      log.info(
        `Usuario con Email ${userRegistered.email}. Autenticacion incorrecta`
      );
      throw new IncorrectCredencials();
    }
  })
);

function createToken(userId) {
  return jwt.sign({ id: userId }, config.jwt.secreto, {
    expiresIn: config.jwt.expireTime,
  });
}

function hideUserFields(user) {
  return {
    id: user.id,
    username: user.username,
    //investors: user.investors,
  };
}

userRouter.get(
  "/:_id/investments",
  [jwtAuthenticate],
  handleError((req, res) => {
    console.log(req.query.user, "params");
    return investController.getInvest(req.params._id).then((is) => {
      res.status(201).json(is);
    });
  })
);

userRouter.get(
  "/:id/total-invested",
  [jwtAuthenticate],
  handleError((req, res) => {
    console.log(req.params.id, "gettotalId");
    return investController.getCapitalPerUser(req.params.id).then((tot) => {
      res.status(201).json(tot);
    });
  })
);

userRouter.get(
  "/:id/schedules",
  [jwtAuthenticate],
  handleError((req, res) => {
    console.log(req.params.id, "gettotalId");
    return scheduleController.getUserSchedules(req.params.id).then((sch) => {
      res.status(201).json(sch);
    });
  })
);

userRouter.get(
  "/:id/interests",
  // [jwtAuthenticate],
  handleError((req, res) => {
    console.log(req.params.id, "gettotalId");
    return investController.getUserInterest(req.params.id).then((sch) => {
      res.status(201).json(sch);
    });
  })
);

module.exports = userRouter;
