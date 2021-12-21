const bcrypt = require("bcrypt");


module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
      },
    },
    {
      hooks: {
        beforeCreate: (User) => {
          const salt = bcrypt.genSaltSync();
          User.password = bcrypt.hashSync(User.password, salt);
        },
      },

      // defaultScope: {
      //     attributes: { exclude: ['password'] },
      // },
      instanceMethods: {
        validPassword: function (password) {
          return bcrypt.compareSync(password, this.password);
        },
      },
    },
    {
      tableName: "users",
    }
  );
  User.associate = (models) => {
    User.hasMany(models.List, {
      foreignKey: "userId", as: "user"
    });
  };

  // User.associate = (models) => {
  //     User.has(models.Image, {
  //         foreignKey: "userId"
  //     })
  // }
  return User;
};
