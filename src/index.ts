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
    const credentialsPath = path.join(awsDir, "credentials")
    fs.mkdirSync(awsDir, { recursive: true })

    // Read existing credentials if file exists
    let existingContent = ""
    if (fs.existsSync(credentialsPath)) {
        existingContent = fs.readFileSync(credentialsPath, "utf-8")
    }

    // Remove existing profile section if it exists
    const profileRegex = new RegExp(`\\[${profile}\\][^\\[]*(?=\\[|$)`, "g")
    existingContent = existingContent.replace(profileRegex, "")

    // Clean up any double newlines and trim
    existingContent = existingContent.replace(/\n{3,}/g, "\n\n").trim()

    const newProfileContent = `
        [${profile}]
        aws_access_key_id = ${aws_access_key_id}
        aws_secret_access_key = ${aws_secret_access_key}
        region = ${aws_region}
    `.trim()

    // Combine existing content with new profile
    const finalContent = (existingContent
        ? `${existingContent}\n\n${newProfileContent}\n`
        : `${newProfileContent}\n`).split("\n").map(line => line.trim()).join("\n")

    fs.writeFileSync(credentialsPath, finalContent)
}

if (require.main === module) {
    try {
        run()
    } catch (error) {
        core.setFailed(errorMessage(error))
    }
}
