const fs = require("fs").promises;
const path = require("path");
const strip = require("strip-comments");

async function removeCommentsFromDir(dir) {
    try {
        const files = await fs.readdir(dir, { withFileTypes: true });

        for (const file of files) {
            const fullPath = path.join(dir, file.name);

            if (file.isDirectory()) {
                await removeCommentsFromDir(fullPath);
            } else if (
                file.isFile() &&
                (fullPath.endsWith(".js") ||
                    fullPath.endsWith(".ts") ||
                    fullPath.endsWith(".tsx"))
            ) {
                const content = await fs.readFile(fullPath, "utf8");
                const strippedContent = strip(content, { preserveNewlines: true });

                if (content !== strippedContent) {
                    await fs.writeFile(fullPath, strippedContent, "utf8");
                    console.log(`Комментарии удалены из: ${fullPath}`);
                }
            }
        }
    } catch (err) {
        console.error(`Ошибка: ${err}`);
    }
}

removeCommentsFromDir(path.join(__dirname, "src"));