function modelDefinition(Sequelize) {
    return {
        coachstats_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        coach_id: {
            type: Sequelize.INTEGER,
            references: {
                // This is a reference to another model
                model: 'coachs',
                // This is the column name of the referenced model
                key: 'coach_id',
                // This declares when to check the foreign key constraint. PostgreSQL only.
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
                allowNull: false
            }
        }
    }
}

module.exports = (sequelize, Sequelize) => {
    const CoachStat = sequelize.define("coachstats", modelDefinition(Sequelize),
        { timestamps: false}
        );

    return CoachStat;
};