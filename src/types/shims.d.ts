interface TreeSitterLanguage {
  [key: string]: any
  nodeTypeInfo: {
    type: string
  }[]
}

declare module "tree-sitter-javascript" {
  const JavaScript: TreeSitterLanguage
  export default JavaScript
}

declare module "tree-sitter-typescript" {
  const TypeScript: {
    typescript: TreeSitterLanguage
    tsx: TreeSitterLanguage
  }
  export default TypeScript
}

declare module "tree-sitter-html" {
  const HTML: TreeSitterLanguage
  export default HTML
}

declare module "tree-sitter-css" {
  const CSS: TreeSitterLanguage
  export default CSS
}
