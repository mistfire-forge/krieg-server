import { client, q } from '../DBConnector.js'

export default app => {
    app.get('/my-games-list', async (req, res) => {
        console.log(req.user)

        return res.json({
            success: false,
            error: {
                code: 'Generic',
            },
        })
    })
}
