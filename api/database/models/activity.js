const { Model, DataTypes } = require('sequelize');
const sequelize = require('..');

class Activities extends Model { }

Activities.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	walletID: {
		type: DataTypes.INTEGER,
	},
	wordDate: {
		type: DataTypes.DATEONLY,
	},
	difficulty: {
		type: DataTypes.ENUM('easy', 'medium', 'hard'),
	},
	completed_at: {
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW,
	}
}, {
	sequelize,
	modelName: 'activities',
	timestamps: false,
});

module.exports = Activities;
