import http from 'http'
import express from 'express'

import cors from 'cors'
import cookieParser from 'cookie-parser'
import expressJwt from 'express-jwt'

import { NetworkErrorCode } from '../shared/MessageCodes.js'

import RegisterRestRoutes from './rest/routes.js'
import RegisterWSRoutes from './game/routes/routes.js'

const app = express()
const server = http.createServer(app)

app.use(express.json())
app.use(
    cors({
        credentials: true,
        origin: ['http://127.0.0.1:1234', /krieg.mistfireforge\.com$/],
        exposedHeaders: ['set-cookie'],
    })
)
app.use(cookieParser(process.env.COOKIE_SECRET))

// JWT Validation for routes except...
app.use(
    expressJwt({
        secret: process.env.JWT_SECRET,
        algorithms: ['HS256'],
    }).unless({ path: ['/login', '/refresh', '/create-account'] })
)
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        console.log('No Auth', req.url)
        return res.json({
            success: false,
            error: {
                code: NetworkErrorCode.CouldNotVerifyToken,
            },
        })
    }
})

RegisterRestRoutes(app, server)
RegisterWSRoutes(app, server)

server.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})
