export const refreshPath =
    process.env.INSTANCE_NAME === 'Local' ? '/refresh' : '/api/refresh'

export const secureCookie = process.env.INSTANCE_NAME !== 'Local'
