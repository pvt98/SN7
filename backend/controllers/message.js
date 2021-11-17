const models = require("../models");
const fs = require('fs');

// creer un message = ok
exports.create = async (req, res) => {
    try {
        var findUser = await models.User.findOne({
            where: { id: req.user.id }
        });
        if(!findUser) {
            throw new Error('Votre compte est introuvable');
        };
        console.log(req.file);
        console.log(req.file.filename);
        if (req.file) {
            var attachmentUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
        } else {
            attachmentUrl = null;
        };
        
        var newPost = {
            title: req.body.title,
            content: req.body.content,
            attachment: attachmentUrl,
            likes: 0,
            userId: findUser.id
        };
        if(!newPost) {
            throw new Error(" parametre manquant ");
        }

        models.Message.create(newPost)
        .then(data => {
            res.status(200).json({ data });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "erreur, impossible de creer le message"
            });
        }); 
    } catch (err) {
        res.status(400).json({message: 'message non creer' });
    }
};

// recuperation de tous les messages = ok
exports.getAll = async (req, res) => {
    try{
        var fields = req.query.fields;
		var order = req.query.order;

        var messages = await models.Message.findAll({
            order: [order != null ? order.split(":") : ["createdAt", "DESC"]],
            attributes: fields != "*" && fields != null ? fields.split(",") : null,
            include: [{
                model: models.User,
				attributes: ["username"]
            }]
        });
        if (!messages) {
            throw new Error('pas de message');
        } else {
            res.status(200).json({ messages });
        };
    } catch (err) {
        res.status(400).json({ error: error.message });
    }
};

// recuperation de un message = ok
exports.getOneMessage = async (req, res) => {
    try {
        const getOneMessage = await models.Message.findOne({
            where: { id: req.params.id }
        });
        if (!getOneMessage) {
			throw new Error("impossible de recupererr ce message");
		} else {
            var idMessage = await models.Message.findOne({
                where: { id: req.params.id }
            });
            if (!idMessage) {
                throw new Error("vous ne pouvez pas recuperer ce message");
            } else {
                console.log(idMessage);
                res.status(200).json({ message: idMessage });
            }
        }
    } catch (error) {
		res.status(404).json({ error: error.message });
	}
        
};

////////////////////////////////////////////////////////

// supprimer un message = ok
exports.deleteMessage = async (req, res) => {
    try {
        const getMessage = await models.Message.findOne({
            where: { id: req.params.id }
        });
        if (!getMessage) {
			throw new Error("impossible de supprimer ce message");
		} else {
            var destroyMessage = await models.Message.destroy({
                where: { id: req.params.id }
            });
            if (!destroyMessage) {
                throw new Error("vous ne pouvez pas supprimer ce message");
            } else {
                res.status(200).json({ message: "message supprimé !" });
            }
        }
    } catch (error) {
		res.status(404).json({ error: error.message });
	}
};