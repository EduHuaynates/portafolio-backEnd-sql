const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('schedules', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    periodo: {
      type: DataTypes.DECIMAL(18,0),
      allowNull: false
    },
    capital_retornado: {
      type: DataTypes.DECIMAL(18,0),
      allowNull: false
    },
    interes_retornado: {
      type: DataTypes.DECIMAL(18,0),
      allowNull: false
    },
    cuota: {
      type: DataTypes.DECIMAL(18,0),
      allowNull: false
    },
    saldo: {
      type: DataTypes.DECIMAL(18,0),
      allowNull: false
    },
    estado: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    fecha_pago: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    investmentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'investments',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'schedules',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK__schedule__3213E83FD1D1E8E0",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
