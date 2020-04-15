
function modelDefinition(Sequelize) {
    return {
        referee_id: {
            type: Sequelize.INTEGER,
            primaryKey: true ,
            autoIncrement: true
        },
        refereename: {
            type: Sequelize.STRING,
            allowNull: false
        },
        refereebirthdate: {
            type: Sequelize.DATE,
        },

    }
}


module.exports = (sequelize, Sequelize) => {
    const Referee = sequelize.define("referees", modelDefinition(Sequelize),
        { timestamps: false}
        );

    return Referee;
};