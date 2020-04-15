
var moment = require('moment');
function modelDefinition(Sequelize) {
    return {
        game_id: {
            type: Sequelize.INTEGER,
            primaryKey: true ,
            autoIncrement: true
        },
        datetime: {
            type: Sequelize.DATE,
            allowNull: false,

        },
        //virtual column
        date: {
            type: Sequelize.VIRTUAL,
            get: function() {
                return moment.utc(this.getDataValue('datetime')).format('YYYY-MM-DD');
            }
        },

        // It is possible to create foreign keys:
        homeTeam_id: {
            type: Sequelize.INTEGER,
            references: {
                // This is a reference to another model
                model: 'teams',
                // This is the column name of the referenced model
                key: 'team_id',
                // This declares when to check the foreign key constraint. PostgreSQL only.
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
                allowNull: false
            }
        },
        awayTeam_id: {
            type: Sequelize.INTEGER,
            references: {
                // This is a reference to another model
                model: 'teams',
                // This is the column name of the referenced model
                key: 'team_id',
                // This declares when to check the foreign key constraint. PostgreSQL only.
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
                allowNull: false
            }
        },
        referee_id: {
            type: Sequelize.INTEGER,
            references: {
                // This is a reference to another model
                model: 'referees',
                // This is the column name of the referenced model
                key: 'referee_id',
                // This declares when to check the foreign key constraint. PostgreSQL only.
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
                allowNull: false
            }
        },


    }
}



module.exports = (sequelize, Sequelize) => {
    const Game = sequelize.define("games", modelDefinition(Sequelize),
        { timestamps: false}
        );

    return Game;
};