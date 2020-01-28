exports.seed = async (knex) => {
    await knex("users").truncate()

    await knex("users").insert([
        { username: "John", password: "abc123" },
        { username: "Sarah", password: "321cba" }
    ])
}