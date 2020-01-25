const db = require("../database/dbConfig")

function add(user) {
    const newUser = db("users").insert(user)

    return findById(newUser[0])
}

function findBy(filter) {
    return users = db("users")
        .where(filter)
        .select("id", "username", "password")
}

function findById(id) {
    return db("user")
        .where({ id })
        .first()
}

module.exports = {
    add,
    findBy,
}