const express = require('express');
const reviewData = require('../models/ReviewModel');
const postData = require('../models/PostModel');
const User = require('../models/UserModel.js');
const validator = require('../middelWare/validator');
const jwt = require('jsonwebtoken');
const reviewRoute = express.Router();

//create Review
reviewRoute.post("", 
// to check if the user is authorized or not
validator.authorizedUser,
validator.createReviewValidate
,async (req, res,next) => {
    const review = await reviewData.create({
		rate:req.body.rate,
		postID: req.headers.post
	})

	res.send(review)
    
});

//get review with filter for post id
reviewRoute.get("/", validator.authorizedUser,async (req, res) => {
    const reviews = await reviewData.find({postID:req.headers.post});
	res.send(reviews);
    
});

//get review using id
reviewRoute.get("/:id", async (req, res) => {
    const review = await reviewData.findById(req.params.id);
    res.send(review);
    
});

//update review using id
reviewRoute.patch("/:id", validator.authorizedUser, async (req, res) => {
    const reviewUpdated = await reviewData.findByIdAndUpdate(req.params.id,req.body,{new:true});
    const postReview = await postData.findById(req.headers.post);
    res.json({
        reviewUpdated,
        postReview
    });
});

//delete review using id
reviewRoute.delete("/:id", validator.authorizedUser,async (req, res) => {
    const reviewdeleted = await reviewData.findByIdAndDelete(req.params.id,{new:true});
    const postReview = await postData.findById(req.headers.post);
    res.json({
        reviewdeleted,
        postReview
    });
    
});


module.exports = reviewRoute;