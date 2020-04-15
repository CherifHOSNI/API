const  authJwt  = require("../middlewares/authJwt");
const controller = require("../controllers/team.controller");

module.exports = function(app, passport) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/team/", controller.index);

    app.get(
        "/api/team/all",
        [passport.authenticate('jwt', {session: false}),  authJwt.isTokenAPI],
        controller.allTeams
    );
    app.get(
        "/api/team/:id",
        [passport.authenticate('jwt', {session: false}),  authJwt.isTokenAPI],
        controller.oneTeam
    );



};
