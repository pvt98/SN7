const models = require("../models");
const fs = require('fs');

// creation d'un commentaire = ok
exports.createComment = async (req, res) => {
    try {
        var newCom = {
            content: req.body.content,
            messageId: req.body.messageId,
            userId: req.body.userId,
        };
        if (!newCom) {
            throw new Error(" parametre manquant ");
        }
        models.Comment.create(newCom)
        .then(data => {
            res.status(200).json({ data });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || " problème à la création du commentaire "
            });
        }); 
    } catch (err) {
        res.status(400).json({message:  "impossible de créer le commentaire" });
    }
};

// recupérer les commentaires = ok
exports.getComments = async (req, res) => {
    try {
        var order = req.query.order;

        var comments = await models.Comment.findAll({
        attributes: ['id', 'content', 'userId', 'messageId', 'createdAt'],
        where: { messageId: req.params.id },
        include: [{
            model: models.User,
            attributes: [ 'username' ]
        }],
        order: [ order != null ? order.split(':') : ['createdAt', 'DESC']]
        });
        if (!comments) {
            throw new Error ('pas de commentaires');
        } else {
            res.status(200).send({ comments });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// supprimer un commentaire = ok
exports.deleteComment = async (req, res) => {
    try {
        var findComment = await models.Comment.findOne({
            attributes: ['id', 'content', 'userId', 'messageId'],
            where: { id: req.params.idcom}
        });
        if (!findComment) {
            throw new Error('commentaire introuvable');
        } else {
            await models.Comment.destroy({
                where: { id: req.params.idcom }
            })
            .then(function(){
                res.status(200).json({ message: 'Commentaire supprimé'});
            })
            .catch(function(err) {
                res.status(400).json({ message: 'Impossible de supprimer ce commentaire' });
            })
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};