const request = require("supertest");

const server = require("../api/server");

const db = require("../database/dbConfig");

describe("auth router", () => {
    beforeEach(async () =>{
        await db("users").truncate();
    })

    describe("POST /register", () => {
        it("should add users", async () => {
            const res = await request(server).post("/api/auth/register").send({
                username:"joseph",
                password:"pass"
            });
            
            const users = await db("users");
            expect(users).toHaveLength(1);
            expect(res.status).toBe(201);
        })

        it("should return json", async () => {
            await request(server)
                .post("/api/auth/register").send({
                username:"joey",
                password:"pass"
                })
                .then(res => {
                    expect(res.type).toMatch(/json/i)
                })
        })
    })
    describe("POST /login", () => {
        it("should return 200", async done => {
            await request(server).post("/api/auth/register").send({
                username:"jo jo",
                password:"pass"
            });
            
            await request(server)
                .post("/api/auth/login").send({
                    username:"jo jo",
                    password:"pass"
                })
                .then(res => {
                    expect(res.status).toBe(200);
                    done();
                });
        })
        it("should contain a message", async () => {
            await request(server)
                .post("/api/auth/register").send({
                username:"mojoejojo",
                password:"pass"
                })

            await request(server)
                .post("/api/auth/login").send({
                username:"mojoejojo",
                password:"pass"
                })
                .then(res => {
                    const expected = {message: "welcome to the API"}
                 
                    expect(res.body).toMatchObject(expected)
                })
        })
    })
})