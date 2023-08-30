const mongoose = require('mongoose');
const request = require('supertest');
const bcrypt = require('bcryptjs');

const { User } = require('../../models');
const app = require('../../app');
const { DB_HOST } = process.env;

describe('test auth route', () => {
  let server;
  beforeAll(() => (server = app.listen(3000)));
  afterAll(() => server.close());
  beforeEach(done => {
    mongoose.connect(DB_HOST).then(() => done());
  });

  test('test signup', async () => {
    const email = 'test@gmail.com';
    const password = '123456';
    const hash = await bcrypt.hash(password, 10);

    await User.create({ email, password: hash });
    const response = await request(app).post('/users/login').send({ email, password });

    const { token, user } = response.body;

    expect(response.statusCode).toBe(200);
    expect(token).not.toBe('');
    expect(Object.keys(user)).toEqual(['email', 'subscription']);
    expect(typeof user.email === 'string').toEqual(true);
    expect(typeof user.subscription === 'string').toEqual(true);

    console.info('Token:', token);
    console.info('email:', user.email);
    console.info('subscription:', user.subscription);
  });
});
