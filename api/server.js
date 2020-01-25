const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dbConfig = require('../database/dbConfig')
const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session)


const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session({
    name: "usersession",
    secret: process.env.SESSION_SECRET || "some random string",
    resave: false,
    saveUninitialized: false,
    httpOnly: true,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60,
    },
    store: new KnexSessionStore({
        knex: dbConfig,
        createtable:true,
    })
}))

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

// server.get((error, req, res, next) => {
//     res.status(500).json({
//         message: "Internal error...",
//         error
//     })
// })

module.exports = server;
