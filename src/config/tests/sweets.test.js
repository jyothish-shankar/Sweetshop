const request = require('supertest');
const app = require('../app');
const { sequelize, User, Sweet } = require('../models');

let customerToken;
let adminToken;
let adminUser;
let customerUser;

beforeAll(async () => {
  await sequelize.sync({ force: true });
  
  // Create users and get tokens
  await request(app).post('/api/auth/register').send({ username: 'admin', password: 'password123' });
  adminUser = await User.findOne({ where: { username: 'admin' } });
  adminUser.role = 'admin';
  await adminUser.save();

  await request(app).post('/api/auth/register').send({ username: 'customer', password: 'password123' });
  customerUser = await User.findOne({ where: { username: 'customer' } });

  const adminRes = await request(app).post('/api/auth/login').send({ username: 'admin', password: 'password123' });
  adminToken = adminRes.body.token;

  const customerRes = await request(app).post('/api/auth/login').send({ username: 'customer', password: 'password123' });
  customerToken = customerRes.body.token;
});

afterAll(async () => {
  await sequelize.close();
});

describe('Sweets API', () => {
  beforeEach(async () => {
    await Sweet.destroy({ where: {} });
  });

  // POST /api/sweets
  it('should allow an admin to add a new sweet', async () => {
    const res = await request(app)
      .post('/api/sweets')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Laddu', category: 'Classic', price: 1.5, quantity: 100 });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('name', 'Laddu');
  });

  it('should not allow a customer to add a new sweet', async () => {
    const res = await request(app)
      .post('/api/sweets')
      .set('Authorization', `Bearer ${customerToken}`)
      .send({ name: 'Jalebi', category: 'Syrupy', price: 2.0, quantity: 50 });
    
    expect(res.statusCode).toEqual(403);
  });

  // GET /api/sweets
  it('should get a list of all sweets', async () => {
    await Sweet.create({ name: 'Laddu', category: 'Classic', price: 1.5, quantity: 100 });
    const res = await request(app)
      .get('/api/sweets')
      .set('Authorization', `Bearer ${customerToken}`);
      
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('Laddu');
  });

  // POST /api/sweets/:id/purchase
  it('should allow a user to purchase a sweet', async () => {
    const sweet = await Sweet.create({ name: 'Barfi', category: 'Milk', price: 2.5, quantity: 10 });
    const res = await request(app)
      .post(`/api/sweets/${sweet.id}/purchase`)
      .set('Authorization', `Bearer ${customerToken}`);
      
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Purchase successful');
    const updatedSweet = await Sweet.findByPk(sweet.id);
    expect(updatedSweet.quantity).toBe(9);
  });

  it('should return an error if trying to purchase an out-of-stock sweet', async () => {
    const sweet = await Sweet.create({ name: 'Barfi', category: 'Milk', price: 2.5, quantity: 0 });
    const res = await request(app)
      .post(`/api/sweets/${sweet.id}/purchase`)
      .set('Authorization', `Bearer ${customerToken}`);
      
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Sweet is out of stock');
  });

  // DELETE /api/sweets/:id
  it('should allow an admin to delete a sweet', async () => {
    const sweet = await Sweet.create({ name: 'Gulab Jamun', category: 'Syrupy', price: 1.0, quantity: 20 });
    const res = await request(app)
      .delete(`/api/sweets/${sweet.id}`)
      .set('Authorization', `Bearer ${adminToken}`);
      
    expect(res.statusCode).toEqual(204);
  });

  it('should not allow a customer to delete a sweet', async () => {
    const sweet = await Sweet.create({ name: 'Gulab Jamun', category: 'Syrupy', price: 1.0, quantity: 20 });
    const res = await request(app)
      .delete(`/api/sweets/${sweet.id}`)
      .set('Authorization', `Bearer ${customerToken}`);
      
    expect(res.statusCode).toEqual(403);
  });
});