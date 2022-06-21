const { Sequelize } = require("sequelize");
require("dotenv").config();
const config = require("../config");

const sequelize = new Sequelize(
  //"portafoliodb", //bd
  config.db.name, //bd
  //"arnold", //user
  config.db.user,
  //"Azure942603349", //passw
  config.db.password,
  {
    dialect: "mssql",
    //host: "portafolio-server.database.windows.net", //host
    host: config.db.host, //host
    //port: "1433", //port
    port: config.db.port, //port
  },
  {
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

module.exports = sequelize;
