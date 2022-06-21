const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('investments', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fecha_inicio: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    empresa: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    inversion: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    retorno_interes: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    retorno_capital: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    tasa_porcentaje: {
      type: DataTypes.DECIMAL(18,0),
      allowNull: true
    },
    periodo_tasa: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    periodo_inversion: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    capital: {
      type: DataTypes.DECIMAL(18,0),
      allowNull: true
    },
    estado: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "(NActive"
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'investments',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK__investme__3213E83F435DB0D0",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
