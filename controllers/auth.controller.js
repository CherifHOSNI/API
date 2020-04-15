const db = require("../models/index");
const config = require("../config/auth.config");
const User = db.user;
const mailSend = require('../middlewares/mailSender')
const mailOptions = require('../config/mailer.config').mailOptions
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

exports.signup = (req, res) => {
    // Save User to Database
    User.create({
        username: req.body.username,
        email: req.body.email,
        role: req.body.role,
        prenom: req.body.prenom,
        nom: req.body.nom,
        password: req.body.password
    })
        .then(user => {

            let payload = {
                id: user.id,
                username: user.username,
                email: user.email,
                roles: user.role,
                nom: user.nom,
                prenom: user.prenom,
                acesslevel : "API"
            }

            let token = jwt.sign({ payload: payload}, config.secret, {
                expiresIn: config.neverExpiration
            });


            let mail = {
                from: 'noreplay-sports-data-analytica@gmail.com',
                replyTo: 'noreply.sports-data-analytica@gmail.com',
                to: user.email,
                subject: 'subscription to sports data analytica',
                html: mailSend.htmlWelcomeMessage(token, payload)
            }

            mailSend.sender(mail);

            res.send({ message: "User was registered successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.signin = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }


            user._modelOptions.instanceMethods.comparePasswords(req.body.password, user.password,function (error, isMatch) {

                if(isMatch && !error){
                    var payload = {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        roles: user.role,
                        nom: user.nom,
                        prenom: user.prenom,
                        acesslevel : "FRONT"
                    }

                    var token = jwt.sign({ payload: payload}, config.secret, {
                        expiresIn: config.expiration
                    });

                    res.status(200).send({success: true, token: token});
                }else{
                    return res.status(401).send({
                        accessToken: null,
                        message: "Invalid Password!"
                    });
                }
            })

        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};
