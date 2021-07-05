const { INTEGER}= require('sequelize'); // for thing like Sequelize.STRING

//import your db
const db = require('../db');
const Order = require('./order');
const Product = require('./product');

const Order_Product = db.define('order_product',{
    orderId:{
        type: INTEGER,
        references: {
            model: Order, // 'Orders' would also work
            key: 'id'
        }
    },
    productId:{
        type: INTEGER,
        references: {
            model: Product, // 'Products' would also work
            key: 'id'
        }
    }
});

module.exports = Order_Product