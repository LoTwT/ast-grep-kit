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

/**
 * Parses the given code using ast-grep.
 *
 * @param code - The code to parse.
 * @param lang - The language of the code (optional).
 * @returns The parse result, including the program, errors, and comments.
 */
export function sgParse(code: string, lang: AGLang = "ts") {
  const instance = LangMap[lang]
  return instance.parse(code).root()
}
