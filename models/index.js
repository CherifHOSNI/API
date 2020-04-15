const config = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,

        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }

);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model")(sequelize, Sequelize);
db.team = require("../models/team.model")(sequelize, Sequelize);
db.teamstats = require("../models/teamstats.model")(sequelize, Sequelize);
db.game = require("../models/game.model")(sequelize, Sequelize);
db.gamestat = require("../models/gameStats.model")(sequelize, Sequelize);
db.competition = require("../models/competition.model")(sequelize, Sequelize);
db.competitionstats = require("../models/competitionstats.model")(sequelize, Sequelize);
db.player = require("../models/player.model")(sequelize, Sequelize);
db.playerstats = require("../models/playerstats.model")(sequelize, Sequelize);
db.odds = require("../models/odds.model")(sequelize, Sequelize);
db.coach = require("../models/coach.model")(sequelize, Sequelize);
db.coachstats = require("../models/coachstats.model")(sequelize, Sequelize);
db.referee = require("../models/referee.model")(sequelize, Sequelize);
db.refereestats = require("../models/refereestats.model")(sequelize, Sequelize);
db.oddsCalque = require("../models/oddsCalque.model")(sequelize, Sequelize);

//MN relationship between game and teams
db.game.belongsToMany(db.team, {
    through: "games_teams",
    foreignKey: "game_id",
    otherKey: "team_id",
    timestamps: false

});
db.team.belongsToMany(db.game, {
    through: "games_teams",
    foreignKey: "team_id",
    otherKey: "game_id",
    timestamps: false
});


//MN relationship between game and player
db.game.belongsToMany(db.player, {
    through: "games_players",
    foreignKey: "game_id",
    otherKey: "player_id",
    timestamps: false

});
db.player.belongsToMany(db.game, {
    through: "games_players",
    foreignKey: "player_id",
    otherKey: "game_id",
    timestamps: false

});

//MN relationship between team and player
db.team.belongsToMany(db.player, {
    through: "teams_players",
    foreignKey: "team_id",
    otherKey: "player_id",
    timestamps: false

});
db.player.belongsToMany(db.team, {
    through: "teams_players",
    foreignKey: "player_id",
    otherKey: "team_id",
    timestamps: false

});


//MN relationship between coach and player
db.coach.belongsToMany(db.player, {
    through: "coach_players",
    foreignKey: "coach_id",
    otherKey: "player_id",
    timestamps: false

});
db.player.belongsToMany(db.coach, {
    through: "coach_players",
    foreignKey: "player_id",
    otherKey: "coach_id",
    timestamps: false

});

//MN relationship between coach and competition
db.coach.belongsToMany(db.competition, {
    through: "coach_competitions",
    foreignKey: "coach_id",
    otherKey: "player_id",
    timestamps: false

});
db.competition.belongsToMany(db.coach, {
    through: "coach_competitions",
    foreignKey: "competition_id",
    otherKey: "coach_id",
    timestamps: false

});

//MN relationship between coach and teams
db.coach.belongsToMany(db.team, {
    through: "coach_teams",
    foreignKey: "coach_id",
    otherKey: "team_id",
    timestamps: false

});
db.team.belongsToMany(db.coach, {
    through: "coach_teams",
    foreignKey: "team_id",
    otherKey: "coach_id",
    timestamps: false

});


//MN relationship between game and player
db.game.belongsToMany(db.odds, {
    through: "games_odds",
    foreignKey: "game_id",
    otherKey: "odds_id",
    timestamps: false

});
db.odds.belongsToMany(db.game, {
    through: "games_odds",
    foreignKey: "odds_id",
    otherKey: "game_id",
    timestamps: false

});


db.game.belongsToMany(db.gamestat, {
    through: "games_gamestats",
    foreignKey: "game_id",
    otherKey: "gamestats_id",
    timestamps: false

});
db.gamestat.belongsToMany(db.game, {
    through: "games_gamestats",
    foreignKey: "gamestats_id",
    otherKey: "game_id",
    timestamps: false

});


db.game.hasOne(db.oddsCalque, {
    foreignKey: 'game_id'
});
db.oddsCalque.belongsTo(db.game, {
    foreignKey: 'game_id'
});


module.exports = db;
