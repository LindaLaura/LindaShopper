//import your db
const db = require('../db/db');

//import your models
const User = require('../db/models/user');
const Order = require('../db/models/order');
const Review  = require('../db/models/review');
const Region = require('../db/models/region'); // I need it for the checkout 
const Category = require('../db/models/category');
const Product = require('../db/models/product');
const Order_Product = require('../db/models/order_product');

//state your model associations

//Order-User
Order.belongsTo(User);
User.hasMany(Order);

//Review-User
Review.belongsTo(User);
User.hasMany(Review);

//Review-Product
Review.belongsTo(Product);
Product.hasMany(Review)

//Product-Region
Product.belongsTo(Region);
Region.hasMany(Product);

//Product-Category
Product.belongsTo(Category);
Category.hasMany(Product);

//Product-Order
Product.belongsToMany(Order , {through: Order_Product});
Order.belongsToMany(Product , {through: Order_Product})




//export your db and models (so they all can be imported from a single central location)

module.exports = {
    db,
    Product,
    Order_Product,
    Category,
    Order,
    Region,
    User,
    Review
}