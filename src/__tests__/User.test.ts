//Teste de Integração
import request from 'supertest';
import { app } from '../app';

import createConnection from '../database';

describe("Users", () => {

    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    it("Should be able to create a new user", async () => {
        const response = await request(app)
        .post("/users")
        .send({
            email: "user@exemplo.com",
            name: "User Example"
        });

        expect(response.status).toBe(201);
    });

    it("Should not be able to create a user with the same email address as an already registered user", async () => {
        const response = await request(app)
        .post("/users")
        .send({
            email: "user@exemplo.com",
            name: "User Example"
        });

        expect(response.status).toBe(400);
    });

    
})