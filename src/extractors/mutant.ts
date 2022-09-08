import { existsSync } from "fs"
import { copyFile, mkdir, readdir } from "fs/promises"
import { join as joinPath } from "path"
import { packsDir } from "../app.js"
import { VARIANT_SELECTOR_EMOJI } from "../constants.js"

export const copyMutantTo = async (outDir: string) => {
    const mutantDir = joinPath(packsDir, "mutant-remix", "emoji")

    if (!existsSync(outDir)) await mkdir(outDir)

    const mutantSvgs = await readdir(mutantDir)

    for (const emoji of mutantSvgs) {
        const inPath = joinPath(mutantDir, emoji)

        const codepoints = emoji.split("-")
        const normalizedFilename =
            codepoints.length === 2
                ? codepoints
                      .filter((x) => x !== VARIANT_SELECTOR_EMOJI)
                      .join("-")
                : codepoints.join("-")
        const outPath = joinPath(outDir, normalizedFilename)

        await copyFile(inPath, outPath)
    }
}
