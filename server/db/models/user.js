const {STRING, VIRTUAL, BOOLEAN, ENUM} = require('sequelize');
const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = db.define('user', {
    firstName:{
        type: STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    lastName:{
        type: STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    fullName: {
        type: VIRTUAL,
        get () {
          //return this.getDataValue('firstName') + ' ' + this.getDataValue('lastName')
          return `${this.firstName} ${this.lastName}`;
        }
    },
    password: {
        type: STRING,
        allowNull: false,
        defaultValue: '123',
        validate: {
          notEmpty: true,
        },
    },
    email:{
        type: STRING,
        allowNull: false,
        validate:{
            isEmail: true
        }
    },
    address:{
        type:STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    isAdmin:{
        type: BOOLEAN,
        defaultValue: false,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }, 
    status:{
        type:ENUM('Authenticated', 'Guest'),
        defaultValue: 'Guest'
    }
})


//Class method == static method

User.authenticate = async function({email, password}){
    const user = await User.findOne({
        where:{email}
    });
    if(user && bcrypt.compare(password, user.password)){
        return jwt.sign({id: user.id}, process.env.JWT);
    }
    const error = Error('BAD CREDENTIALS');
    error.status = 401;
    throw error;
}

User.byToken = async function(token){
    try{
        const {id} = await jwt.verify(token, process.env.JWT);
        const user = await User.findByPk(id);
        if (user){
            return user;
        }
        const error = Error('BAD CREDENTIALS');
        error.status = 401;
        throw error;
    }
    catch(ex){
        const error = Error('BAD CREDENTIALS');
        error.status = 401;
        throw error;
    }

}

//instance method === it will be available to all the object instances created with the new keyword, and the context within that function (the this keyword) will refer to the actual object instance where you call it.


//Hook
User.addHook('beforeSave', async function(user){
    if(user._changed.has('password')){
        user.password = await bcrypt.hash(user.password, 5)
    }
});

module.exports = User