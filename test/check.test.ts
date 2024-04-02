import { isTypeOf } from "@/check"
import { sgParse } from "@/parse"

describe("check", () => {
  test("isTypeOf", () => {
    const node = sgParse("const a = 1", "ts")

    expect(isTypeOf(node, ["program"])).toBe(true)
    expect(isTypeOf(node, ["identifier"])).toBe(false)
    expect(isTypeOf(node.child(0), ["lexical_declaration"])).toBe(true)
    expect(isTypeOf(node.child(0)?.child(1), "variable_declarator")).toBe(true)
  })
})
