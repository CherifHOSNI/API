const db = require("../models/index");
const Game = db.game;
const Team = db.team;
const Odds = db.odds;
const gamestat = db.gamestat;
const Op = db.Sequelize.Op;
var moment = require('moment');

exports.index = (req, res) => {
    res.status(200).send("this is game area.");
};

exports.allTeams = (req, res) => {
    Game.findAll( {
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

exports.oneGamePerID = (req, res) => {
    Game.findByPk( req.params.id,{
        attributes: ['game_id', 'datetime', 'homeTeam_id','awayTeam_id'],
        include: [
            {
                model: Team,
                //attributes: ['team_id', 'teamname', 'teamstats'],
            },
            {
                model: Odds,
            },
            {
                model: gamestat,
            }
        ]
    } )
        .then(game => {
            //console.log(game)
            if (!game) {
                return res.status(404).send({ message: "Game not found" });
            }else{
                return res.status(200).send(game);
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.GamesPerDate = (req, res) => {

    let dateparam;

    //validate date format
    if(!ValidateDate(req.query.date)){
        return res.status(404).send({ message: "Error Date format" });
    }else{
        dateparam = ValidateDate(req.query.date);
    }

    Game.findAll( {
        attributes: ['game_id', 'datetime', 'homeTeam_id','awayTeam_id',],
        where: db.Sequelize.where(db.Sequelize.fn('date', db.Sequelize.col('datetime')), '=', dateparam),
        include: [
            {
                model: Team,
                attributes: ['team_id', 'teamname', 'teamstats'],
            },
            {
                model:  Odds,
                //attributes: ['team_id', 'teamname', 'teamstats'],
            },
            {
                model: gamestat,
            }
        ]

    } )
        .then(games => {
            if (games.length == 0) {
                return res.status(404).send({ message: "Game not found" });
            }else{



                games.forEach(game => {

                });


                return res.status(200).send(games);
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};



function ValidateDate(date) {
    if(moment(date, "YYYY-MM-DD").isValid()
    ){
        return moment(date, "YYYY-MM-DD").format("YYYY-MM-DD")
    }
    return  0;
}

function getGetTeamName(id, obj) {
    if(obj.teams[0].team_id == id){
        return obj.teams[0].teamname
    }
    return obj.teams[1].teamname
}