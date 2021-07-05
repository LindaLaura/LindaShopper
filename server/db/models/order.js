const {INTEGER, ENUM, STRING, DATE, DECIMAL, VIRTUAL} = require('sequelize');

const db = require('../db');

const Order = db.define('order',{
    number_products:{
        type: INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    order_number:{
        type: STRING,
    },
    status:{
        type: ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled'),
        defaultValue: 'pending'
    },
    total: {
        type: DECIMAL(10,2),
        get(){
            return `${this.total}`
        }
    },
    ordered_date: {
        type: DATE,
        timestamps: true,
        defaultValue: db.fn('NOW')
    },
    delivered_date: {
        type: DATE,
        timestamps: true,
    },
    tax: {
        type: VIRTUAL, // means that this colunm is not stored in the db
        set(value){
            value = 0.1205
            this.setDataValue('tax', 0.1025)
        }
    },
})

//console.log(Order.tax)


const numOrder = function orderNumber() {
    let now = Date.now().toString() // '1492341545873'
    // pad with extra random digit
    now += now + Math.floor(Math.random() * 10)
    // format
    return  [now.slice(0, 4), now.slice(4, 10), now.slice(10, 14)].join('-')
}


//hooks

Order.addHook('beforeCreate' , (order)=> {
    order.order_number = numOrder();
})

module.exports = Order