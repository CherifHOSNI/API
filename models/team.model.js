
function modelDefinition(Sequelize) {
    return {
        team_id: {
            type: Sequelize.INTEGER,
            primaryKey: true ,
            autoIncrement: true
        },
        identifier: {
            type: Sequelize.INTEGER,
        },
        teamname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        teamstats: {
            type: Sequelize.INTEGER,
        },

    }
}

//Hashes the password for a user object

module.exports = (sequelize, Sequelize) => {
    const Team = sequelize.define("teams", modelDefinition(Sequelize),
        { timestamps: false}
        );

    return Team;
};