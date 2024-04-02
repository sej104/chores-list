const { DateTime } = require('luxon');
const Chore = require('../models/chore'); 
const User = require('../models/user'); 

//GET /: send home page to the user
exports.index = (req, res) => {
    Promise.all([
        User.find(),
        Chore.find()
        .populate('createdBy', 'firstName lastName')
        .populate('assignTo', 'firstName lastName')
    ])
    .then(([users, chores]) => {
        chores.forEach(chore => {
            chore.formattedDate = DateTime.fromJSDate(chore.date).toFormat('MM/dd/yy');
        });
        res.render('./chore/index', {req, users, chores});
    })
    .catch(err=>next(err));
};


//POST /chores
exports.create = (req, res, next) => {
    if (req.body.assignTo === "") {
        req.body.assignTo = null;
    }
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