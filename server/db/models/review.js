const {STRING, INTEGER, TEXT} = require('sequelize');

const db = require('../db');

const Review = db.define('review',{
    title:{
        type:STRING,
        allowNull: false,
        validate: {
        notEmpty: true,
        },
    },
    description:{
        type: TEXT,
        allowNull: false,
        validate: {
        notEmpty: true,
        },
    },
    rating: {
        type: INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          min: 1,
          max: 5,
        },
    },
})

module.exports = Review