module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      commentId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      body: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "user_comments",
    }
  );

  Comment.associate = (models) => {
    Comment.belongsTo(models.User, { foreignKey: "userId", as: "user" });
  };
  return Comment;
};
