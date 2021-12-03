module.exports = (sequelize, DataTypes) => {
    const List = sequelize.define('List',  {
        listId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        //there is errro to fix

        userId: {
            type: DataTypes.STRING(1000),
            allowNull: false,
            references: {
                model: 'User',
                key: 'userId'
            },
            field: 'userId'
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
        List.belongsTo(models.User, {foreignKey: 'userId', as: 'user'})
    }

    return List
}
