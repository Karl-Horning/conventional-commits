import { readFile } from "node:fs/promises";
import { defineConfig } from "vite";

/**
 * Files in the repo root that the footer links to.
 *
 * @type {string[]}
 */
const ROOT_FILES = ["GUIDE.md", "LICENSE"];

/**
 * Copies ROOT_FILES into the build output.
 *
 * @returns {import("vite").Plugin}
 */
const copyRootFiles = () => ({
    name: "copy-root-files",
    apply: "build",
    async generateBundle() {
        for (const fileName of ROOT_FILES) {
            this.emitFile({
                type: "asset",
                fileName,
                source: await readFile(fileName),
            });
        }
    },
});

export default defineConfig({
    base: "/conventional-commits/",
    plugins: [copyRootFiles()],
});
