const express = require("express");
require("dotenv").config();
const config = require("./config");
const sequelize = require("./database/connection");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("./database/associations");

//ROUTES
const UserRouter = require("./sources/users/user.routes");
const InvestRouter = require("./sources/investment/invest.routes");
const EntitieRouter = require("./sources/entities/entitie.routes");
const PostRouter = require("./sources/posts/post.routes");
const CommentRouter = require("./sources/comments/comment.routes");
const ProjectRouter = require("./sources/projects/project.routes");

const logger = require("./utils/logger");
const morgan = require("morgan");
const passport = require("passport");
const authJWT = require("./libs/auth");
const errorHandler = require("./libs/errorHandler");

app.use(cors());
dbPort = config.db.port;
dbHost = config.db.host;
dbName = config.db.name;
dbURL = config.url.mongo_connect;
appURL = config.server.port;

passport.use(authJWT);

// async function connect_to_sql() {
//   try {
//     await connection.sequelize.authenticate();
//     console.log("Success");
//   } catch (error) {
//     console.log("Error");
//   }
// }

app.use(
  morgan("short", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

app.use(passport.initialize());
app.use(express.json());

app.use("/api/v1/user-management/users", UserRouter);
app.use("/api/v1/investment-management/investments", InvestRouter);
// app.use("/api/v1/entitie-management/entities", EntitieRouter);
// app.use("/api/post", PostRouter);
// app.use("/api/comment", CommentRouter);
// app.use("/api/project", ProjectRouter);

app.use(errorHandler.handleDBError);

app.use(errorHandler.erroresEnProducción);
// app.use(errorHandler.erroresEnDesarrollo);

app.listen(process.env.PORT || 3001, () => {
  console.log("Servidor corriendo en el puerto 3k");

  sequelize
    .sync()
    // .authenticate()
    .then(() => {
      console.log("Success");
    })
    .catch((err) => {
      console.log(err, "Error de conexion");
    });
});

// connect_to_sql();
