const mongoose = require('mongoose');
const request = require('supertest');
const bcrypt = require('bcryptjs');

const { User } = require('../../models');
const app = require('../../app');
const { DB_HOST } = process.env;

describe('test auth route', () => {
  let server;

  beforeAll(() => {
    server = app.listen(3000);
  });

  afterAll(() => {
    server.close();
  });

  beforeEach(async () => {
    await mongoose.connect(DB_HOST);
  });

  test('test signup', async () => {
    const email = 'test@gmail.com';
    const password = '123456';
    const hash = await bcrypt.hash(password, 10);

    await User.create({ email, password: hash });
    const response = await request(app).post('/users/login').send({ email, password });

    const { token, user } = response.body;

    expect(response.statusCode).toBe(200);
    expect(token).toBeTruthy();
    expect(Object.keys(user)).toEqual(['email', 'subscription']);
    expect(typeof user.email).toBe('string');
    expect(typeof user.subscription).toBe('string');

    console.info('Token:', token);
    console.info('Email:', user.email);
    console.info('Subscription:', user.subscription);
  });
});
