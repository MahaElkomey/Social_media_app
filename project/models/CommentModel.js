const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentSchema = new mongoose.Schema({
    comment:{
        type:String,
        required:true
    },
    postID:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('commentData',commentSchema);
