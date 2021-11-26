const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const investSchema = new mongoose.Schema(
  {
    empresa: {
      type: String,
      //   required: true,
    },
    capital: {
      type: Number,
      //   required: true,
    },
    t_anual: {
      type: Number,
      //   required: true,
    },
    periodo: {
      type: Number,
      //   required: true,
    },
    status: {
      type: String,
      //   required: true,
    },
    i_mensual: {
      type: Number,
      // required: true,
    },
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
