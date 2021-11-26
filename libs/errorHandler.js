const mongoose = require("mongoose");
const log = require("../utils/logger");

exports.handleError = (fn) => {
  return function (req, res, next) {
    fn(req, res, next).catch(next);
  };
};

exports.handleDBError = (err, req, res, next) => {
  log.warn(err);
  if (err instanceof mongoose.Error || err.name === "Mongo Error") {
    console.log(err, "error bd");
    console.log(err, "errorhandleBD");
    log.error("Ocurrio un error relacionado a Mongoose", err);
    err.message = "Error relacionado a la bd ocurrio";
    err.status = 500;
  }
  next(err);
};

exports.erroresEnProducción = (err, req, res, next) => {
  log.warn(err);
  res.status(err.status || 500);
  res.send({
    message: err.message,
  });
};

exports.erroresEnDesarrollo = (err, req, res, next) => {
  console.log(err, "error Dev");
  res.status(err.status || 500);
  res.send({
    message: err.message,
    stack: err.stack || "",
  });
};
