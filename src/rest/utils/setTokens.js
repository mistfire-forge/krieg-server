import jwt from 'jsonwebtoken'
import { refreshPath, secureCookie } from './settings.js'

export default (response, userId) => {
    const refreshToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '90d',
    })
    response.cookie('refresh', refreshToken, {
        path: refreshPath,
        httpOnly: true,
        secure: secureCookie,
        maxAge: 1000 * 60 * 60 * 24 * 90, // ms * s * m * h * d = 90 Days
        signed: true,
    })

    const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '10m',
    })

    // TODO Maybe save tokens to DB

    return accessToken
}
