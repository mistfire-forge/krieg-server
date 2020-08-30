const refreshPath =
    process.env.INSTANCE_NAME === 'Local' ? '/refresh' : '/api/refresh'

const secureCookie = process.env.INSTANCE_NAME !== 'Local'

module.exports = {
    refreshPath,
    secureCookie,
}
