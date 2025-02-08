const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const createRecipe = require('./createRecipe');
const db = require('../db');

jest.mock('../db');

const app = express();
app.use(bodyParser.json());
app.post('/recipe', createRecipe);

describe('POST /recipe', () => {
  it('should create a new recipe and return 201 status', async () => {
    const mockResult = { insertId: 5 };
    db.query.mockResolvedValue([mockResult]);

    const response = await request(app)
      .post('/recipe')
      .send({ name: 'testjest' });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      message: 'Recette créé avec succès',
      userId: mockResult.insertId,
    });
  });

  it('should return 400 status if name is missing', async () => {
    const response = await request(app)
      .post('/recipe')
      .send({});

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: 'Tous les champs sont requis',
    });
  });

  it('should return 500 status if there is a server error', async () => {
    db.query.mockRejectedValue(new Error('Erreur MySQL'));

    const response = await request(app)
      .post('/recipe')
      .send({ name: 'testjesterror' });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: 'Erreur serveur',
    });
  });
});