const Investment = require("./invest.model");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

function createInvest(invest) {
  return new Investment({
    ...invest,
  }).save();
}

function getInvest(userid) {
  return Investment.find({ user: userid }).sort({ fecha: -1 });
}

function updateInvest(investId, fields) {
  return Investment.findByIdAndUpdate(investId, {
    ...fields,
  });
}

function getCapitalPerUser(userid) {
  return Investment.aggregate([
    { $match: { user: ObjectId(userid) } },
    { $group: { _id: "$entidad", CapitalTotal: { $sum: "$capital" } } },
  ]);
}
module.exports = {
  createInvest,
  getInvest,
  updateInvest,
  getCapitalPerUser,
};
