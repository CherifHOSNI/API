const  authJwt  = require("../middlewares/authJwt");
const controller = require("../controllers/user.controller");

module.exports = function(app, passport) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/test/all", controller.allAccess);

    app.get(
        "/api/test/free",
        [passport.authenticate('jwt', {session: false})],
        controller.userBoard
    );

    app.get(
        "/api/test/pro",
        [passport.authenticate('jwt', {session: false}), authJwt.isTokenAPI],
        controller.moderatorBoard
    );

    app.get(
        "/api/test/ultra",
        [passport.authenticate('jwt', {session: false}), authJwt.isTokenAPI],
        controller.adminBoard
    );

    app.get(
        "/api/test/mega",
        [passport.authenticate('jwt', {session: false}), authJwt.isTokenAPI],
        controller.adminBoard
    );

    app.get(
        "/api/test/all",
        [passport.authenticate('jwt', {session: false}), authJwt.isTokenAPI],
        controller.adminBoard
    );

    app.get(
        "/api/test/admin",
        [passport.authenticate('jwt', {session: false}), authJwt.isTokenAPI],
        controller.adminBoard
    );


};
