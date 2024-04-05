const { DateTime } = require('luxon');
const Chore = require('../models/chore'); 
const User = require('../models/user'); 

//GET /: send all tasks to user
exports.index = (req, res, next) => {
    let userId = req.session.user.id;

    Promise.all([
        User.find(),
        Chore.find({ $or: [{ createdBy: userId }, { assignTo: userId }] })
        .populate('createdBy', 'firstName lastName')
        .populate('assignTo', 'firstName lastName')
    ])
    .then(([users, chores]) => {
        chores.forEach(chore => {
            chore.formattedDate = DateTime.fromJSDate(chore.date).plus({ days: 1 }).toFormat('MM/dd/yy');
        });
        res.render('./chore/index', { req, users, chores });
    })
    .catch(err=>next(err));
};

//GET /active: send tasks in progess
exports.active = (req, res, next) => {
    let userId = req.session.user.id;

    Promise.all([
        User.find(),
        Chore.find({
            $or: [
                { createdBy: userId, assignTo: null, completed: false }, 
                { assignTo: userId, completed: false } 
            ]
        })
        .populate('createdBy', 'firstName lastName')
        .populate('assignTo', 'firstName lastName')
    ])
    .then(([users, chores]) => {
        chores.forEach(chore => {
            chore.formattedDate = DateTime.fromJSDate(chore.date).plus({ days: 1 }).toFormat('MM/dd/yy');
        });
        res.render('./chore/active', { req, users, chores });
    })
    .catch(err=>next(err));
};

//GET /: send tasks assigned to other users
exports.assigned = (req, res, next) => {
    let userId = req.session.user.id;

    Promise.all([
        User.find(),
        Chore.find({
            createdBy: userId, // Filter tasks created by the current user
            assignTo: { $ne: null},
            completed: false 
        })
        .populate('createdBy', 'firstName lastName')
        .populate('assignTo', 'firstName lastName')
    ])
    .then(([users, chores]) => {
        chores.forEach(chore => {
            chore.formattedDate = DateTime.fromJSDate(chore.date).plus({ days: 1 }).toFormat('MM/dd/yy');
        });
        res.render('./chore/assigned', { req, users, chores });
    })
    .catch(err=>next(err));
};

//GET /: send all completed tasks to user
exports.completed = (req, res, next) => {
    let userId = req.session.user.id;

    Promise.all([
        User.find(),
        Chore.find({ $or: [{ createdBy: userId }, { assignTo: userId }], completed: true })
        .populate('createdBy', 'firstName lastName')
        .populate('assignTo', 'firstName lastName')
    ])
    .then(([users, chores]) => {
        chores.forEach(chore => {
            chore.formattedDate = DateTime.fromJSDate(chore.date).plus({ days: 1 }).toFormat('MM/dd/yy');
        });
        res.render('./chore/completed', { req, users, chores });
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

//PUT /events/:id
exports.update = (req, res, next) => {
    if (req.body.assignTo === "") {
        req.body.assignTo = null;
    }
    let chore = req.body;
    let id = req.params.id;

    Chore.findByIdAndUpdate(id, chore, {useFindAndModify: false, runValidators: true})
    .then(chore=>{
        req.flash('success', 'Chore was updated succesfully!');
            res.redirect('back');
    })
    .catch(err=>{
        if(err.name === 'ValidationError') {
            err.status = 400;            
            req.flash('error', err.message);
            res.redirect('back');
        }
        // next(err);
    });
};

//DELETE /chores/:id
exports.delete = (req, res, next) => {
    let id = req.params.id;

    Chore.findByIdAndDelete(id, {useFindAndModify: false})
    .then(chore => {
        req.flash('success', 'Chore was succesfully deleted!');
        return res.redirect('/chores');
    })
    .catch(err => next(err));
};