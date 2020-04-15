function modelDefinition(Sequelize) {
    return {
        teamstats_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        team_id: {
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
        }
    }
}

module.exports = (sequelize, Sequelize) => {
    const TeamStat = sequelize.define("teamstats", modelDefinition(Sequelize),
        { timestamps: false}
        );

    return TeamStat;
};