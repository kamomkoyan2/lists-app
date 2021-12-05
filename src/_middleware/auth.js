const jwt = require('jsonwebtoken');

const compose = require('composable-middleware');
const expressJwt = require('express-jwt');
const db = require('../db/models')
const User = db.User;


function signToken(userId, username, firstName, lastName, password) {
    return jwt.sign({userId: userId, username: username, firstName: firstName, lastName: lastName, password: password}, 'thisismyverysecretkey', {
        expiresIn:60 * 60 * 5
    })
}


const validateJwt = expressJwt({
    secret: 'thisismyverysecretkey', algorithms: ['sha1', 'RS256', 'HS256'],
});

// const validateRevokedJwt = expressJwt({
//     secret: 'thisismyverysecret',
//     isRevoked: function(req, payload, done) {
//         return done(null, true);
//     }
// });

function isAuth() {
    return compose()

        .use(function(req,res,next) {
        if (req.query || req.headers.hasOwnProperty('access_token')) {
            req.header.authorization = 'Bearer ' + req.headers.access_token;
        }
        if (req.headers.access_token === 'undefined' || !req.headers.access_token) {
            res.status(401).json({message: 'Unauthorized'})
        }
        validateJwt(req,res,next);
    })
}



module.exports = {
    signToken: signToken,
    isAuth: isAuth,

};

// const auth = async(req, res, next) => {
//     try {
//         const token = req.header['authorization'].replace('Bearer ', '')
//         console.log('snjfjewnf')
//         const decoded = jwt.verify(token, "myverysecretkey")
//         const user = await db.User.findOne({ where: {userId: decoded.userId }})
//         console.log(user)
//
//         if(!user) {
//             throw new Error()
//         }
//         req.token = token
//         req.user = user
//         next()
//     } catch(error) {
//         res.status(400).send(error.message);
//     }
// }
//
