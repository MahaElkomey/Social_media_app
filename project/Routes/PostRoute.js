const express = require('express');
const postData = require('../models/PostModel.js');
const commentData = require('../models/CommentModel');
const reviewData = require('../models/ReviewModel');
const User = require('../models/UserModel.js');
const validator = require('../middelWare/validator');
const jwt = require('jsonwebtoken');
const PostRoute = express.Router();

//create posts
PostRoute.post("", 
// to check if the user is authorized or not
validator.authorizedUser,
validator.createPostValidate
,async (req, res,next) => {
    const post = await postData.create({
		body:req.body.body,
		user: req.user._id
	})

	res.send(post)
    
});

//get post with filter for user id
PostRoute.get("/", validator.authorizedUser,async (req, res) => {
    const posts = await postData.find({user:req.user._id}).populate('user');
    var allPostsWithComment = [];
    for (var i = 0; i < posts.length; i++){
        const postComments  = await commentData.find({postID:posts[i]._id});
        const postReviews  = await reviewData.find({postID:posts[i]._id});
        const all = {
            post:posts[i],
            postComments,
            postReviews
        }
        
        allPostsWithComment.push(all);
    }
	res.send(allPostsWithComment);
    
});

//get post using id
PostRoute.get("/:id", async (req, res) => {
    const post = await postData.findById(req.params.id);
    const postComments  = await commentData.find({postID:post._id});
    const postReviews  = await reviewData.find({postID:post._id});
    const all = {
        post,
        postComments,
        postReviews
    }
    res.send(all);
    
});

//update post using id
PostRoute.patch("/:id", validator.authorizedUser, async (req, res) => {
    const postUpdated = await postData.findByIdAndUpdate(req.params.id,req.body,{new:true});
    const userPost = req.user;
    res.json({
        postUpdated,
        userPost
    });
});

//delete post using id
PostRoute.delete("/:id", validator.authorizedUser,async (req, res) => {
    const postdeleted = await postData.findByIdAndDelete(req.params.id,{new:true});
    const userPost = req.user;
    res.json({
        postdeleted,
        userPost
    });
    
});


module.exports = PostRoute;