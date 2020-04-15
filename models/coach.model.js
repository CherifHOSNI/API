
function modelDefinition(Sequelize) {
    return {
        coach_id: {
            type: Sequelize.INTEGER,
            primaryKey: true ,
            autoIncrement: true
        },
        coachname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        coachbirthdate: {
            type: Sequelize.DATE,
        },
        coachstats: {
            type: Sequelize.INTEGER,
        },

    }
}


module.exports = (sequelize, Sequelize) => {
    const Coach = sequelize.define("coachs", modelDefinition(Sequelize),
        { timestamps: false}
        );

    return Coach;
};