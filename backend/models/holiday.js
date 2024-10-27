const { Sequelize, DataTypes } = require('sequelize');
const User = require ('./user'); 
const sequelize = require('../db/index');

const Holiday= sequelize.define('Holiday', {
    employeeId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
        allowNull: false,
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
        defaultValue: 'pending',
    },
}, {
    timestamps: true, 
});

// Establishing associations
Holiday.belongsTo(User, { foreignKey: 'employeeId' });
User.hasMany(Holiday, { foreignKey: 'employeeId' }); 
(async () => {
    await sequelize.sync({ force: false });
  })();
module.exports =  Holiday;