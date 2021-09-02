const router = require('express').Router();

const {Category, Product, User, Region} = require('../db/index')


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


//GET method route all categories
router.get('/', async(req, res, next)=>{
    try{
        const categories = await Category.findAll(
            {include: [Product]}
        );
        res.status(200).send(categories);
    }
    catch(err){
        next(err)
    }
})

//GET method route single category
router.get('/:id', async(req, res, next)=>{
    try{
        const category = await Category.findByPk(req.params.id, {include: Product });
        res.status(200).send(category);
    }
    catch(err){
        next(err)
    }
})

//POST method route create category
router.post("/", async (req, res, next) => {
    try {
      //if (req.user.isAdmin) {
        const [category, wasCreated] = await Category.findOrCreate({
            where: {
              name: req.body.name
            },
            defaults: req.body
        });
        
        if (!wasCreated){
          res
          .status(409)
          .send({message: `Category with name ${req.body.name} already exists!`});
        }
        else {
          res.status(201).send(category);
        }
        // const { name } = req.body;
        // const category = await Category.create({ name });
        // res.status(200).send(category);
     // }
      // else {
      //   res.sendStatus(401);
      // }
    } 
    catch (error) {
      next(error);
    }
});

//PUT method route modify category
router.put("/:id", async (req, res, next) => {
    try {
      //if (req.user.isAdmin) {
        const { name } = req.body;
        const { id } = req.params;
        const categoryToBeUpdated = await Category.findByPk(id);
        const editedCategory = await categoryToBeUpdated.update({ name });
        res.send(editedCategory.dataValues).status(204);
      //} 
      // else {
      //   res.sendStatus(401);
      // }
    } 
    catch (error) {
      next(error);
    }
  });

  //DELETE method route delete category
router.delete("/:id", async (req, res, next) => {
    try {
      //if (req.user.isAdmin) {
        const { id } = req.params;
        const categoryToBeDeleted = await Category.findByPk(id);
        await categoryToBeDeleted.destroy();
        res.send(categoryToBeDeleted).status(204);
      //} 
      // else {
      //   res.sendStatus(401);
      // }
    } 
    catch (error) {
      next(error);
    }
  });


module.exports = router;