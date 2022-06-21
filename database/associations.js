const User = require("../sources/users/user.model");
const Investment = require("../sources/investment/invest.model");
const Schedule = require("../sources/schedule/schedule.model");

User.hasMany(Investment);
Investment.belongsTo(User);

Investment.hasMany(Schedule, {
  foreignKey: "investmentId",
});
Schedule.belongsTo(Investment);
