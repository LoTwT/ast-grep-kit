import { css, html, js, jsx, ts, tsx } from "@ast-grep/napi"

const LangMap = {
  html,
  css,
  js,
  jsx,
  ts,
  tsx,
} as const

export function sgParse(code: string, lang: keyof typeof LangMap = "ts") {
  const instance = LangMap[lang]
  return instance.parse(code).root()
}
