
function modelDefinition(Sequelize) {
    return {
        player_id: {
            type: Sequelize.INTEGER,
            primaryKey: true ,
            autoIncrement: true
        },
        playername: {
            type: Sequelize.STRING,
        },
        playerbirthdate: {
            type: Sequelize.DATE,
        },
        playerposition: {
            type: Sequelize.STRING,
        }

    }
}


module.exports = (sequelize, Sequelize) => {
    const Player = sequelize.define("players", modelDefinition(Sequelize),
        { timestamps: false}
        );

    return Player;
};