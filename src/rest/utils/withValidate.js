import util from 'util'
import Validator from 'express-validator'
const { validationResult } = Validator

export default func => {
    return async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.json({
                success: false,
                errors: errors.errors,
            })
        }

        return await func(req, res)
    }
}
