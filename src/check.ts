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
