const express = require('express');
const User = require('../models/UserModel.js');
const validator = require('../middelWare/validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CustomError = require('../helpers/customError');
const users = express.Router();
const jwtSecret = process.env.JWT_SECRET;

//singup  user
users.post("/singup",validator.signupValidate,async (req, res,next) => {
    const {username,email,password,role} = req.body;
    const newUser = new User({ 
        username,
        email,
        password,
        role
    });
    await newUser.save();
    res.send(newUser);
    
});


//singin  user
users.post("/singin",validator.signinValidate,async (req, res,next) => {
    const {username,password} = req.body;
    const user = await User.findOne({username});
        if(!user) throw new CustomError('invalid credentials',400);
        const isMatch = await user.comparePassword(password);
        if(!isMatch)throw new CustomError('invalid credentials',400);
        const payload = {id:user._id};
        const token = jwt.sign(payload,jwtSecret);
        res.json({
            massage:"user sign in",
            token,
            user
    })
    
});

/////////////////////////////////////////////////////////////////////////////////////////
//get user using id
users.get("/:id", validator.authorizedUser,validator.authGetUser,async (req, res,next) => {
    const user = await User.findById(req.params.id);
    res.send(user);
    
});

//update user using id
users.patch("/:id", validator.authorizedUser,validator.authGetUser,async (req, res,next) => {
    const userUpdated = await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.send(userUpdated);
});

//delete user using id
users.delete("/:id",validator.authorizedUser,validator.authGetUser,async (req, res,next) => {
    const userdeleted = await User.findByIdAndDelete(req.params.id,{new:true});
    res.send(userdeleted);
    
});


module.exports = users;