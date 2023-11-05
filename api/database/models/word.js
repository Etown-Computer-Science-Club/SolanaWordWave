const { Model, DataTypes } = require('sequelize');
const sequelize = require('..');

class Words extends Model { }

Words.init({
	date: {
		type: DataTypes.DATEONLY,
		primaryKey: true,
	},
	word: {
		type: DataTypes.STRING(255),
	},
	opt1: {
		type: DataTypes.STRING(255),
	},
	opt2: {
		type: DataTypes.STRING(255),
	},
	opt3: {
		type: DataTypes.STRING(255),
	},
	opt4: {
		type: DataTypes.STRING(255),
	},
	optans: {
		type: DataTypes.STRING(255),
	},
	pos: {
		type: DataTypes.STRING(25),
	},
	def: {
		type: DataTypes.STRING(255),
	}
}, {
	sequelize,
	modelName: 'words',
	timestamps: false,
});

module.exports = Words;
