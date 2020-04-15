var config = require('../config/roles.config')
var bcrypt = require('bcrypt')



function modelDefinition(Sequelize) {
    return {
        username: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        nom: {
            type: Sequelize.STRING,
            allowNull: false
        },
        prenom: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        role:{
            type: Sequelize.INTEGER,
            defaultValue: config.userRoles.guest,
            notIn: [[1,2,4,8,16,32]]
        }
    }
}
var modelOptions = {
    instanceMethods: {
        comparePasswords: comparePasswords
    },
    hooks: {
        beforeValidate: hashPassword
    }
}

//compare two passwords
function comparePasswords(password, userpassword,  callback){
    bcrypt.compare(password, userpassword, function (error, isMatch) {
        if(error){
            return callback(error)
        }
        return callback(null, isMatch)
    })
}

//Hashes the password for a user object
function hashPassword(user){
    if(user.changed('password')){
        return bcrypt.hash(user.password, 10).then(function (password) {
            user.password = password
        })
    }
}

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", modelDefinition(Sequelize) , {
        instanceMethods: {
            comparePasswords: comparePasswords
        },
        hooks: {
            beforeValidate: hashPassword
        },
        timestamps: false
    });

    return User;
};