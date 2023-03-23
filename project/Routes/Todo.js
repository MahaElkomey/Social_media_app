const express = require('express');
const todoData = require('../models/Todos.js');
const User = require('../models/User.js');
const validator = require('../middelWare/validator');
const jwt = require('jsonwebtoken');
const todos = express.Router();

//create todo
todos.post("", 
// to check if the user is authorized or not
validator.authorizedUser,
validator.createTodoValidate
,async (req, res,next) => {
    const todo = await todoData.create({
		title:req.body.title,
		status:req.body.status || 'todo',
		user: req.user._id
	})

	res.send(todo)
    
});

//get todo with filter for user id
todos.get("/", validator.authorizedUser,async (req, res) => {
    const todos = await todoData.find({user:req.user._id}).populate('user');
	res.send(todos);
    
});

//get todo using id
todos.get("/:id", async (req, res) => {
    const todo = await todoData.findById(req.params.id);
    res.send(todo);
    
});

//update todo using id
todos.patch("/:id", validator.authorizedUser, async (req, res) => {
    const todoUpdated = await todoData.findByIdAndUpdate(req.params.id,req.body,{new:true});
    const userTodo = req.user;
    res.json({
        todoUpdated,
        userTodo
    });
});

//delete todo using id
todos.delete("/:id", validator.authorizedUser,async (req, res) => {
    const tododeleted = await todoData.findByIdAndDelete(req.params.id,{new:true});
    const userTodo = req.user;
    res.json({
        tododeleted,
        userTodo
    });
    
});


module.exports = todos;