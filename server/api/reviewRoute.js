const router = require('express').Router();

const {Category, User, Review, Product, Region} = require('../db/index');

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

//GET method route all reviews
router.get('/', async(req, res, next) =>{
    try{
        //if(req.user.isAdmin){
            const reviews = await Review.findAll({
                include:[User, Product]
            });
            res.status(200).send(reviews);
        //}
        //else{
         //   res.sendStatus(401);
        //}
    }
    catch(error){
        next(error);
    }
});

//GET method route single review
router.get('/:id', async(req, res, next) =>{
    try{
        //if(req.user.isAdmin){
            const {id} = req.params
            const review = await Review.findByPk(id, {
                include:[User, Product]
            });
            res.status(200).send(review);
        //}
        //else{
         //   res.sendStatus(401);
        //}
    }
    catch(error){
        next(error);
    }
});

//POST method route create review
router.post('/', async(req, res, next) =>{
    try{
        if (req.user.status !== "GUEST") {
            const { userId, productId, title, description, rating } = req.body;
            const theUser = await User.findByPk(userId);
            const newReview = await Review.create({
              userId,
              productId,
              title,
              description,
              rating,
            });
            res.send({ newReview, user: theUser }).status(201);
        } else {
            res.sendStatus(401);
        }
    }
    catch(error){
        next(error);
    }
});

//PUT method route modify review
router.put('/:id', async(req, res, next) => {
    try{
        const {id} = req.params;
        const reviewToBeUpadted = await Review.findByPk(id);
        if(!reviewToBeUpadted) return res.sendStatus(404);
        const editedReview = reviewToBeUpadted.update(req.body);
        res.send(editedReview).status(204);
    }
    catch(error){
        next(error);
    }
});

//DELETE method route delete review
router.delete('/:id', async(req, res, next) => {
    try{
        const {id} = req.params;
        const reviewToBeDeleted = await Review.findByPk(id);
        await reviewToBeDeleted.destroy();
        res.send(reviewToBeDeleted).status(204);
    }
    catch(error) {
        next(error);
    }

})


module.exports = router;