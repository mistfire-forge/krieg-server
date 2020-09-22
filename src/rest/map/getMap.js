import { client, q } from '../../DBConnector.js'

export default app => {
    app.get('/map/:mapId', async (req, res) => {
        try {
            // TODO Guard private maps
            
            const result = await client.query(
                q.Get(q.Ref(q.Collection('maps'), req.params.mapId))
            )
            res.json({
                success: true,
                content: {
                    map: result.data,
                },
            })
        } catch (error) {}
    })
}
