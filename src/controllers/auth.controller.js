const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const jwt = require('jsonwebtoken');
const db = require('../db/models')
const User = db.User;
const auth = require('../_middleware/auth')
const bcrypt = require('bcrypt')

exports.authenticateSchema = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

exports.login = async(req, res, next) => {
    try {
        const user = await db.User.findOne({where: {username: req.body.username}});
        if (user) {
            const password_valid = await bcrypt.compare(req.body.password, user.password);
            if (password_valid) {
                let token = jwt.sign({ userId: user.userId, username: user.username, firstName: user.firstName, lastName: user.lastName, password: user.password}, 'thisismyverysecretkey', {
                    expiresIn: 60 * 60 * 5,
                });
                console.log(token)
              res.status(200).json({user, token})
            } else {
                res.status(400).json({error: "password incorrect"});
            }
        }

    } catch(error) {
       res.status(400).send(error.message)
    }



}

exports.registerSchema = (req, res, next) => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required().min(6).max(20)
    });
    validateRequest(req, next, schema);
}

exports.register = async(req, res, next) => {
    try {
        const usernameExists = await User.findOne({where: {username: req.body.username}});
        if (usernameExists) {
            return res.status(400).send({error: "username already in use"});
        }
    } catch(error) {
        return res.status(400).send({error: 'Something went wrong'})
    }
    const user = new User(req.body)

    try  {
        await user.save()
        res.status(201).send(user)
    } catch(error) {
        res.status(404).send({message: error.message});
    }
}


// const logout = async(req,res,next) => {
//     try {
//         req.logout()
//     }
// }
