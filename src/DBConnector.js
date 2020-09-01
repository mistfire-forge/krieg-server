import fauna from 'faunadb'

export const client = new fauna.Client({ secret: process.env.FAUNA_KEY })
export const q = fauna.query

export const getUserByEmail = async email => {
    return await client.query(q.Get(q.Match(q.Index('users_by_email'), email)))
}
