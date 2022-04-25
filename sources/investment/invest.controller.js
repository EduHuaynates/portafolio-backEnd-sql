const Investment = require("./invest.model");
const Schedule = require("../schedule/schedule.model");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// function createInvest(invest) {
//   return new Investment({
//     ...invest,
//   }).save();
// }

function createInvest(schedule, investment) {
  const schedule_to_insert = Schedule.insertMany(schedule);
  const invest = Promise.resolve(schedule_to_insert)
    .then((sch) => {
      return sch.map((sch_id) => sch_id._id);
    })
    .then((sch_id) => {
      return new Investment({
        ...investment,
        schedule: sch_id,
      }).save();
      // Investment.findByIdAndUpdate(investmentId, { schedule: sch_id });
    });
  return invest;
}

// function getInvest(userid) {
//   return Investment.find({ user: userid }).sort({ fecha: -1 });
// }

function getInvest(userid) {
  // console.log(userid, "userid");
  return Investment.find({ user: userid })
    .populate("schedule")
    .sort({ fecha: -1 });
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

function deleteInvest(investId) {
  const schedule_to_delete = Investment.find({ _id: investId });
  const objDeleted = Promise.resolve(schedule_to_delete)
    .then((inv) => {
      return Schedule.deleteMany({ _id: { $in: inv[0].schedule } });
    })
    .then((dlt) => {
      return Investment.findByIdAndDelete({ _id: investId });
    });

  return objDeleted;
}

module.exports = {
  createInvest,
  getInvest,
  updateInvest,
  getCapitalPerUser,
  deleteInvest,
  // getSchedule,
};
