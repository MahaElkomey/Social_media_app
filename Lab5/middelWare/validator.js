const joi = require('joi');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const jwtSecret = process.env.JWT_SECRET;


// sign up validation
const signupSchema = joi.object({
    username:joi.string().required(),
    email:joi.string().required(),
    password:joi.string().required()

})
const signupValidate = (req,res,next)=>{
    const {error} = signupSchema.validate(req.body);
    if(error){
        const err = new Error(error.details[0].message);
        error.statusCode = 400;
        return next(error);
    }
    next();
}

// sign in validation 
const signinSchema = joi.object({
    username:joi.string().required(),
    password:joi.string().required()

})
const signinValidate = (req,res,next)=>{
    const {error} = signinSchema.validate(req.body);
    if(error){
        const err = new Error(error.details[0].message);
        error.statusCode = 400;
        return next(error);
    }
    next();
}

// create todo validation
const createTodoSchema = joi.object({
    title:joi.string().required()

})
const createTodoValidate = (req,res,next)=>{
    const {error} = createTodoSchema.validate(req.body);
    if(error){
        const err = new Error(error.details[0].message);
        error.statusCode = 400;
        return next(error);
    }
    next();
}

// to check is that user authrized or not to creating,updating and deleting todo apis 
const authorizedUser = async (req,res,next)=>{
    const token = req.headers.authorization;
    if(!token){
        const error = new Error('unauthorized');
        error.statusCode = 401; 
        return next(error);
    }
    const { id } = jwt.verify(token,jwtSecret);
    console.log(id);
    const user = await User.findById(id);
    console.log(user);
    if(!user){
        const error = new Error('unauthorized');
        error.statusCode = 401; 
        return next(error);
    }
    req.user = user;
    next() 
}

module.exports = { signinValidate,signupValidate,authorizedUser,createTodoValidate }
