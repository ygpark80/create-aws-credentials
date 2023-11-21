import fs from "fs"
import os from "os"
import path from "path"
import * as core from "@actions/core"
import { errorMessage } from "./utils"

export function run() {
    const profile = core.getInput("profile")
    const aws_access_key_id = core.getInput("aws-access-key-id")
    const aws_secret_access_key = core.getInput("aws-secret-access-key")
    const aws_region = core.getInput("aws-region")

    const awsDir = path.join(os.homedir(), ".aws")
    fs.mkdirSync(awsDir, { recursive: true })

    const credentialsContent = `
        [${profile}]
        aws_access_key_id = ${aws_access_key_id}
        aws_secret_access_key = ${aws_secret_access_key}
        region = ${aws_region}
    `.split("\n").map(line => line.trim()).join("\n")

    fs.appendFileSync(path.join(awsDir, "credentials"), credentialsContent)
}

if (require.main === module) {
    try {
        run()
    } catch (error) {
        core.setFailed(errorMessage(error))
    }
}
