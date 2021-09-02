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

//GET method route all regions
router.get('/', async(req, res, next)=>{
    try{
        //if (req.user.isAdmin) {
            const regions = await Region.findAll(
                {include: [Product]}
            );
            res.status(200).send(regions);
        //}
        // else{
        //     res.sendStatus(401);
        // }
    }
    catch(err){
        next(err)
    }
});

//GET method route single region
router.get('/:id', async(req, res, next)=>{
    try{

        const region = await Region.findByPk(req.params.id,
            {include: [Product]}
        );
        res.status(200).send(region);
    }
    catch(err){
        next(err)
    }
});

//GET method route all products single region
router.get('/:id/products', async(req, res, next)=>{
    try{
        //if (req.user.isAdmin) {
            const products = await Product.findAll({
                where:{
                    regionId: req.params.id
                },
                include: [Category]
            });
            res.status(200).send(products);
        //}
        // else{
        //     res.sendStatus(401);
        // }
    }
    catch(err){
        next(err)
    }
});

//POST method route create region
router.post('/', async(req, res, next) => {
    try{
        const [region, wasCreated] = await Region.findOrCreate({
            where: {
                name: req.body.name,
                capital: req.body.capital,
                num_Of_Boroughs: req.body.num_Of_Boroughs,
                area: req.body.area,
                description: req.body.description,
                latitude: req.body.latitude,
                longitude: req.body.longitude
            },
            defaults: req.body
        });
        if (!wasCreated){
            res
            .status(409)
            .send({message: `Region with name ${req.body.name} already exists!`});
        }
        else{
            res.status(201).send(region);
        }
    }
    catch(error){
        next(error);
    }
});

//PUT method route modify region
router.put('/:id', async(req, res, next) =>{
    try{
        //if(req.user.isAdmin){
            const {id} = req.params;
            const regionToBeUpdated = await Region.findByPk(id);
            if(!regionToBeUpdated) return  Product.findByPk(id);
            if (!productToBeUpdated) return res.sendStatus(404);
            const editedRegion =  productToBeUpdated.upddate(req.body);
            res.send(editedRegion).status(204);
        //}
        // else{
        //     res.sendStatus(401);
        // }
    }
    catch(error){
        next(error);
    }
});

//DELETE route region
router.delete('/:id', async(req, res, next) =>{
    try{
        //if(req.user.isAdmin){
            const {id} = req.params;
            const regionToBeDeleted = await Region.findByPk(id);
            await regionToBeDeleted.destroy();
            res.send(regionToBeDeleted).status(204);
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