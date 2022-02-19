const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const investSchema = new mongoose.Schema(
  {
    fecha: {
      type: Date,
      required: true,
    },
    empresa: {
      type: String,
      //   required: true,
    },
    entidad: {
      type: String,
      //   required: true,
    },
    capital: {
      type: Number,
      //   required: true,
    },
    retornoInteres: {
      type: String,
      //   required: true,
    },
    retornoCapital: {
      type: String,
      //   required: true,
    },
    investor: {
      type: String,
    },
    t_anual: {
      type: Number,
      //   required: true,
    },
    periodo: {
      type: Number,
      //   required: true,
    },

    // schedule: [
    //   {
    //     CapitalRetornado: Number,
    //     InteresRetornado: Number,
    //     Cuota: Number,
    //     Saldo: Number,
    //     Status: String,
    //     FechaPago: Date
    //   },
    // ],
    schedule: [Object],

    user: {
      type: ObjectId,
      //   required: true,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

module.exports = mongoose.model("investment", investSchema);
