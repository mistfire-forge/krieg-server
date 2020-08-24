const schema = {
    body: {
        type: 'object',
        properties: {
            test: { type: 'string' },
        },
    },
}

module.exports = fastify => {
    fastify.post(
        '/create-new-game',
        {
            schema,
            preValidation: [fastify.authenticate],
        },
        async (request, reply) => {
            console.log(request.user) // TODO

            const body = request.body
            console.log(body)

            // await new Promise((resolve, reject) => {
            //     setTimeout(() => resolve(''), 2000)
            // })

            return {
                success: true,
                content: {
                    test: 'ho!',
                },
            }
        }
    )
}
