const { refreshPath, secureCookie } = require('./settings.js')

module.exports = (server, reply, id) => {
    const [sessionToken, refreshToken] = generateTokens(server, id)

    reply.setCookie('refreshToken', refreshToken, {
        path: refreshPath,
        httpOnly: true,
        secure: secureCookie,
        maxAge: 60 * 60 * 24 * 90, // 90 Days
    })

    return sessionToken
}

const generateTokens = (server, id) => {
    const sessionToken = server.jwt.sign(
        { id },
        {
            expiresIn: '10m',
        }
    )

    const refreshToken = server.jwt.sign(
        { id },
        {
            expiresIn: '90d',
        }
    )

    return [sessionToken, refreshToken]
}
