const db = require("../models/index");
const Team = db.team;
const Op = db.Sequelize.Op;

exports.index = (req, res) => {
    res.status(200).send("this is team area.");
};

exports.allTeams = (req, res) => {
    Team.findAll( {
        attributes: ['team_id', 'teamname', 'teamstats']
    } )
        .then(team => {
            if (team.length == 0) {
                return res.status(404).send({ message: "Could not get teams list" });
            }else{
                return res.status(200).send(team);
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.oneTeam = (req, res) => {
    Team.findByPk( req.params.id,{
        attributes: ['team_id', 'teamname', 'teamstats']
    } )
        .then(team => {
            if (team.length == 0) {
                return res.status(404).send({ message: "Team not found" });
            }else{
                return res.status(200).send(team);
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};






