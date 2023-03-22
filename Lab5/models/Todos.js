const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const todoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['todo','in-progress','done'],
        default:'todo'
    },
    user:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
});

module.exports = mongoose.model('todoData',todoSchema);
