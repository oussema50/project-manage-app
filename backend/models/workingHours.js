const { Sequelize, DataTypes } = require('sequelize');
const User = require ('./user'); 
const sequelize = require('../db/index');
const { check } = require('express-validator');

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
        type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
        defaultValue: 'pending',
        allowNull: false,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    hoursOfWork:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:'8 hours'
    },
    reason:{
        type:DataTypes.TEXT,
        allowNull: true
    },
    checkOutStatus:{
        type:DataTypes.ENUM('pending', 'accepted', 'rejected'),
        allowNull: true
    },
    checkoutTime:{
        type: DataTypes.TIME
    },
    hoursOfCheckOut:{
        type:DataTypes.BIGINT,
        defaultValue:0,
    },
    checkOutReason:{
        type:DataTypes.TEXT,
        allowNull:true
    }

}, {
    timestamps: true, 
});

WorkingHours.belongsTo(User, { foreignKey: 'employeeId' });
User.hasMany(WorkingHours, { foreignKey: 'employeeId' }); 
(async () => {
    await sequelize.sync({ force: false });
  })();
module.exports =  WorkingHours;