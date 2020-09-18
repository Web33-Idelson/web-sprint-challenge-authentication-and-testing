const request = require('supertest');
const server = require('../api/server.js');
const db = require('../database/dbConfig.js');

describe("auth router", () => {
    beforeEach(async () => {
        await db("users").truncate();
    })

    describe("POST /register", () => {
        it("should add users", async () => {
            const res = await request(server).post("/api/auth/register").send({
                username: "joseph",
                password: "pass"
            })
            const users = await db("users")
            expect(users).toHaveLength(1)
        })
    })
})