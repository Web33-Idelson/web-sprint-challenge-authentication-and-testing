
const request = require("supertest");
const server = require("../api/server.js");


const db = require("../database/dbConfig.js");

describe("jokes router", () => {
    beforeEach(async () => {
        await db("users").truncate();
    })

    describe("GET /jokes", () => {
        it("should be defined", async () => {
            await request(server).get("/api/jokes")
            .then(res => {
                expect(res.body).toBeDefined();
            })
        })
        it("should send 401", async () => {
            await request(server).get("/api/jokes")
            .then(res => {
                expect(res.status).toBe(401);
            })
        })
    })
})