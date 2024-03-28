import { type SgNode, ts } from "@ast-grep/napi"

export interface ImportBinding {
  imported: string
  local: string
  isType: boolean
}

export function walkImportDeclaration(
  imports: Record<string, ImportBinding[]>,
  node: SgNode,
) {
  const importStats = node.findAll(ts.kind("import_statement"))

  for (const stat of importStats) {
    const sourceFragment = stat.find(ts.kind("string_fragment"))
    const importClause = stat.find(ts.kind("import_clause"))

    if (!sourceFragment || !importClause) {
      continue
    }

    const bindings: ImportBinding[] = []

    const source = sourceFragment.text()

    const statText = stat.text()
    let isType = statText.startsWith("import type ")

    // default import
    const defaultImport = importClause.find({
      rule: {
        kind: "identifier",
        inside: {
          kind: "import_clause",
        },
      },
    })

    if (defaultImport) {
      bindings.push({
        imported: "default",
        local: defaultImport.text(),
        isType,
      })
    }

    // namespace import
    const namespaceImport = importClause.find({
      rule: {
        kind: "identifier",
        inside: {
          kind: "namespace_import",
        },
      },
    })

    if (namespaceImport) {
      bindings.push({
        imported: "*",
        local: namespaceImport.text(),
        isType,
      })
    }

    // named imports
    const specifiers = importClause.findAll({
      rule: {
        kind: "import_specifier",
        inside: {
          kind: "named_imports",
        },
      },
    })

    specifiers.forEach((s) => {
      if (!isType) {
        isType = s.text().startsWith("type ")
      }

      const nameSpecifier = s.find({
        rule: {
          kind: "identifier",
          inside: {
            kind: "import_specifier",
            field: "name",
          },
        },
      })!

      const aliasSpecifier = s.find({
        rule: {
          kind: "identifier",
          inside: {
            kind: "import_specifier",
            field: "alias",
          },
        },
      })

      bindings.push({
        imported: nameSpecifier.text(),
        local: aliasSpecifier ? aliasSpecifier.text() : nameSpecifier.text(),
        isType,
      })
    })

    imports[source] = bindings
  }

  return imports
}
