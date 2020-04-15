
function modelDefinition(Sequelize) {
    return {
        competition_id: {
            type: Sequelize.INTEGER,
            primaryKey: true ,
            autoIncrement: true
        },
        competitionname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        countryname: {
            type: Sequelize.STRING,
            allowNull: false
        }

    }
}


module.exports = (sequelize, Sequelize) => {
    const Competition = sequelize.define("competitions", modelDefinition(Sequelize),
        { timestamps: false}
        );

    return Competition;
};