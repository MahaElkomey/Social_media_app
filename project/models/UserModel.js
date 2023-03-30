const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//to Protect sensitive information like password form returning in response
const _ = require('lodash');
const saltRound = process.env.SALR_ROUND;
const userSchema = new mongoose.Schema({
    username:{
		type:String,
		required:true,
		unique:true
	},
    email:{
		type:String,
		required:true,
		unique:true
	},
	age:Number,
	password:{
		type:String,
		required:true,
	},
	role:{
		type:String,
		required:true,
	},
	//
	photoURL:{
		type:String
	}
	},{
	toJSON:{
		transform: (doc,ret)=>{
			//const dataToReturn = _.pick(ret,['_id','username','email','role','photoURL'])
			//return dataToReturn;

			delete ret.password;
		}
	}
});

//to hash the user password befor save
userSchema.pre('save',async function(next){
    const userDocument = this;
    if(userDocument.isModified('password')){
        const hashedPassword = await bcrypt.hash(userDocument.password,12);
        userDocument.password = hashedPassword;
    }
    next();
});

// to check is that user authrized or not
userSchema.methods.comparePassword = function(password){
    const userDocument = this;
    return bcrypt.compare(password,userDocument.password); 
}

module.exports = mongoose.model('User',userSchema);
