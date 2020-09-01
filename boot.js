import dotenv from 'dotenv'
import { exec } from 'child_process'

dotenv.config()

exec(
    `pm2 restart src/main.js --name "Krieg Server ${process.env.INSTANCE_NAME}" --node-args="-r dotenv/config"`,
    (error, stdout, stderr) => {
        if (error) {
            exec(
                `pm2 start src/main.js --name "Krieg Server ${process.env.INSTANCE_NAME}" --node-args="-r dotenv/config"`,
                (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Error: ${error.message}`)
                        return
                    }
                    if (stderr) {
                        console.log(`stderr: ${stderr}`)
                        return
                    }
                    console.log(`stdout: ${stdout}`)
                }
            )
            return
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`)
            return
        }
        console.log(`stdout: ${stdout}`)
    }
)
