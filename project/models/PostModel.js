const { array } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = new mongoose.Schema({
    title:{
        type:String
    },
    body:{
        type:String,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
});

module.exports = mongoose.model('postData',postSchema);
