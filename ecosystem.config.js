require('dotenv').config()

module.exports = {
    apps: [
        {
            name: `Krieg Server ${process.env.INSTANCE_NAME}`,
            script: 'src/main.js',
        },
    ],
}
