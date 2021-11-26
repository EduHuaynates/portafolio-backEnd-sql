const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const entitieSchema = new mongoose.Schema(
  {
    Logo: {
      type: String,
    },
    Empresa: {
      type: String,
      //   required: true,
    },
    TipoInversion: {
      type: String,
      //   required: true,
    },
    Barrera: {
      type: Number,
      //   required: true,
    },
    Contacto: {
      type: [[String]],
      //   required: true,
    },
    Notaria: {
      type: String,
      //   required: true,
    },
    FirmaDigital: {
      type: Boolean,
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

module.exports = mongoose.model("entitie", entitieSchema);
