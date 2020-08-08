module.exports = (server, reply, username) => {
    const [idToken, refreshToken] = generateTokens(server, username)

    reply.setCookie('refresh', refreshToken, {
        // domain: 'https://dev.mistfireforge.com',
        path: '/refresh',
        httpOnly: true,
    })

    return { idToken }
}

const generateTokens = (server, username) => {
    const idToken = server.jwt.sign(
        { username },
        {
            expiresIn: '5m',
        }
    )

    const refreshToken = server.jwt.sign(
        { username },
        {
            expiresIn: '90d',
        }
    )

    return [idToken, refreshToken]
}
