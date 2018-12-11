module.exports = function (sequelize, DataTypes) {
	return sequelize.define('seo', {
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
			KeyWeightBaidu: {
			type: DataTypes.STRING(160),
			allowNull: true
		},
			KeyWeightMBaidu: {
			type: DataTypes.STRING(160),
			allowNull: true
		},
			KeyWeight360: {
			type: DataTypes.STRING(160),
			allowNull: true
		},
			KeyWeightM360: {
			type: DataTypes.STRING(160),
			allowNull: true
		},
			KeyWeightSm: {
			type: DataTypes.STRING(160),
			allowNull: true
		},
			KeyLong: {
			type: DataTypes.STRING(300),
			allowNull: true
		},
			time: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		}
	}, {
		tableName: 'seo',
		timestamps: false
	});
};
