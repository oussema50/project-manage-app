const { Sequelize, DataTypes } = require('sequelize');
const User = require ('./user'); 
const sequelize = require('../db/index');

const WorkingHours= sequelize.define('WorkingHour', {
    employeeId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
        allowNull: false,
    },
    startTime: {
        type: DataTypes.TIME,
        allowNull: false,
        defaultValue: '09:00:00',
    },
    endTime: {
        type: DataTypes.TIME,
        allowNull: false,
        defaultValue: '16:00:00',
    },
    status: {
        type: DataTypes.ENUM('pending', 'validated', 'refused'),
        defaultValue: 'pending',
        allowNull: false,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },

}, {
    timestamps: true, 
});

WorkingHours.belongsTo(User, { foreignKey: 'employeeId' });
User.hasMany(WorkingHours, { foreignKey: 'employeeId' }); 
(async () => {
    await sequelize.sync({ force: false });
  })();
module.exports =  WorkingHours;