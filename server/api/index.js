const router = require('express').Router();
//import your models from /db

//routes go here

router.use('/categories', require('./categoryRoute'));
router.use('/products', require('./productRoute'));
router.use('/regions', require('./regionRoute'));
router.use('/reviews', require('./reviewRoute'));
router.use('/users', require('./userRoute'));

module.exports = router