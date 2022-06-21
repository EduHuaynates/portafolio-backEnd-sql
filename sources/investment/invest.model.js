const { DataTypes } = require("sequelize");
const sequelize = require("../../database/connection");

const investment = sequelize.define(
  "investment",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      // type: DataTypes.UUIDV4,
      autoIncrement: true,
    },
    fecha_inicio: {
      type: DataTypes.DATEONLY,
      require: true,
    },
    empresa: {
      type: DataTypes.STRING,
      require: true,
    },
    inversion: {
      type: DataTypes.STRING,
      require: true,
    },
    retorno_interes: {
      type: DataTypes.STRING,
      require: true,
    },
    retorno_capital: {
      type: DataTypes.STRING,
      require: true,
    },
    tasa_porcentaje: {
      type: DataTypes.DECIMAL,
      require: true,
    },
    periodo_tasa: {
      type: DataTypes.STRING,
      require: true,
    },
    periodo_inversion: {
      type: DataTypes.INTEGER,
      require: true,
    },
    capital: {
      type: DataTypes.DECIMAL,
      require: true,
    },
    estado: {
      type: DataTypes.STRING,
      require: true,
      defaultValue:'Active'
    },
  },
  {
    timestamps: true,
  },
  {
    tableName: "investments",
  }
);

module.exports = investment;

// const mongoose = require("mongoose");
// const ObjectId = mongoose.Schema.Types.ObjectId;

// const investSchema = new mongoose.Schema(
//   {
//     fecha: {
//       type: Date,
//       required: true,
//     },
//     empresa: {
//       type: String,
//       //   required: true,
//     },
//     entidad: {
//       type: String,
//       //   required: true,
//     },
//     capital: {
//       type: Number,
//       //   required: true,
//     },
//     tipoInversion: {
//       type: String,
//     },

//     retornoInteres: {
//       type: String,
//       //   required: true,
//     },
//     retornoCapital: {
//       type: String,
//       //   required: true,
//     },
//     investor: {
//       type: [Object],
//     },
//     t_anual: {
//       type: Number,
//       //   required: true,
//     },
//     periodo_tasa: {
//       type: String,
//     },
//     periodo: {
//       type: Number,
//       //   required: true,
//     },
//     schedule: [
//       {
//         Object,
//         // type: ObjectId,
//         // ref: "schedule",
//       },
//     ],

//     user: {
//       type: ObjectId,
//       //   required: true,
//     },
//   },
//   {
//     timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
//   }
// );

// module.exports = mongoose.model("investment", investSchema);
