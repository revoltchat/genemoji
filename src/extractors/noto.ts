import { existsSync } from "fs"
import { copyFile, mkdir, readdir } from "fs/promises"
import { join as joinPath } from "path"
import { packsDir } from "../app.js"

export const copyNotoTo = async (outDir: string) => {
    const notoDir = joinPath(packsDir, "noto", "svg")

    if (!existsSync(outDir)) await mkdir(outDir)

    const notoSvgs = await readdir(notoDir)

    for (const emoji of notoSvgs) {
        const inPath = joinPath(notoDir, emoji)

        const normalizedFilename = emoji
            .replace("emoji_u", "")
            .replaceAll("_", "-")
        const outPath = joinPath(outDir, normalizedFilename)

        await copyFile(inPath, outPath)
    }
}
