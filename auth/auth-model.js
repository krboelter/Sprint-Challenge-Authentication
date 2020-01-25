const db = require("../database/dbConfig")
const bcrypt = require("bcryptjs")

async function add(user) {
    user.password = await bcrypt.hash(user.password, 14)
    const [newUser] = await db("users").insert(user)

    return findById(newUser)
}

function findBy(filter) {
    return users = db("users")
        .where(filter)
        .select("id", "username", "password")
}

function findById(id) {
    return db("users")
        .where({ id })
        .first()
}

module.exports = {
    add,
    findBy,
}