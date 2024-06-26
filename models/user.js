const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema ({
    firstName: {type: String, required: [true, 'first name is required']},
    lastName: {type: String, required: [true, 'last name is required']},
    email: {type: String, required: [true, 'email is required'], unique: [true, 'this email address has been used']},
    password: {type: String, required: [true, 'password is required']}
});

//replace plaintext password with hashed password before saving the document in the database
userSchema.pre('save', function(next) {
    let user = this;
    if(!user.isModified('password')) {
        return next();
    } else {
        bcrypt.hash(user.password, 10)
        .then(hash=>{
            user.password = hash;
            next();
        })
        .catch(err=>next(err));
    }
});

//implement a method to compare the login password and the hash stored in the database
userSchema.methods.comparePassword = function(inputPassword) {
    let user = this;
    return bcrypt.compare(inputPassword, user.password);
};

module.exports = mongoose.model('User', userSchema);

