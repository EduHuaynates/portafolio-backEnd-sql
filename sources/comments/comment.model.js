const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const commentSchema = new mongoose.Schema(
  {
    Post: {
      type: ObjectId,
    },
    Message: {
      type: String,
    },
    ReplyTo: {
      type: ObjectId,
    },
    User: {
      type: ObjectId,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updateAt" },
  }
);

module.exports = mongoose.model("comment", commentSchema);
