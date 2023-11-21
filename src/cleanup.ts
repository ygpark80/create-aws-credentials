import fs from "fs"
import os from "os"
import path from "path"
import * as core from "@actions/core"
import { errorMessage } from "./utils"

export function cleanup() {
    const profile = core.getInput("profile")

    const awsDir = path.join(os.homedir(), ".aws")
    const credentialsPath = path.join(awsDir, "credentials")

    if (fs.existsSync(credentialsPath)) {
        const credentials = fs.readFileSync(credentialsPath, "utf-8")
        if (!credentials.includes(`[${profile}]`)) return

        const sections = credentials.split(/\r?\n\s*\r?\n/)
        const filteredSections = sections.filter(section => !section.startsWith(`[${profile}]`))
        fs.writeFileSync(credentialsPath, filteredSections.join("\n\n"))
    }
}

if (require.main === module) {
    try {
        cleanup()
    } catch (error) {
        core.setFailed(errorMessage(error))
    }
}
