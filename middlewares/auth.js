// const Event = require('../models/event');

// check if user is a guest
exports.isGuest = (req, res, next)=>{
    if(!req.session.user) { //if a user is logged in then there is a user in the session
        return next();
    } else {
        req.flash('error', 'You are logged in already!');
        return res.redirect('/users/profile');
    }
};

// check if user is authenticated
exports.isLoggedIn = (req, res, next)=>{
    if(req.session.user) { //if a user is logged in then there is a user in the session
        return next();
    } else {
        req.flash('error', 'You must log in first!');
        return res.redirect('/users/login');
    }
};

// // check if user is host of the event
// exports.isHost = (req, res, next)=>{
//     let id = req.params.id;

//     Event.findById(id)
//     .then(event=>{
//         if(event) {
//             if(event.host == req.session.user.id) {
//                 return next();
//             } else {
//                 let err = new Error('Unauthorized to access the resource');
//                 err.status = 401;
//                 return next(err);
//             }
//         } else {
//             let err = new Error('Cannot find a event with id ' + id);
//             err.status = 404;
//             next(err);
//         }
//     })
//     .catch(err=>next(err));
// };