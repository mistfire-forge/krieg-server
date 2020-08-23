module.exports = (server, reply, email) => {
    const [idToken, refreshToken] = generateTokens(server, email)

    reply.setCookie('refreshToken', refreshToken, {
        path:
            process.env.INSTANCE_NAME === 'Local' ? '/refresh' : '/api/refresh',
        httpOnly: true,
    })

    return idToken
}

const generateTokens = (server, email) => {
    const idToken = server.jwt.sign(
        { email },
        {
            expiresIn: '5m',
        }
    )

    const refreshToken = server.jwt.sign(
        { email },
        {
            expiresIn: '90d',
        }
    )

    return [idToken, refreshToken]
}
