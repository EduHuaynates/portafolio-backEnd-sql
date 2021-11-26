const Investment = require("./invest.model");

function createInvest(invest) {
  return new Investment({
    ...invest,
  }).save();
}

function getInvest(userid) {
  return Investment.find({ user: userid });
}

function updateInvest(investId, fields) {
  return Investment.findByIdAndUpdate(investId, {
    ...fields,
  });
}
module.exports = {
  createInvest,
  getInvest,
  updateInvest,
};
