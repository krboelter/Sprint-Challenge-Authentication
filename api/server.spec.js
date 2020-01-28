const supertest = require("supertest")
const db = require("../database/dbConfig")
const server = require("../index")

beforeEach (async () => {
    await db.seed.run()
})

test("create a new user", async () => {
    const res = await supertest(server).post("/api/auth/register").send({ username: "Amy", password: "12345" })
    const {password} = await db("users").where("id", 3).select("password").first()
    expect(res.status).toBe(201)
    expect(res.type).toBe("application/json")
    expect(res.body).toEqual({
        message: "User has been created",
        newUser: {
            id: 3,
            password: password,
            username: "Amy",
        }
    })
})

test("log in user", async () => {
    const createUser = await supertest(server).post("/api/auth/register").send({ username: "Amy", password: "12345" })
    const res = await supertest(server).post("/api/auth/login").send({ username: "Amy", password: "12345" })

    expect(res.status).toBe(200)
    expect(res.type).toBe("application/json")
    expect(res.body).toEqual({ message: "Welcome Amy"})
})