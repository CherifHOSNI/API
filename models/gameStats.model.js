function modelDefinition(Sequelize) {
    return {
        gamestats_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
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
        HomeGoalsNumber: {
            type: Sequelize.INTEGER,
        },
        AwayGoalsNumber: {
            type: Sequelize.INTEGER,
        },
        Home_Team_Shots: {
            type: Sequelize.INTEGER,
        },
        Away_Team_Shots: {
            type: Sequelize.INTEGER,
        },
        Home_Team_Shots_on_Target: {
            type: Sequelize.INTEGER,
        },
        Away_Team_Shots_on_Target: {
            type: Sequelize.INTEGER,
        },
        Attendance: {
            type: Sequelize.INTEGER,
        },
        Home_Team_Hit_Woodwork: {
            type: Sequelize.INTEGER,
        },
        Away_Team_Hit_Woodwork: {
            type: Sequelize.INTEGER,
        },
        Home_Team_Corners: {
            type: Sequelize.INTEGER,
        },
        Away_Team_Corners: {
            type: Sequelize.INTEGER,
        },
        Home_Team_Fouls_Committed: {
            type: Sequelize.INTEGER,
        },
        Away_Team_Fouls_Committed: {
            type: Sequelize.INTEGER,
        },
        Home_Team_Free_Kicks_Conceded: {
            type: Sequelize.INTEGER,
        },
        Away_Team_Free_Kicks_Conceded: {
            type: Sequelize.INTEGER,
        },
        Home_Team_Offsides: {
            type: Sequelize.INTEGER,
        },
        Away_Team_Offsides: {
            type: Sequelize.INTEGER,
        },
        Home_Team_Yellow_Cards: {
            type: Sequelize.INTEGER,
        },
        Away_Team_Yellow_Cards: {
            type: Sequelize.INTEGER,
        },
        Home_Team_Red_Cards: {
            type: Sequelize.INTEGER,
        },
        Away_Team_Red_Cards: {
            type: Sequelize.INTEGER,
        },
        homeTeamPossession: {
            type: Sequelize.INTEGER,
        },
        awayTeamPossession: {
            type: Sequelize.INTEGER,
        },
        homeTeamGoalAttempts: {
            type: Sequelize.INTEGER,
        },
        awayTeamGoalAttempts: {
            type: Sequelize.INTEGER,
        },
        Home_Team_Shots_off_Target: {
            type: Sequelize.INTEGER,
        },
        Away_Team_Shots_off_Target: {
            type: Sequelize.INTEGER,
        },
        homeTeamBlockedShots: {
            type: Sequelize.INTEGER,
        },
        awayTeamBlockedShots: {
            type: Sequelize.INTEGER,
        },
        homeTeamFreeKicks: {
            type: Sequelize.INTEGER,
        },
        awayTeamFreeKicks: {
            type: Sequelize.INTEGER,
        },
        homeTeamThrowin: {
            type: Sequelize.INTEGER,
        },
        awayTeamThrowin: {
            type: Sequelize.INTEGER,
        },
        homeTeamGoalkeeperSaves: {
            type: Sequelize.INTEGER,
        },
        awayTeamGoalkeeperSaves: {
            type: Sequelize.INTEGER,
        },
        homeTeamTotalPasses: {
            type: Sequelize.INTEGER,
        },
        awayTeamTotalPasses: {
            type: Sequelize.INTEGER,
        },
        homeTeamDangerousAttacks: {
            type: Sequelize.INTEGER,
        },
        awayTeamDangerousAttacks: {
            type: Sequelize.INTEGER,
        },
        homeTeamCompletedPasses: {
            type: Sequelize.INTEGER,
        },
        awayTeamCompletedPasses: {
            type: Sequelize.INTEGER,
        },
        homeTeamAttacks: {
            type: Sequelize.INTEGER,
        },
        awayTeamAttacks: {
            type: Sequelize.INTEGER,
        },
        homeTeamTackles: {
            type: Sequelize.INTEGER,
        },
        awayTeamTackles: {
            type: Sequelize.INTEGER,
        }

    }
}

module.exports = (sequelize, Sequelize) => {
    const GameStat = sequelize.define("gamestats", modelDefinition(Sequelize),
        { timestamps: false,  indexes: [
                {
                    unique: true,
                    fields: ['game_id']
                }
            ]}
        );

    return GameStat;
};