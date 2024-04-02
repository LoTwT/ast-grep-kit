import type { CSSKind, HTMLKind, JSKind, TSKind, TSXKind } from "./kind-types"

export type AGLang = "html" | "css" | "js" | "jsx" | "ts" | "tsx"

export type NodeTypes = {
  html: HTMLKind
  css: CSSKind
  js: JSKind
  jsx: JSKind
  ts: TSKind
  tsx: TSXKind
}
