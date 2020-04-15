function modelDefinition(Sequelize) {
    return {
        competitionstats_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        competition_id: {
            type: Sequelize.INTEGER,
            references: {
                // This is a reference to another model
                model: 'competitions',
                // This is the column name of the referenced model
                key: 'competition_id',
                // This declares when to check the foreign key constraint. PostgreSQL only.
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
                allowNull: false
            }
        }
    }
}

module.exports = (sequelize, Sequelize) => {
    const CompetitionStat = sequelize.define("competitionstats", modelDefinition(Sequelize),
        { timestamps: false}
        );

    return CompetitionStat;
};