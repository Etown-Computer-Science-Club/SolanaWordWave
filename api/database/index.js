const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.SOLWORDWAVE_DATABASE_URL,
	{
		dialect: 'mysql',
		logging: false,
		dialectModule: require('mysql2'),
	}
);

module.exports = sequelize;
