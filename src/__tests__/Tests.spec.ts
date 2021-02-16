import request from 'supertest';
import { validate as isUuid } from 'uuid';
import app from '../app';

import connection from '../database/_test';

beforeAll(async ()=>{
  await connection.create();
});

afterAll(async ()=>{
  await connection.close();
});

describe('Blacklist', () => {
  it('should be able to create a new cpf in blacklist', async () => {
    const response = await request(app).post('/blacklists').send({
      cpf: '74421514691',
    });

    expect(isUuid(response.body.id)).toBe(true);

    expect(response.body).toMatchObject({
      cpf: '74421514691'
    });
  });

  it('should be able to find a new cpf in blacklist', async () => {
    const responseBlock = await request(app).get('/blacklists/74421514691');
    expect(responseBlock.body).toMatchObject({
      status: 'BLOCK'
    });

    const responseFree = await request(app).get('/blacklists/12104444616');
    expect(responseFree.body).toMatchObject({
      status: 'FREE'
    });
  });

  it('should be able to validation cpf in blacklist', async () => {
    const responsePost = await request(app).post('/blacklists').send({
      cpf: '12345678910',
    });
    expect(responsePost.body).toMatchObject({
      status: "error",
      message: "CPF invalid."
    });

    const responseGet = await request(app).get('/blacklists/12345678910');
    expect(responseGet.body).toMatchObject({
      status: "error",
      message: "CPF invalid."
    });

    const responseDelete = await request(app).delete('/blacklists/12345678910');
    expect(responseDelete.body).toMatchObject({
      status: "error",
      message: "CPF invalid."
    });
  });

  it('should be able to remove a new cpf in blacklist', async () => {
    const response = await request(app).delete('/blacklists/74421514691');
    expect(response.status).toEqual(200);
  });
});

describe('Status', () => {
  it('should be able to view status', async () => {
    const response = await request(app).get('/status');

    expect(response.body.count_blacklist).toEqual(1);
    expect(response.body.uptime).toEqual(Math.floor(process.uptime()));
  });
});
