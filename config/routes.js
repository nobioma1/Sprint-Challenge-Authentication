const axios = require('axios');

const { authenticate } = require('../auth/authenticate');
const { addUser, getUserByUsername } = require('../database/models');

module.exports = server => {
  server.post('/api/register', validateUser, register);
  server.post('/api/login', validateUser, checkUser, login);
  server.get('/api/jokes', authenticate, getJokes);
};

function validateUser(req, res, next) {
  const { body } = req;
  const hasRequiredFields = 'username' && 'password' in body;

  if (hasRequiredFields) {
    return next();
  }
  return res.status(400).json({
    message: 'Fields username, password are Required ',
  });
}

async function checkUser(req, res, next) {
  try {
    if ('username' && 'password' in req.body) {
      const user = await getUserByUsername(req.body.username);
      if (!user) {
        return res
          .status(404)
          .json({ message: 'User with username does not exist' });
      }
      req.user = user;
      return next();
    }
    return res
      .status(400)
      .json({ message: 'Username and Password is required' });
  } catch (error) {
    return res.status(500).json({ error: 'Server Error' });
  }
}

async function register(req, res) {
  const user = req.body;
  try {
    const newUser = await addUser(user);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Error Creating User' });
  }
}

function login(req, res) {
  // implement user login
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
