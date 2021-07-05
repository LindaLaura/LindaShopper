const {STRING, TEXT, INTEGER, DECIMAL} = require('sequelize');

const db = require('../db');

const Region = db.define('region', {
    name:{
        type: STRING,
        allowNull: false,
        validate:{
            notEmpty: true 
        }
    },
    capital:{
        type: STRING,
        allowNull: false,
        validate:{
            notEmpty: true 
        }
    },
    num_Of_Boroughs:{
        type: INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true 
        }
    },
    area:{
        type: INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true 
        }
    },
    description:{
        type: TEXT,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    latitude:{
        type: DECIMAL,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    longitude:{
        type: DECIMAL,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
})

module.exports = Region