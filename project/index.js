const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(morgan('combined'));
const PostRoute = require('./Routes/PostRoute.js');
const ReviewRoute = require('./Routes/ReviewRoute');
const commentRoute = require('./Routes/CommentRoute');
const users = require('./Routes/UserRoute.js');
const cors = require('cors');
const mongoURL = process.env.MONGO_URL;
mongoose.connect(mongoURL);
app.use('/review',ReviewRoute);
app.use('/comment',commentRoute);
app.use('/post',PostRoute);
app.use('/user',users);
const port = process.env.PORT
console.log(port);
app.listen(port,()=>{
	console.log(`Server is running on port ${port}`);
})
app.use(cors())
app.get('/',(req,res)=>{
	res.send('hello world')
})

// 4 parameters error handler
app.use((err,req,res,next)=>{
	err.statusCode = err.statusCode || 500;
	console.log('from error handler');
	res.status(err.statusCode).json({
		status: 'error',
		message:err.message || 'something went wrong',
		err
	})
});