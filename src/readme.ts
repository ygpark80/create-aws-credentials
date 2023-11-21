import fs from "fs"
import yaml from "js-yaml"
import packageJson from "../package.json"

(async () => {
    const action = yaml.load(fs.readFileSync("action.yml", "utf8")) as any
    const { description, inputs } = action

    let content = `# ${packageJson.name}\n\n`
    content += `This action ${description.charAt(0).toLowerCase() + description.slice(1)}.\n\n`

    content += "## Usage\n\n"
    content += "See [action.yml](action.yml)\n\n"

    const uses = new URL(packageJson.repository.url).pathname.slice(1).replace(/\.git$/, "")
    const ver = fs.readFileSync("VERSION", "utf8").trim()

    content += "```yaml\n"
    content += `- uses: ${uses}@${ver}\n`
    content += "  with:\n"
    for (const input in inputs) {
        content += `    # ${inputs[input].description}\n`
        content += `    ${input}: ''\n`
    }
    content += "```\n\n"

    fs.writeFileSync("README.md", `${content.trim()}\n`)
})()
