const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const models = require("../models");

// REGEX
const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const password_regex = /^(?=.*\d).{4,8}$/;

// inscription = ok
exports.signup = async (req, res) => {

    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;

    try {
        if (email == null || username == null || password == null) {
            throw new Error("parametre manquant");
        }
    
   
        if (username.length >= 15 || username.length <= 4) {
            throw new Error("erreur le username doit contenir entre 4 et 15 carac");
        }
    
        if (!email_regex.test(email)) {
            throw new Error('email invalide');
        }
    
        if (!password_regex.test(password)) {
            throw new Error('erreur le mdp doit contenir entre 4 et 8 carac et posséder au moins 1 chiffres');
        }
    
 
        var alreadyExist = await models.User.findOne({
            attributes: ['email'],
            where: { email: email }
        });
        if(alreadyExist) {
            throw new Error('email deja utilisé')
        } else {
            var newUser = await models.User.create({
                email: email,
                username: username,
                password: await bcrypt.hash(password, 5),
                isAdmin: 0
            });
            if (newUser) {
                return res.status(201).json({
                    'userId': newUser.id
                });
            } else { 
                throw new Error('création du compte impossible');
            }
        };
    } catch (error) {
        res.status(400).json({ error: error.message});
    }
};

// connexion = ok
exports.login = async (req, res) => {
  
    var email = req.body.email;
    var password = req.body.password;

    try{
    
        if (email == null || password == null) {
            throw new Error("parametre manquant");
        }

        var findUser = await models.User.findOne({
            where: { email: email }
        });
        if (!findUser) {
            throw new Error("mdp ou mail invalide");
        } else {
            bcrypt.compare(req.body.password, findUser.password)
            .then(valid => {
                if (!valid) {
                    throw new Error('le mdp ne correspond pas')
                }
                res.status(200).json({
                    userId: findUser.id,
                    token: jwt.sign(
                        { userId: findUser.id},
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '6h'}
                    )
                });
            })
            .catch(error => res.status(500).json({ error }));
        }
    } catch (error) {
        res.status(400).json({ error: error.message});
    }
};

// recuperer un profil = ok
exports.getProfile = async (req, res) => {
    try {
        if (req.headers && req.headers.authorization) {
          var authorization = req.headers.authorization.split(' ')[1],
            decoded;
          try {
            decoded = jwt.verify(authorization, 'RANDOM_TOKEN_SECRET');
          } catch (e) {
            return res.status(401).send('non autorisé');
          }
          var userId = decoded.userId;
          models.User.findOne({
                attributes: [ 'id', 'email', 'username', 'isAdmin' ],
                where: { id: userId }
            }).then(function (user) {
            return res.status(200).json(user);
          })
            .catch(err => {
              res.status(500).json({ message: err.message })
            });
        }
      }
      catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

// supprimer un profil = ok
exports.deleteProfile = async (req, res) => {
    try {
    
        if (req.headers && req.headers.authorization) {
          var authorization = req.headers.authorization.split(' ')[1],
            decoded;
          try {
            decoded = jwt.verify(authorization, 'RANDOM_TOKEN_SECRET');
          } catch (e) {
            return res.status(401).send('non autorisé');
          }
          var userId = decoded.userId;
          var getUser = await models.User.findOne({
              where: { id: userId } 
            })
          if (!getUser) {
            throw new Error("User introuvable");
          } else {
            models.User.destroy({
                where: { id: userId }
            })
            .then(function () {
                return res.status(200).json('User supprimé');
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
              });
          }
        }
      }
      catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

// sauvegarder un profil = ok
exports.updateProfile = async (req, res) => {
    
    var email = req.body.email;
    var username = req.body.username;

    try {
        if (req.headers && req.headers.authorization) {
            var authorization = req.headers.authorization.split(' ')[1],
              decoded;
            try {
              decoded = jwt.verify(authorization, 'RANDOM_TOKEN_SECRET');
            } catch (e) {
              return res.status(401).send('non autorisé');
            }
            var userId = decoded.userId;
            var getUser = await models.User.findOne({
                attributes: ['id', 'email', 'username'],
                where: { id: userId } 
              })
            if (!getUser) {
              throw new Error("User introuvable");
            } else {
              models.User.update({
                  email: email,
                  username: username,
              },
              { where: { id: userId }
            })
              .then(function () {
                  return res.status(200).json('Datas mis a jour');
              })
              .catch(err => {
                  res.status(500).json({ message: 'les infos ne peuvent pas etre mis a jour' });
                });
            }
          }
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};