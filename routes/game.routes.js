const  authJwt  = require("../middlewares/authJwt");
const controller = require("../controllers/game.controller");

module.exports = function(app, passport) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/game/area", controller.index);

    app.get(
        // format /api/game?date=yyyy-mm-dd
        "/api/game/",
        [passport.authenticate('jwt', {session: false}),  authJwt.isTokenAPI],
        controller.GamesPerDate
    );
    app.get(
        "/api/game/:id",
        [passport.authenticate('jwt', {session: false}),  authJwt.isTokenAPI],
        controller.oneGamePerID
    );



};
