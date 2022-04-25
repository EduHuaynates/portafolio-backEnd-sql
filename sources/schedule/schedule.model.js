const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const scheduleSchema = new mongoose.Schema(
  {
    // userId: {
    //   type: ObjectId,
    //   required: true,
    // },
    // investmentId: {
    //   type: ObjectId,
    //   //required: true,
    //   ref: "investment",
    // },
    periodo: {
      type: Number,
      require: true,
    },
    capitalRetornado: {
      type: Number,
      require: true,
    },
    interesRetornado: {
      type: Number,
      require: true,
    },
    cuota: {
      type: Number,
      require: true,
    },
    saldo: {
      type: Number,
      require: true,
    },
    status: {
      type: String,
      require: true,
    },
    fechaPago: {
      type: String,
      require: true,
    },
    comentarios: {
      type: [Object],
    },
    voucher: {
      type: [Object],
      require: true,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

module.exports = mongoose.model("schedule", scheduleSchema);
