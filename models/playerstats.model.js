function modelDefinition(Sequelize) {
    return {
        playerstats_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        player_id: {
            type: Sequelize.INTEGER,
            references: {
                // This is a reference to another model
                model: 'players',
                // This is the column name of the referenced model
                key: 'player_id',
                // This declares when to check the foreign key constraint. PostgreSQL only.
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
                allowNull: false
            }
        }
    }
}

module.exports = (sequelize, Sequelize) => {
    const PlayerStat = sequelize.define("playerstats", modelDefinition(Sequelize),
        { timestamps: false}
        );

    return PlayerStat;
};