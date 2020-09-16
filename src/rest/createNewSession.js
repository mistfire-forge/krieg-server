import Validator from 'express-validator'
import withValidate from './utils/withValidate.js'

const { checkSchema } = Validator

import { client, q } from '../DBConnector.js'

export default app => {
    app.post(
        '/create-new-session',
        checkSchema({
            sessionName: {
                in: 'body',
                isString: true,
            },
        }),
        withValidate(async (req, res) => {
            try {
                const playerRef = q.Ref(q.Collection('users'), req.user.userId)
                const createResult = await client.query(
                    q.Create(q.Collection('sessions'), {
                        data: {
                            name: req.body.sessionName,
                            host: playerRef,
                            joinState: 'LOBBY',
                            players: [playerRef],
                            maxPlayers: 4, // TODO
                        },
                    })
                )
                return res.json({
                    success: true,
                    content: {
                        sessionId: createResult.ref.id,
                    },
                })
            } catch (err) {
                return res.json({
                    success: false,
                    error: {
                        message: 'Could not create game',
                        details: err,
                    },
                })
            }
        })
    )
}
