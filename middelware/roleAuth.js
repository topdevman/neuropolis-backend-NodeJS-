// var User = require('../models/user');
//
// exports.roleAuthorization = function(role) {
//     return function(req, res, next) {
//         const user = req.user;
//
//         User.findbyId(user._id,  function(err, foundUser) {
//             if (err) {
//                 res.status(422).json({ error: 'No user was found.' });
//                 return next(err);
//             }
//
//             // If user is found, check role.
//             if (foundUser.role == role) {
//                 return next();
//             }
//
//             res.status(401).json({ error: 'You are not authorized to view this content.' });
//             return next('Unauthorized');
//         })
//     }
// }