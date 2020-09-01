import jwt from 'jsonwebtoken'

import MessageCodes from '../../shared/MessageCodes.js'
const { NetworkErrorCode } = MessageCodes

import GetAndSetTokens from './utils/setTokens.js'

export default app => {
    app.get('/refresh', async (req, res) => {
        try {
            const decoded = jwt.verify(
                req.signedCookies.refresh,
                process.env.JWT_SECRET
            )

            return res.json({
                success: true,
                content: {
                    accessToken: GetAndSetTokens(res, decoded.userId),
                },
            })
        } catch (err) {
            return res.json({
                success: false,
                error: {
                    code: NetworkErrorCode.CouldNotVerifyToken,
                    details: err,
                },
            })
        }
    })
}
