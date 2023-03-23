const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const reviewSchema = new mongoose.Schema({
    rate: {
        type: Number,
        min: 1,
        max: 10,
        required:true
      },
    postID:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('reviewData',reviewSchema);
