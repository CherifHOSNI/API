
var userRoles = {
    FREE: 1,
    PRO: 2,
    ULTRA: 4,
    MEGA: 8,
    ALL: 16,
    ADMIN: 32,
}

var accessLevels = {
    FREE : userRoles.FREE | userRoles.PRO |userRoles.ULTRA | userRoles.MEGA| userRoles.ALL| userRoles.ADMIN ,
    PRO : userRoles.PRO | userRoles.ULTRA | userRoles.MEGA| userRoles.ALL| userRoles.ADMIN,
    ULTRA: userRoles.ULTRA | userRoles.MEGA| userRoles.ALL| userRoles.ADMIN,
    MEGA: userRoles.MEGA | userRoles.ALL| userRoles.ADMIN,
    ALL: userRoles.ALL | userRoles.ADMIN ,
    ADMIN: userRoles.ADMIN,
}

module.exports = {
    userRoles: userRoles,
    accessLevels: accessLevels,
}