const User = require('../models/user');
const Chore = require('../models/chore');

//GET /: send home page to the user
exports.new = (req, res) => {
    res.render('./user/new');
};

exports.create = (req, res, next) => {
    let user = new User(req.body);
    user.save()
    .then(()=>{
        req.flash('success', 'Registration succeded!');
        res.redirect('/');
    })
    .catch(err=>{
        if(err.name === 'ValidationError') {
            req.flash('error', err.message);
            return res.redirect('/users/new');
        }
        if(err.code === 11000) {
            req.flash('error', 'Email address has been used');
            return res.redirect('/users/new');
        }
        next(err);
    });
};

exports.login = (req, res, next) => {
    //authenticate user's login request
    let email = req.body.email;
    let password = req.body.password;

    //get the user that matches the email
    User.findOne({email: email})
    .then(user=>{
        if (!user) {
            console.log('wrong email address');
            req.flash('error', 'Incorrect email address!');  
            res.redirect('/');
            } else {
            user.comparePassword(password)
            .then(result=>{
                if(result) {
                    req.session.user = {id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email};
                    req.flash('success', 'You have successfully logged in');
                    res.redirect('/chores');
            } else {
                req.flash('error', 'Incorrect password!');      
                res.redirect('/');
            }
            });     
        } 
    })
    .catch(err=>next(err));
};

exports.logout = (req, res, next) => {
    req.session.destroy(err=>{
        if(err) {
            return next(err);
        } else {
            res.redirect('/');
        }
    });
};

exports.getDeleteUser = (req, res) => {
    res.render('./user/delete');
};


//DELETE /users/:id
exports.delete = (req, res, next) => {
    let id = req.params.id; 

    User.findByIdAndDelete(id, {useFindAndModify: false})
    .then( user => {
        if (!user) {
            req.flash('error', 'User not found');
            return res.redirect('/');
        }

        req.flash('success', 'User was successfully deleted!');
        req.session.destroy(err => {
            if (err) {
                return next(err);
            } else {
                res.redirect('/');
            }
        });
    })
    .catch(err => next(err));
};