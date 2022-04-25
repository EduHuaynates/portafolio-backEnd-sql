const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    fechaPago: {
      type: String,
      require: true,
    },

    montoPago: {
      type: Number,
      require: true,
    },
    subPago: {
      type: [Object],
    },
    voucher: {
      type: [Object],
    },
    comentarios: {
      type: [Object],
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

module.exports = mongoose.model("payment", paymentSchema);
