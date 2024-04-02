import { resolve } from "node:path"
import { fileURLToPath } from "node:url"
import JavaScript from "tree-sitter-javascript"
import TypeScript from "tree-sitter-typescript"
import HTML from "tree-sitter-html"
import CSS from "tree-sitter-css"
import { ensureFile, outputFile } from "fs-extra"
import { format } from "prettier"
import prettierConfig from "@ayingott/prettier-config"

const _dirname = fileURLToPath(new URL(".", import.meta.url))

const languages = {
  JS: JavaScript,
  TS: TypeScript.typescript,
  TSX: TypeScript.tsx,
  HTML,
  CSS,
}

async function generateKindTypes() {
  let code = "// Auto-generated. Don't edit!\n\n"

  Object.entries(languages).forEach(([name, language]) => {
    const nodeTypeInfo = language.nodeTypeInfo
    const kindTypes = nodeTypeInfo.map((n) => n.type)
    const kindTypeDeclaration = `export type ${name}Kind = ${kindTypes.map((kt) => (kt === '"' ? `'${kt}'` : `"${kt}"`)).join("|")}\n\n`

    code += kindTypeDeclaration
  })

  const targetPath = resolve(_dirname, "../src/types/kind-types.ts")
  await ensureFile(targetPath)

  code = await format(code, {
    ...prettierConfig,
    parser: "typescript",
  })
  await outputFile(targetPath, code)

  console.log("📦 Generated done.")
}

await generateKindTypes()
