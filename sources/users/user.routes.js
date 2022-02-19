const userController = require("./user.controller");
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

userRouter.get("/whoami", [jwtAuthenticate], (req, res) => {
  console.log("whoami?", req.user);
  res.send(hideUserFields(req.user));
  // res.send('Holaaaaa')
});

userRouter.put(
  "/profile/:userId",
  [jwtAuthenticate],
  handleError((req, res) => {
    console.log(req.body, "updateBody");
    console.log(req.params.userId, "Id");
    return userController
      .updateUser(req.params.userId, req.body)
      .then((userUpdated) => {
        res.status(201).json(userUpdated);
      });
  })
);

userRouter.post(
  "/register",
  // [jwtAuthenticate],
  handleError((req, res) => {
    let newUser = req.body;
    return userController
      .userExists(newUser.username)
      .then((usuarioExiste) => {
        // console.log(usuarioExiste)
        if (usuarioExiste) {
          log.warn(`Email [${newUser.email}] o
            username [${newUser.username}] ya existe en la BD`);
          // console.log(`Usuario ${newUser.username} ya existe`);
          throw new UsersCredencialsInUse();
        }

        return bcrypt.hash(newUser.password, 10);
      })
      .then((hash) => {
        return userController.createUser(newUser, hash).then((newUser) => {
          res.status(201).json(`Usuario creado ${newUser}`);
          return newUser;
        });
      });
  })
);

userRouter.post(
  "/login",
  // [jwtAuthenticate],
  handleError(async (req, res) => {
    let userNotAuthenticated = req.body;
    // console.log(userNotAuthenticated);
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
    _id: user.id || user._id,
    email: user.email,
    username: user.username,
    investors: user.investors,
  };
}
module.exports = userRouter;
