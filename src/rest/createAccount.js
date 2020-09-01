import Validator from 'express-validator'
import withValidate from './utils/withValidate.js'

const { checkSchema } = Validator

import argon2 from 'argon2'

import { client, q } from '../DBConnector.js'
import SetAndGetTokens from './utils/setTokens.js'

export default app => {
    app.post(
        '/create-account',
        checkSchema({
            displayName: {
                in: 'body',
                isString: true,
                isLength: {
                    options: { min: 4 },
                },
            },
            email: {
                in: 'body',
                isEmail: true,
            },
            password1: {
                in: 'body',
                isString: true,
                isLength: {
                    options: { min: 2 },
                },
            },
            password2: {
                in: 'body',
                isString: true,
                isLength: {
                    options: { min: 2 },
                },
                custom: {
                    options: (value, { req }) => {
                        return !value.localeCompare(req.body.password1)
                    },
                },
            },
        }),
        withValidate(async (req, res) => {
            const { displayName, email, password1: password } = req.body

            const hash = await argon2.hash(password)

            try {
                const result = await client.query(
                    q.Create(q.Collection('users'), {
                        data: {
                            displayName,
                            email,
                            passwordHash: hash,
                        },
                    })
                )

                return res.json({
                    success: true,
                    content: {
                        accessToken: SetAndGetTokens(res, result.ref.id),
                    },
                })
            } catch (err) {
                return res.json({
                    success: false,
                    error: {
                        message: 'Could not create user',
                        details: err,
                    },
                })
            }
        })
    )
}
