const Schedule = require("./schedule.model");
const Investment = require("../investment/invest.model");
const mongoose = require("mongoose");

function getSchedule(investmentId) {
  return Schedule.find({ investmentId: investmentId }).sort({ periodo: 1 });
}

function getUserSchedules(userId) {
  return Schedule.find({ userId: userId }).sort({ fechaPago: 1 });
}

module.exports = { getSchedule, getUserSchedules };
