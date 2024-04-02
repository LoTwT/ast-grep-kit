import { css, html, js, jsx, ts, tsx } from "@ast-grep/napi"
import type { AGLang } from "./types/shared"

const LangMap = {
  html,
  css,
  js,
  jsx,
  ts,
  tsx,
}

export function sgParse(code: string, lang: AGLang = "ts") {
  const instance = LangMap[lang]
  return instance.parse(code).root()
}
