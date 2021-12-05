const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const postSchema = new mongoose.Schema(
  {
    Entitie: {
      type: ObjectId,
    },
    User: {
      type: ObjectId,
    },
    NumComments: {
      type: Number,
      min: 0,
      default: 0,
    },
    Message: {
      type: String,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

module.exports = mongoose.model("post", postSchema);
