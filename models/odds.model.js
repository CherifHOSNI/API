
function modelDefinition(Sequelize) {
    return {
        odds_id: {
            type: Sequelize.INTEGER,
            primaryKey: true ,
            autoIncrement: true
        },
        game_id: {
            type: Sequelize.INTEGER,
            references: {
                // This is a reference to another model
                model: 'games',
                // This is the column name of the referenced model
                key: 'game_id',
                // This declares when to check the foreign key constraint. PostgreSQL only.
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
                allowNull: false
            }
        },
        plateformename: {
            type: Sequelize.STRING,
            allowNull: false
        },
        HomeWinCote: {
            type: Sequelize.FLOAT,
        },
        DrawCote: {
            type: Sequelize.FLOAT,
        },
        AwayWinCote: {
            type: Sequelize.FLOAT,
        },
        HomeWinDraw: {
            type: Sequelize.FLOAT,
        },
        HomeWinAwayWin: {
            type: Sequelize.FLOAT,
        },
        AwayWinDraw: {
            type: Sequelize.FLOAT,
        },
        DNB_HomeWin: {
            type: Sequelize.FLOAT,
        },
        DNB_AwayWin: {
            type: Sequelize.FLOAT,
        },
        Over05: {
            type: Sequelize.FLOAT,
        },
        Under05: {
            type: Sequelize.FLOAT,
        },
        Over15: {
            type: Sequelize.FLOAT,
        },
        Under15: {
            type: Sequelize.FLOAT,
        },
        Over25: {
            type: Sequelize.FLOAT,
        },
        Under25: {
            type: Sequelize.FLOAT,
        },
        Over35: {
            type: Sequelize.FLOAT,
        },
        Under35: {
            type: Sequelize.FLOAT,
        },
        Over45: {
            type: Sequelize.FLOAT,
        },
        Under45: {
            type: Sequelize.FLOAT,
        },
        Over55: {
            type: Sequelize.FLOAT,
        },
        Under55: {
            type: Sequelize.FLOAT,
        },
        BothTeamScoreYes: {
            type: Sequelize.FLOAT,
        },
        BothTeamScoreNo: {
            type: Sequelize.FLOAT,
        },
        url: {
            type: Sequelize.STRING,
            allowNull: false
        },



    }
}

//Hashes the password for a user object

module.exports = (sequelize, Sequelize) => {
    const Odds = sequelize.define("odds", modelDefinition(Sequelize),
        { timestamps: false, indexes: [
                {
                    unique: true,
                    fields: ['game_id', 'plateformename']
                }
            ]}
        );

    return Odds;
};