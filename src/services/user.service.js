const bcrypt = require("bcryptjs");
const db = require("../db/models");

const getAll = async () => {
  return await db.User.findAll();
};

const getById = async (id) => {
  return await getUser(id);
};

const update = async (id, params) => {
  const user = await getUser(id);

  // validate
  const usernameChanged = params.username && user.username !== params.username;
  if (
    usernameChanged &&
    (await db.User.findOne({ where: { username: params.username } }))
  ) {
    throw 'Username "' + params.username + '" is already taken';
  }

  // hash password if it was entered
  if (params.password) {
    params.password = await bcrypt.hash(params.password, 10);
  }

  // copy params to user and save
  Object.assign(user, params);
  await user.save();

  return omitHash(user.get());
};

const _delete = async (id) => {
  const user = await getUser(id);
  await user.destroy();
};

// helper functions

const getUser = async (id) => {
  const user = await db.User.findByPk(id);
  if (!user) throw "User not found";
  return user;
};

const omitHash = async (user) => {
  const { password, ...userWithoutHash } = user;
  return userWithoutHash;
};

module.exports = {
  getAll,
  getById,
  update,
  delete: _delete,
};
