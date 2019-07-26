const request = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig');

beforeEach(async () => {
  await db('users').truncate();
});

const user = {
  username: 'testingja',
  password: 'test',
};

describe('Routes', () => {
  describe('[POST] /api/register', () => {
    it('should return 201 on success', async () => {
      await request(server)
        .post('/api/register')
        .send(user)
        .expect(201);
    });

    it('should return userId and username on success', async () => {
      const res = await request(server)
        .post('/api/register')
        .send(user);
      expect(res.body).toHaveProperty('id', 1);
      expect(res.body).toHaveProperty('username', user.username);
    });
  });

  describe('[POST] /api/login', () => {
    it('should return 200 on success', async () => {
      await request(server)
        .post('/api/register')
        .send(user);

      await request(server)
        .post('/api/login')
        .send(user)
        .expect(200);
    });

    it('should return message and token on success', async () => {
      await request(server)
        .post('/api/register')
        .send(user);

      const res = await request(server)
        .post('/api/login')
        .send(user);
      expect(res.body).toHaveProperty('message', `Welcome ${user.username}!`);
      expect(res.body).toHaveProperty('token');
    });
  });

  describe('[GET] /api/jokes', () => {

    it('should return 200 on success', async () => {
      await request(server)
        .post('/api/register')
        .send(user);

      const loginRes = await request(server)
        .post('/api/login')
        .send(user);

      await request(server)
        .get('/api/jokes')
        .set('Authorization', loginRes.body.token)
        .expect(200)
    });

    it('should return 401 if no authorization header', async () => {
      await request(server)
        .get('/api/jokes')
        .expect(401)
    });
  });
});
