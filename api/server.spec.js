const supertest = require("supertest")
const db = require("../database/dbConfig")
const server = require("../index")

beforeEach (async () => {
    await db.seed.run()
})

// register tests

test("create a new user", async () => {
    const res = await supertest(server).post("/api/auth/register").send({ username: "Amy", password: "123456" })
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

test("cannot create a new user without a password", async () => {
    const res = await supertest(server).post("/api/auth/register").send({ username: "Jordan", password: "" })

    expect(res.status).toBe(401)
    expect(res.type).toBe("application/json")
    expect(res.body).toEqual({ message: "Password needs to be at least 6 characters"})
})

// login tests

test("log in user", async () => {
    const createUser = await supertest(server).post("/api/auth/register").send({ username: "Amy", password: "123456" })
    const res = await supertest(server).post("/api/auth/login").send({ username: "Amy", password: "123456" })

    expect(res.status).toBe(200)
    expect(res.type).toBe("application/json")
    expect(res.body).toEqual({ message: "Welcome Amy"})
})

test("cannot login without a valid password", async () => {
    const createUser = await supertest(server).post("api/auth/register").send({ username: "Jordan", password: "asdf" })
    const res = await supertest(server).post("api/auth/login").send({ username: "Jordan", password: "qwerty" })

    expect(res.status).toBe(401)
})