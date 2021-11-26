const passportJWT = require("passport-jwt");
const log = require("../utils/logger");
const config = require("../config");
const userController = require("../sources/users/user.controller");

const jwtOptions = {
  secretOrKey:  config.jwt.secreto,
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
};

module.exports = new passportJWT.Strategy(jwtOptions, (jwtPayload, next) => {
  userController
    .getSingleUser({ id: jwtPayload.id })
    .then((usuario) => {
      if (!usuario) {
        // log.info(`Usuario con ID ${jwtPayload.id} no existe`);
        next(null, false);
        return;
      }
      // console.log("usuario", usuario);
      log.info(`Usuario [${usuario.username}] suministro un token valido. 
    Autenticacion correcta`);
      next(null, usuario);
      return;
    })
    .catch((err) => {
      log.error(`Error ocurrio al tratar de validar el token`, err);
      next(err);
    });
});
