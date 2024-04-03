import { isCallOf, isTypeOf } from "@/check"
import { sgParse } from "@/parse"

describe("check", () => {
  test("isTypeOf", () => {
    const node = sgParse("const a = 1", "ts")

    expect(isTypeOf(node, ["program"])).toBe(true)
    expect(isTypeOf(node, ["identifier"])).toBe(false)
    expect(isTypeOf(node.child(0), ["lexical_declaration"])).toBe(true)
    expect(isTypeOf(node.child(0)?.child(1), "variable_declarator")).toBe(true)
  })

  test("isCallOf", () => {
    const callExpressionNode = sgParse("foo()", "ts").child(0)?.child(0)

    expect(isCallOf(null, "foo")).toBe(false)
    expect(isCallOf(callExpressionNode, "foo")).toBe(true)
    expect(isCallOf(callExpressionNode, ["bar", "foo"])).toBe(true)
    expect(isCallOf(callExpressionNode, (id) => id.startsWith("f"))).toBe(true)
  })
})
