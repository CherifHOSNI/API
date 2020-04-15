
var secretKey = require('../config/auth.config').secret
var JWTStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt
var User = require('../models/index').user

function hookJWTStrategy(passport) {
    var options = {};
    options.secretOrKey = secretKey;
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    options.ignoreExpiration = false;



    passport.use(new JWTStrategy(options, function (JWTPayload, callback) {
       // console.log(JWTPayload.payload)
        User.findOne({where: {username : JWTPayload.payload.username }})
            .then(function (user) {
                if(!user){
                    callback(null, false)
                    return;
                }
                callback(null, JWTPayload.payload)

            })
    }))

}

module.exports = hookJWTStrategy;