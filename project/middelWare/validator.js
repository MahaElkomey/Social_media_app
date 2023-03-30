const joi = require('joi');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel.js');
const User = require('../models/UserModel.js');
const { ROLE } = require('../helpers/usreRole');
const jwtSecret = process.env.JWT_SECRET;


// sign up validation
const signupSchema = joi.object({
    username:joi.string().required(),
    email:joi.string().required(),
    password:joi.string().required(),
    role:joi.string().required(),
    avatar:joi.string()

})
const signupValidate = async (req)=>{
    const {error} = await signupSchema.validate(req.body);

    if(error){
        const err = new Error(error.details[0].message);
        error.statusCode = 400;
        return next(error);
    }
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

// create post validation
const createPostSchema = joi.object({
    body:joi.string().required()

})
const createPostValidate = (req,res,next)=>{
    const {error} = createPostSchema.validate(req.body);
    if(error){
        const err = new Error(error.details[0].message);
        error.statusCode = 400;
        return next(error);
    }
    next();
}

// create comment validation
const createCommentSchema = joi.object({
    comment:joi.string().required()

})
const createCommentValidate = (req,res,next)=>{
    const {error} = createCommentSchema.validate(req.body);
    if(error){
        const err = new Error(error.details[0].message);
        error.statusCode = 400;
        return next(error);
    }
    req.post = req.headers.post;
    next();
}

// create review validation
const createReviewSchema = joi.object({
    rate:joi.number().required()

})
const createReviewValidate = (req,res,next)=>{
    const {error} = createReviewSchema.validate(req.body);
    if(error){
        const err = new Error(error.details[0].message);
        error.statusCode = 400;
        return next(error);
    }
    req.post = req.headers.post;
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
    const user = await UserModel.findById(id);
    console.log(user);


    if(!user){
        const error = new Error('unauthorized');
        error.statusCode = 401; 
        return next(error);
    }
    req.user = user;
    next() 
}

//just admin and user his self can get,update,delete user by id 
const authUser = async (req, res, next) =>{
    const user = await User.findById(req.user._id);
    const role = user.role;
    if (role === ROLE.ADMIN || JSON.stringify(user._id) === JSON.stringify(req.params.id)) {
        next();
    }
    else{
        const error = new Error('unauthorized maha');
        error.statusCode = 401; 
        return next(error);
    }
}


module.exports = { 
    signinValidate,
    signupValidate,
    authorizedUser,
    createPostValidate,
    createCommentValidate,
    createReviewValidate,
    authUser
 }
