const express = require('express');
var apiRoutes = express.Router();
const User = require('../models/user');
const config = require('../config');
const jwt    = require('jsonwebtoken');



// apiRoutes.use(function(req, res, next) {
//
//     // check header or url parameters or post parameters for token
//     var token = req.body.token || req.query.token || req.headers['x-access-token'];
//
//     // decode token
//     if (token) {
//         // verifies secret and checks exp
//         jwt.verify(token, config.secret, function(err, decoded) {
//             if (err) {
//                 return res.json({ success: false, message: 'Failed to authenticate token.' });
//             } else {
//                 // if everything is good, save to request for use in other routes
//                 req.decoded = decoded;
//                 next();
//             }
//         });
//
//     } else {
//
//         // if there is no token
//         // return an error
//         return res.status(403).send({
//             success: false,
//             message: 'No token provided.'
//         });
//
//     }
// });


apiRoutes.get('/', function(req, res) {
    res.render('account');
});

apiRoutes.get('/users', function(req, res) {
    User.find({}, function(err, users) {
        res.json(users);
    });
});


apiRoutes.post('/authenticate', function(req, res) {
    // find the user
    User.findOne({
        name: req.body.name
    }, function(err, user) {
        console.log(user);
        if (err) {
            res.send({ success: false, message: 'Loi .' });
        }else
        if (user) {
            // check if password matches
            if (user.password != req.body.password) {
                res.send({ success: false, message: 'Authentication failed. Wrong password.' });
                //res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {
                // if user is found and password is right
                // create a token with only our given payload
                // we don't want to pass in the entire user since that has the password
                const payload = {
                    admin: user.admin
                };

                var token = jwt.sign(payload, config.secret, {
                    //expiresInMinutes: 1440 // expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }
        } else {
                res.send({ success: false, message: 'Authentication failed. User not found.' });
                //res.json({ success: false, message: 'Authentication failed. User not found.' });

            }



    });
});



module.exports = apiRoutes;