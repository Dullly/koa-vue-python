module.exports = function(sequelize, DataTypes) {
	return sequelize.define('bpso', {
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
			DayPv: {
			type: DataTypes.INTEGER(8).UNSIGNED,
			allowNull: true
		},
			MDayPv: {
			type: DataTypes.INTEGER(8).UNSIGNED,
			allowNull: true
		},
			Price: {
			type: DataTypes.FLOAT,
			allowNull: true
		},
			CompeteLevel: {
			type: DataTypes.INTEGER(4).UNSIGNED,
			allowNull: true,
			defaultValue: '0'
		},
			KeyWords: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
			time: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
			}
	}, {
		tableName: 'bpso',
		timestamps: false
	});
};
