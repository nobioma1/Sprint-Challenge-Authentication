const brcypt = require('bcryptjs');
const db = require('./dbConfig');

function getUserById(id) {
  return db('users')
    .select('id', 'username')
    .where({ id })
    .first();
}

function getUserByUsername(username) {
  return db('users')
    .where({ username })
    .first();
}

function addUser({ username, password }) {
  const user = {
    username,
    password: brcypt.hashSync(password),
  };
  return db('users')
    .insert(user)
    .then(([id]) => getUserById(id));
}

module.exports = { addUser, getUserByUsername };
