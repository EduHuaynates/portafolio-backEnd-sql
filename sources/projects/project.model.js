const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const projectSchema = new mongoose.Schema(
  {
    empresa: {
      type: String,
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
    t_anual: {
      type: Number,
      //   required: true,
    },
    periodo: {
      type: Number,
      //   required: true,
    },

    entitie: {
      type: ObjectId,
      //   required: true,
    },
    estado: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

module.exports = mongoose.model("projects", projectSchema);
