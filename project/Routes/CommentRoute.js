const express = require('express');
const commentData = require('../models/CommentModel');
const postData = require('../models/PostModel');
const User = require('../models/UserModel.js');
const validator = require('../middelWare/validator');
const jwt = require('jsonwebtoken');
const commentRoute = express.Router();

//create todo
commentRoute.post("", 
// to check if the user is authorized or not
validator.authorizedUser,
validator.createCommentValidate
,async (req, res,next) => {
    const comment = await commentData.create({
		comment:req.body.comment,
		postID: req.headers.post
	})

	res.send(comment)
    
});

//get comment with filter for post id
commentRoute.get("/", validator.authorizedUser,async (req, res) => {
    const comments = await commentData.find({postID:req.headers.post});
	res.send(comments);
    
});

//get comment using id
commentRoute.get("/:id", async (req, res) => {
    const comment = await commentData.findById(req.params.id);
    res.send(comment);
    
});

//update comment using id
commentRoute.patch("/:id", validator.authorizedUser, async (req, res) => {
    const commentUpdated = await commentData.findByIdAndUpdate(req.params.id,req.body,{new:true});
    const postComment = await postData.findById(req.headers.post);
    res.json({
        commentUpdated,
        postComment
    });
});

//delete post using id
commentRoute.delete("/:id", validator.authorizedUser,async (req, res) => {
    const commentdeleted = await commentData.findByIdAndDelete(req.params.id,{new:true});
    const postComment = await postData.findById(req.headers.post);
    res.json({
        commentdeleted,
        postComment
    });
    
});


module.exports = commentRoute;