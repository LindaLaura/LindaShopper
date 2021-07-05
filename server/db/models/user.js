const {STRING, VIRTUAL, BOOLEAN, ENUM} = require('sequelize');
const db = require('../db')

const User = db.define('user', {
    firstName:{
        type: STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    lastName:{
        type: STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    fullName: {
        type: VIRTUAL,
        get () {
          //return this.getDataValue('firstName') + ' ' + this.getDataValue('lastName')
          return `${this.firstName} ${this.lastName}`;
        }
    },
    password: {
        type: STRING,
        allowNull: false,
        defaultValue: '123',
        validate: {
          notEmpty: true,
        },
    },
    email:{
        type: STRING,
        allowNull: false,
        validate:{
            isEmail: true
        }
    },
    address:{
        type:STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    isAdmin:{
        type: BOOLEAN,
        defaultValue: false,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }, 
    status:{
        type:ENUM('Authenticated', 'Guest'),
        defaultValue: 'Guest'
    }
})


module.exports = User