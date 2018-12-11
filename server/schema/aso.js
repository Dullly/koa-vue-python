/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('aso', {
    id: {
      type: DataTypes.INTEGER(8).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    KeyName: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    KeyWords: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    KeyCompete: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    FromApp: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'aso'
  });
};
