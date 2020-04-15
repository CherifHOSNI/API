const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models/index");
const User = db.user;


isTokenAPI = (req, res, next) => {
    if (req.user.acesslevel=="API") {
        next();
        return;
    }
    res.status(403).send({
        message: "False Token!"
    });
    return;
};

isTokenFront = (req, res, next) => {
    if (req.user.acesslevel=="FRONT") {
        next();
        return;
    }
    res.status(403).send({
        message: "False Token!"
    });
    return;
};

isFREE = (req, res, next) => {
    if (req.user.roles > 0) {
        next();
        return;
    }
    res.status(403).send({
        message: "Permission denied!"
    });
    return;
};

isPRO = (req, res, next) => {
    if (req.user.roles > 1) {
        next();
        return;
    }
    res.status(403).send({
        message: "Permission denied!"
    });
    return;
};

isULTRA = (req, res, next) => {
    if (req.user.roles > 3) {
        next();
        return;
    }
    res.status(403).send({
        message: "Permission denied!"
    });
    return;
};

isMEGA = (req, res, next) => {
    if (req.user.roles > 7) {
        next();
        return;
    }
    res.status(403).send({
        message: "Permission denied!"
    });
    return;
};

isALL = (req, res, next) => {
    if (req.user.roles > 15) {
        next();
        return;
    }
    res.status(403).send({
        message: "Permission denied!"
    });
    return;
};

isADMIN = (req, res, next) => {
    if (req.user.roles > 31) {
        next();
        return;
    }
    res.status(403).send({
        message: "Permission denied!"
    });
    return;
};

const authJwt = {
    isADMIN: isADMIN,
    isALL: isALL,
    isMEGA: isMEGA,
    isULTRA: isULTRA,
    isPRO: isPRO,
    isFREE: isFREE,
    isTokenAPI: isTokenAPI,
    isTokenFront: isTokenFront,
};

module.exports = authJwt;





verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

/*
isModerator = (req, res, next) => {
    console.log(req.user.id)
    User.findByPk(req.user.id).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "moderator") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Require Moderator Role!"
            });
        });
    });
};

isModeratorOrAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "moderator") {
                    next();
                    return;
                }

                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Require Moderator or Admin Role!"
            });
        });
    });
};*/