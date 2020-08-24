module.exports = (server, reply, id) => {
    const [idToken, refreshToken] = generateTokens(server, id)

    reply.setCookie('refreshToken', refreshToken, {
        path:
            process.env.INSTANCE_NAME === 'Local' ? '/refresh' : '/api/refresh',
        httpOnly: true,
    })

    return idToken
}

const generateTokens = (server, id) => {
    const idToken = server.jwt.sign(
        { id },
        {
            expiresIn: '2s',
        }
    )

    const refreshToken = server.jwt.sign(
        { id },
        {
            expiresIn: '90d',
        }
    )

    return [idToken, refreshToken]
}
