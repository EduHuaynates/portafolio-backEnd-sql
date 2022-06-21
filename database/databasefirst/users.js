const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "UQ__users__F3DBC572EFC0DF5B"
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK__users__3213E83FFB26BF8D",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "UQ__users__F3DBC572EFC0DF5B",
        unique: true,
        fields: [
          { name: "username" },
        ]
      },
    ]
  });
};
