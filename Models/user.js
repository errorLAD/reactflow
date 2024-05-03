const mongoose = require('mongoose'); 

const userSchema = mongoose.Schema({
    email: {
        type : String, 
        required: [true,"email is Required"],
        unique: [true,"already in database"],
    },
},
{
   timestamps: true,
}
);

const User = mongoose.model('User', userSchema);
module.exports = User;