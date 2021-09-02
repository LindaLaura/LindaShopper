const router = require('express').Router();

const {Category, Product, User, Region, Review} = require('../db/index');

async function requireToken(req, res, next) {
    try {
      const token = req.headers.authorization;
      const user = await User.byToken(token);
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
}

//GET method route all products
router.get('/', async(req, res, next)=>{
    try{
        const products = await Product.findAll({include:[Category, Region]});
        console.log('HOHOOHOOHO', products.length)
        res.status(200).send(products);
    }
    catch(err){
        next(err)
    }
});

//GET method route single product
router.get('/:id', async(req, res, next)=>{
    try{
        const product = await Product.findByPk(req.params.id);
        res.status(200).send(product);
    }
    catch(err){
        next(err)
    }
});

//GET method route reviews single product
router.get("/:id/reviews", async (req, res, next) => {
    try {
      const reviews = await Review.findAll({
        where: {
          productId: req.params.id,
        },
        include: User,
      });
      res.status(200).send(reviews);
    } catch (error) {
      next(error);
    }
});

//POST method route new product
router.post('/', async(req, res, next) =>{
    // Find Or Create is a special SQL command that only creates
    // the user if the query doesn't yield a match.
    // This approach only requires one trip to the database.

    try{
        //if(req.user.isAdmin){
            const [product, wasCreated] = await Product.findOrCreate({
                where: {
                name: req.body.name,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                price: req.body.price,
                },
                defaults: req.body,
            });
            if (!wasCreated) {
                res
                .status(409)
                .send({ message: `Product with name ${req.body.name} already exists!` });
            } else {
                res.status(201).send(product);
            }
        //}    
        //else {res.sendStatus(401)};  
    //     //if(req.user.isAdmin){
    //         const { name, description, imageUrl, price} = req.body;
    //         console.log("POST", req.body)
    //         const newProduct = await Product.create({
    //             name,
    //             description,
    //             imageUrl,
    //             price
    //         });
    //         res.send(newProduct).status(201);
    //    // }
    //    // else {res.sendStatus(401)};
    }
    catch(error){
        next(error)
    }
});

//PUT method route modified product
router.put('/:id', async(req, res, next)=>{
    // Find the product with Product.findByPk. If they don't exist, respond
    // with 404. If they do, update them with the update instance method.
    try{
        //if(req.user.isAdmin){
           // const { name, description, imageUrl, price } = req.body;
            const {id} = req.params;
            const productToBeUpdated = await Product.findByPk(id);
            if (!productToBeUpdated) return res.sendStatus(404);
            const editedProduct = productToBeUpdated.update(req.body);
            res.send(editedProduct).status(204);
        //}
        // else{
        //     res.sendStatus(401);
        // }
    }
    catch(error){
        next(error);
    }
});

//DELETE route single product

router.delete('/:id', async(req, res, next) => {
    try{
        //if(req.user.isAdmin){
            const {id} = req.params;
            const productToBeDeleted = await Product.findByPk(id);
            await productToBeDeleted.destroy();
            res.send(productToBeDeleted).status(204);
        //}
        //else{
         //   res.sendStatus(401);
        //}
    }
    catch(error){
        next(error);
    }
})

module.exports = router;