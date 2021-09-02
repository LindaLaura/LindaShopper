const router = require('express').Router();

const { Category, Product, User, Region, Review, Order} = require('../db/index');

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

//GET method route all users
router.get('/', async(req, res, next) => {
    try{
        const users = await User.findAll();
        res.send(users).status(200);
    }
    catch(error){
        next(error);
    }
});

//GET method route single user
router.get('/:id', async(req, res, next) => {
    try{
    const {id} = req.params;
    const user = await User.findByPk(id);
    res.send(user).status(200);
    }
    catch(error){
        next(error);
    }
});

//POST method route create a new user
router.post('/', requireToken, async(req, res, next) => {
    try{
        if(req.user.status === 'Guest'){
            const [user, wasCreated] = await User.findOrCreate({
                where: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    password: req.body.password,
                    email: req.body.email,
                    address: req.body.address,
                    status: 'Authenticated',
                    },
                defaults: req.body,
            });
            if (!wasCreated) {
                res
                .status(409)
                .send({ message: `User with name ${req.body.lastName} ${req.body.firstName} already exists!` });
                } 
            else {
                res.status(201).send(user);
            }
        } 
        else {res.sendStatus(401)}; 
    }
    catch(error){
        next(error);
    }
});

//PUT method route modify user
router.put('/:id', requireToken, async(req, res, next) => {
    try{
        const {id} = req.params;
        const userToBeUpdated = await User.findByPk(id);
        if(!userToBeUpdated) return res.sendStatus(404);
        const editedUser = userToBeUpdated.upadte(req.body);
        res.send(editedUser).status(204);
    }
    catch(error){
        next(error);
    }
});

//DELETE method route delete user
router.delete('/:id', requireToken, async(req, res, next) => {
    try{
        const {id} = req.params;
        const userToBeDeleted = await User.findByPk(id);
        await userToBeDeleted.delete();
        res.send(userToBeDeleted).status(204);
    }
    catch(error){
        next(error);
    }
})

module.exports = router;