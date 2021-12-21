module.exports = (sequelize, DataTypes) => {
    const List = sequelize.define('List',  {
        listId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        title: {
            type: DataTypes.STRING,

        },
        content: {
            type: DataTypes.STRING
        },
    },
        {
            tableName: 'user_lists',
        }
        );

    List.associate = models => {
        List.belongsTo(models.User, {foreignKey: 'userId', as: 'list'})
    }

    return List
}
