const { Sequelize, DataTypes } = require('sequelize');
const User = require ('./user'); 
const sequelize = require('../db/index');
const { check } = require('express-validator');

const Notification= sequelize.define('WorkingHour', {
    employeeId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
        allowNull: false,
    },
    message:{
        type:DataTypes.TEXT,
        allowNull: true
    },
    isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },

}, {
    timestamps: true, 
});

Notification.belongsTo(User, { foreignKey: 'employeeId' });
User.hasMany(Notification, { foreignKey: 'employeeId' }); 
(async () => {
    await sequelize.sync({ force: false });
  })();
module.exports =  Notification;