export default app => {
    app.get('/my-maps-list', async (req, res) => {
        console.log(req.user)
        res.json({
            success: true,
            content: {
                list: [],
            },
        })
    })
}
