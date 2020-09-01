import dotenv from 'dotenv'
import { exec } from 'child_process'

dotenv.config()

exec(
    `pm2 start ecosystem.json --name "Kreig Server ${process.env.INSTANCE_NAME}"`,
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
