const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const db = require('../db/models')
const User = db.User;
const userService = require('../services/user.service');

exports.getAll = (req, res, next) => {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

exports.getUserPosts = async(req, res, next) => {

    try {
        const user = await User.findOne({
            include: [db.List]
        });
        res.send(user)
    } catch(error)  {
        console.log(error)
    }
    // userService.getById(req.params.id)
    //     .then(user => res.json(user))
    //     .catch(next);
}

exports.updateSchema = (req, res, next) => {
    const schema = Joi.object({
        firstName: Joi.string().empty(''),
        lastName: Joi.string().empty(''),
        username: Joi.string().empty(''),
        password: Joi.string().min(6).empty('')
    });
    validateRequest(req, next, schema);
}

exports.updateUser = async(req, res, next) => {
    const updates = Object.keys(req.body);
    console.log(req.body)
    const allowUpdates = ['firstName', 'lastName', 'username', 'password'];
    const isValidOperation = updates.every((update) => allowUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!'});
    }
    try {
        updates.forEach((update) => req.user[update] = req.body[update]);
        console.log(req.user)
        await req.user.save()
    } catch(error) {
        res.status(400).send(error.message)
    }

}

exports._delete = async(req, res, next) => {
 try {
     await req.user.remove()
     res.send(req.user)
 } catch(error) {
     res.status(500).json(error.message)
 }
}
