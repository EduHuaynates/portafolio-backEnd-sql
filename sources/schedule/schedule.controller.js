const Schedule = require("./schedule.model");
const Investment = require("../investment/invest.model");
const mongoose = require("mongoose");
// const pool = require("../../db");
// const format = require("pg-format");

function getSchedule(investmentId) {
  const scheduleRetrieved = Schedule.findAll({
    where: { investmentId: investmentId * 1 },
  });
  return scheduleRetrieved;
}

function getUserSchedules(userId) {
  const scheduleUserRetrieved = Schedule.findAll({
    // attributes: ["id", "periodo","capital"],
    include: {
      model: Investment,
      attributes: ["userId","empresa","inversion"],
      where: {
        userId: userId,
      },
    },
  });

  return scheduleUserRetrieved;
}

function createSchedule(investId, schedule) {
  console.log(schedule, "schedule");
  const scheduleCreated = Schedule.bulkCreate(schedule);

  return scheduleCreated;
}

module.exports = { getSchedule, getUserSchedules, createSchedule };
