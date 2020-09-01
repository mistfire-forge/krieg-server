import argon2 from 'argon2'

import Validator from 'express-validator'
import withValidate from './utils/withValidate.js'

const { checkSchema } = Validator

import { NetworkErrorCode } from '../../shared/MessageCodes.js'

import { getUserByEmail } from '../DBConnector.js'
import GetAndSetTokens from './utils/setTokens.js'

const badVerifyMessage = {
    success: false,
    error: {
        code: NetworkErrorCode.CouldNotVerifyLogin,
    },
}

export default app => {
    app.post(
        '/login',
        checkSchema({
            email: {
                in: 'body',
                isEmail: true,
            },
            password: {
                in: 'body',
                isString: true,
            },
        }),
        withValidate(async (req, res) => {
            console.log('Logging in')
            const { email, password } = req.body

            let user
            try {
                user = await getUserByEmail(email)
            } catch (err) {
                return res.json(badVerifyMessage)
            }

            try {
                if (!(await argon2.verify(user.data.passwordHash, password))) {
                    return res.json(badVerifyMessage)
                }
            } catch (err) {
                console.error('Internal Argon2 error', err)
                return res.json(badVerifyMessage)
            }

            // TODO: Check for token blacklist

            // TODO: Log IP

            return res.json({
                success: true,
                content: {
                    accessToken: GetAndSetTokens(res, user.ref.id),
                },
            })
        })
    )
}
