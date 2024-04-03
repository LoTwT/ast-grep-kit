import type { Arrayable, Nullable, Undefinedable } from "@ayingott/sucrose"
import type { AGLang, NodeTypes } from "./types/shared"
import type { SgNode } from "@ast-grep/napi"

/**
 * Checks if the given node matches the specified type(s).
 *
 * @param node - The node to check.
 * @param types - The type(s) to match against. It can be a single type or an array of types.
 * @returns True if the node matches the specified type(s), false otherwise.
 */
export function isTypeOf<L extends AGLang = "ts">(
  node: Nullable<Undefinedable<SgNode>>,
  types: Arrayable<NodeTypes[L]>,
) {
  types = Array.isArray(types) ? types : [types]
  return !!node && types.includes(node.kind() as any)
}

/**
 * Checks if the given node is a call_expression with the specified callee.
 *
 * @param node - The node to check.
 * @param test - The callee to compare against. It can be a string, an array of strings, or a function that takes a string and returns a boolean.
 * @returns True if the node is a call_expression with the specified callee, false otherwise.
 */
export function isCallOf(
  node: Nullable<Undefinedable<SgNode>>,
  test: Arrayable<string> | ((id: string) => boolean),
) {
  if (!node || node.kind() !== "call_expression") return false

  const functionFieldText = node.field("function")?.text()

  return (
    !!functionFieldText &&
    (typeof test === "string"
      ? functionFieldText === test
      : Array.isArray(test)
        ? test.includes(functionFieldText)
        : test(functionFieldText))
  )
}

/**
 * Checks if the given node is an identifier with the specified name.
 *
 * @param node - The node to check.
 * @param test - The name to compare against. It can be a string or an array of strings.
 * @returns True if the node is an identifier with the specified name, false otherwise.
 */
export function isIdentifierOf(
  node: Nullable<Undefinedable<SgNode>>,
  test: Arrayable<string>,
) {
  return (
    !!node &&
    node.kind() === "identifier" &&
    (typeof test === "string"
      ? node.text() === test
      : test.includes(node.text()))
  )
}
