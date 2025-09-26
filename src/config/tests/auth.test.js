const request = require('supertest');
const app = require('../app');
const { sequelize, User } = require('../models');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Auth Endpoints', () => {
  beforeEach(async () => {
    await User.destroy({ where: {} });
  });

  // Test for Registration
  it('should register a new user successfully', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        password: 'password123',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User registered successfully');
  });

  it('should not register a user with an existing username', async () => {
    await User.create({ username: 'testuser', password: 'password123' });
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        password: 'password123',
      });
    expect(res.statusCode).toEqual(409);
    expect(res.body).toHaveProperty('message', 'Username already exists');
  });

  // Test for Login
  it('should log in an existing user and return a token', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({ username: 'loginuser', password: 'password123' });

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'loginuser',
        password: 'password123',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should not log in with incorrect password', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({ username: 'loginuser', password: 'password123' });

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'loginuser',
        password: 'wrongpassword',
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message', 'Invalid credentials');
  });
});