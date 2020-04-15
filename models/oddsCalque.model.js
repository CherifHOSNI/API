
function modelDefinition(Sequelize) {
    return {
        game_id: {
            type: Sequelize.INTEGER,
            primaryKey: true ,
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
        HomeWinCote: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        DrawCote: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        AwayWinCote: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        HomeWinDraw: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        HomeWinAwayWin: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        AwayWinDraw: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        DNB_HomeWin: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        DNB_AwayWin: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        Over05: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        Under05: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        Over15: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        Under15: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        Over25: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        Under25: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        Over35: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        Under35: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        Over45: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        Under45: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        Over55: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        Under55: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        BothTeamScoreYes: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        BothTeamScoreNo: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },



    }
}

//Hashes the password for a user object

module.exports = (sequelize, Sequelize) => {
    const oddsCalque = sequelize.define("oddsCalque", modelDefinition(Sequelize),
        { timestamps: false, indexes: [
                {
                    unique: true,
                    fields: ['game_id']
                }
            ]}
        );

    return oddsCalque;
};