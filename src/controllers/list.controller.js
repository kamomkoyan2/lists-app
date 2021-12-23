const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const db = require('../db/models')
const List = db.List;
const User = db.User

exports.createList = async(req, res, next) => {
    try {
        const list = new List({
            ...req.body,
            userId: req.user.userId
        })

        await list.save()
        res.status(201).json(list)
    } catch (error) {
       return  res.status(400).send(error.message)
    }
}


exports.getListById = async (req,res,next) => {
    const id = req.params.id;
    console.log(id)
    try {
        const list = await db.List.findByPk(id, {userId: req.user.userId});
        if (!list) {
             return res.status(401).json({error: "there is no list with given id"});
        }
        res.status(200).json(list)
    } catch(error) {
        res.status(500).send(error.message)
    }
}

exports.getLists = async(req,res,next) => {
    List.findAll({where: {userId: req.user.userId}}).then(lists => res.json(lists)).catch((error) => {
        console.log(error.message)
    })

}

exports.updateList = async(req, res, next) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'content'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
        if (!isValidOperation){
            return res.status(400).send('Invalid updates!')
        }
        const id = req.params.id;
        try {
            const list = await List.findByPk(id, {where: {id: req.user.userId}})
            if (list.userId !== req.user.userId){
                return res.status(401).json({error: {
                    message: `you can only update your own list, you haven't list with provided id - ${id}`
                }})
            } 

            updates.forEach((update) => list[update] = req.body[update])
            await list.save()
            res.send(list)
        }
        catch(error) {
            res.status(500).send(error.message)
        }
    }


    exports.deleteList = async(req,res, next) => {
        // const id = req.params.id
        // db.List.findByPk(id)
        // .then(resultToDelete => {
        //     console.log(resultToDelete)
        //     resultToDelete.destroy(id);
        // })
        // .then(result => {
        //     return res.status(200).json('Successfuly deleted record')
        // })
        // .catch((error) => {
        //     res.status(400).json(error.message)
        // })


        try {
            const list = await db.List.destroy({where: {listId: req.params.id}}).then((function (deletedRecord) {
                if (deletedRecord === 1) {
                    res.status(200).json({message: 'Deleted Successfuly'})
                }
            }))

            if (!list) {
                return res.status(404).send()
            }
        } catch(error) {
            res.status(500).send(error.message)
        }
    }

