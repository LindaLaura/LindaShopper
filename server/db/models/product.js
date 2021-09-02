const {STRING, TEXT, DECIMAL, INTEGER}= require('sequelize'); // for thing like Sequelize.STRING

//import your db
const db = require('../db')

//import your model
const Product = db.define('product',{
    // Model attributes are defined here
    name:{
        type: STRING,
        allowNull: false,
        validate:{
            notEmpty:true
        }
    },
    description:{
        type: TEXT
    },
    imageUrl:{
        type: STRING,
        defaultValue:'public/defaultProduct.png'
    },
    price:{
        type: DECIMAL(10,2),
        allowNull: false,
        validate:{
            notEmpty:true
        }
    },
    inventory: {
        type: INTEGER,
        defaultValue: 50,
    },
    // origin_place:{
    //     type: STRING,
    //     allowNull: false,
    //     validate:{
    //         notEmpty: true
    //     }
    // }
}) 

//define  any class or instance methods

//export your model
module.exports = Product