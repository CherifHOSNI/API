const  authJwt  = require("../middlewares/authJwt");
const controller = require("../controllers/odds.controller");

module.exports = function(app, passport) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/odds/index", controller.index);

   /* app.get(
        "/api/odds/all",
        [passport.authenticate('jwt', {session: false}),  authJwt.isTokenAPI],
        controller.allTeams
    );*/
    app.get(
        "/api/odds",
        [passport.authenticate('jwt', {session: false}),  authJwt.isTokenAPI],
        controller.oddPerGame
    );



};
