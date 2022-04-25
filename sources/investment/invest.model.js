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
    tipoInversion: {
      type: String,
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
      type: [Object],
    },
    t_anual: {
      type: Number,
      //   required: true,
    },
    periodo_tasa: {
      type: String,
    },
    periodo: {
      type: Number,
      //   required: true,
    },
    schedule: [
      {
        type: ObjectId,
        ref: "schedule",
      },
    ],

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
