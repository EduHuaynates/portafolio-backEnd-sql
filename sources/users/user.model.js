const { DataTypes } = require("sequelize");
const sequelize = require("../../database/connection");
// const sequelize = new Sequelize("mssql::memory:");

const user = sequelize.define(
  "user",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      // type: DataTypes.UUIDV4,
      autoIncrement: true,
    },

    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  },
  {
    tableName: "users",
  }
);

module.exports = user;

// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     username: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//     },
//     investors: {
//       type: [String],
//       required: false,
//       default: ["Owner"],
//     },
//     profile: {
//       type: String,
//       default: "user",
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//   },
//   {
//     timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
//   }
// );

// module.exports = mongoose.model("user", userSchema);
