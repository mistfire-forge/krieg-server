import Validator from 'express-validator'
const { checkSchema } = Validator
import withValidate from '../../rest/utils/withValidate.js'

import { v4 as uuid } from 'uuid'

import NodeCache from 'node-cache'
import { WSCode } from '../../../shared/MessageCodes.js'

export const tokenCache = new NodeCache({
    stdTTL: 300,
    checkperiod: 60 * 60 * 12,
})

export const registerServices = app => {
    app.post(
        '/get-join-token',
        checkSchema({
            sessionId: {
                in: 'body',
                isString: true,
            },
        }),
        withValidate(async (req, res) => {
            let id = uuid()
            while (tokenCache.has(id)) {
                id = uuid()
            }
            tokenCache.set(id, {
                userId: req.user.userId,
                sessionId: req.body.sessionId,
            })

            return res.json({
                success: true,
                content: {
                    token: id,
                },
            })
        })
    )
    app.post(
        '/get-join-error',
        checkSchema({
            token: {
                in: 'body',
                isString: true,
            },
        }),
        withValidate(async (req, res) => {
            const token = req.body.token
            if (!tokenCache.has(token)) {
                res.json({
                    success: false,
                    error: WSCode.NoSuchToken,
                })
            }

            res.json({
                success: true,
                content: tokenCache.take(token),
            })
        })
    )
}
