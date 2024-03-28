import { sgParse } from "@/parse"

describe("parse", () => {
  test("sgParse", () => {
    const code = "const a = 1"
    const root = sgParse(code)

    expect(root.text()).toBe(code)
  })
})
