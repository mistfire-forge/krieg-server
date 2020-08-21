const faunadb = require('faunadb')
const q = faunadb.query

const client = new faunadb.Client({ secret: process.env.FAUNA_KEY })

const getUserByEmail = async email => {
    return await client.query(q.Get(q.Match(q.Index('users_by_email'), email)))
}

module.exports = { client, q, getUserByEmail }
