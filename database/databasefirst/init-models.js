var DataTypes = require("sequelize").DataTypes;
var _investments = require("./investments");
var _schedules = require("./schedules");
var _users = require("./users");

function initModels(sequelize) {
  var investments = _investments(sequelize, DataTypes);
  var schedules = _schedules(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  schedules.belongsTo(investments, { as: "investment", foreignKey: "investmentId"});
  investments.hasMany(schedules, { as: "schedules", foreignKey: "investmentId"});
  investments.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(investments, { as: "investments", foreignKey: "userId"});

  return {
    investments,
    schedules,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
