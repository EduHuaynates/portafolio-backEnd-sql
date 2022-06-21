const { DataTypes } = require("sequelize");
const sequelize = require("../../database/connection");

const schedule = sequelize.define(
  "schedule",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      // type: DataTypes.UUIDV4,
      autoIncrement: true,
    },
    periodo: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    capital_retornado: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    interes_retornado: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    cuota: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    saldo: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha_pago: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  { timestamps: true },
  {
    tableName: "schedules",
  }
);

module.exports = schedule;

// const mongoose = require("mongoose");
// const ObjectId = mongoose.Schema.Types.ObjectId;

// const scheduleSchema = new mongoose.Schema(
//   {
//     // userId: {
//     //   type: ObjectId,
//     //   required: true,
//     // },
//     // investmentId: {
//     //   type: ObjectId,
//     //   //required: true,
//     //   ref: "investment",
//     // },
//     periodo: {
//       type: Number,
//       require: true,
//     },
//     capitalRetornado: {
//       type: Number,
//       require: true,
//     },
//     interesRetornado: {
//       type: Number,
//       require: true,
//     },
//     cuota: {
//       type: Number,
//       require: true,
//     },
//     saldo: {
//       type: Number,
//       require: true,
//     },
//     status: {
//       type: String,
//       require: true,
//     },
//     fechaPago: {
//       type: String,
//       require: true,
//     },
//     comentarios: {
//       type: [Object],
//     },
//     voucher: {
//       type: [Object],
//       require: true,
//     },
//   },
//   {
//     timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
//   }
// );

// module.exports = mongoose.model("schedule", scheduleSchema);
