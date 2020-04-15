const db = require("../models/index");
const Odds = db.odds;
const Op = db.Sequelize.Op;

exports.index = (req, res) => {
    res.status(200).send("this is odds area.");
};


exports.oddPerGame = (req, res) => {

    if(!req.query.game_id || isNaN(req.query.game_id)){
        return res.status(404).send({ message: "Error Game id format" });
    }

    Odds.findAll({
        attributes: ['game_id', 'plateformename', 'HomeWinCote', 'DrawCote','AwayWinCote', 'HomeWinDraw', 'HomeWinAwayWin',
        'AwayWinDraw', 'DNB_HomeWin', 'DNB_AwayWin', 'Over05', 'Under05', 'Over15', 'Under15', 'Over25', 'Under25', 'Over35',
        'Under35', 'Over45', 'Under45', 'Over55', 'Under55', 'BothTeamScoreYes', 'BothTeamScoreNo'],
        where: {
            game_id : req.query.game_id
        }

    })
        .then(odds => {
            if (odds.length == 0) {
                return res.status(404).send({ message: "No odds where found" });
            }else{
                return res.status(200).send(odds);
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};






