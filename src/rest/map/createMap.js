import Validator from 'express-validator'
import withValidate from '../utils/withValidate.js'

import { client, q } from '../../DBConnector.js'

const { checkSchema } = Validator

export default app => {
    app.post(
        '/create-new-map',
        checkSchema({
            mapName: {
                in: 'body',
                isString: true,
                isLength: {
                    options: { min: 4 },
                },
            },
        }),
        withValidate(async (req, res) => {
            try {
                const playerRef = q.Ref(q.Collection('users'), req.user.userId)
                // const createResult = await client.query(
                //     q.Create(q.Collection('sessions'), {
                //         data: {
                //             name: req.body.mapName,
                //             creator: playerRef,
                //             maxPlayers: 4,
                //         },
                //     })
                // )
                setTimeout(() => {
                    return res.json({
                        success: true,
                        content: {
                            mapId: 1,
                        },
                    })
                }, 2000)
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
