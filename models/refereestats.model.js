function modelDefinition(Sequelize) {
    return {
        refereestats_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
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
        }
    }
}

module.exports = (sequelize, Sequelize) => {
    const RefereeStat = sequelize.define("refereestats", modelDefinition(Sequelize),
        { timestamps: false}
        );

    return RefereeStat;
};