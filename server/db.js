const {Pool} = require("pg")

const pool = new Pool({
    user:"postgres",
    password:"22222222",
    host:"localhost",
    port:"5432",
    database:"todo_db",
})

module.exports = pool;
