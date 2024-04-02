import type { Arrayable, Nullable, Undefinedable } from "@ayingott/sucrose"
import type { AGLang, NodeTypes } from "./types/shared"
import type { SgNode } from "@ast-grep/napi"

export function isTypeOf<L extends AGLang = "ts">(
  node: Nullable<Undefinedable<SgNode>>,
  types: Arrayable<NodeTypes[L]>,
) {
  types = Array.isArray(types) ? types : [types]
  return node && types.includes(node.kind() as any)
}
