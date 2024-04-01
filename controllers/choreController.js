const { DateTime } = require('luxon');
const Chore = require('../models/chore'); 
const User = require('../models/user'); 

//GET /: send home page to the user
exports.index = (req, res) => {
    User.find()
    .then(users=>{
        res.render('./chore/index', {users, req});
    })
    .catch(err=>next(err));
};


//POST /chores
exports.create = (req, res, next) => {
    let chore = new Chore(req.body);
    chore.createdBy = req.session.user.id;
    chore.save()
    .then(()=>{
        req.flash('success', 'Chore was succesfully created!');
        res.redirect('/');
    })
    .catch(err=>{
        if(err.name === 'ValidationError') {
            console.log(err);
            err.status = 400;
            req.flash('error', err.message);
            return res.redirect('/sdasdasd');
        }
        next(err)
    });
};