const faunadb = require('faunadb')
const q = faunadb.query

const client = new faunadb.Client({ secret: process.env.FAUNA_KEY })

const getUser = async username => {
    return await client.query(
        q.Get(q.Match(q.Index('users_by_username'), username))
    )
}

module.exports = { client, q, getUser }
