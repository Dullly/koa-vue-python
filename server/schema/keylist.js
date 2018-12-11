/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('keylist', {
    id: {
      type: DataTypes.INTEGER(8).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    KeyName: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true
    },
    TypeClass: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    UseTimes: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true,
      defaultValue: '0'
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'keylist'
  });
};
