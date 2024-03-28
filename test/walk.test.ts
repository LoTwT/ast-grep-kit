import { sgParse } from "@/parse"
import { walkImportDeclaration } from "@/walk"

describe("walk", () => {
  test("walkImportDeclaration", () => {
    const sgNode = sgParse(
      `
      import { a } from "a"
      import * as b from "b"
      import c from "c"
      import "d"
      import e, { f } from "e"
      import type { g } from "g"
      import type h from "h"
      import type * as i from "i"
      import type j from "j"
      import { type h } from "h"
      import k, { type l as ll } from "k"
     `,
      "ts",
    )

    const imports = {}
    walkImportDeclaration(imports, sgNode)

    expect(imports).toMatchInlineSnapshot(`
      {
        "a": [
          {
            "imported": "a",
            "isType": false,
            "local": "a",
          },
        ],
        "b": [
          {
            "imported": "*",
            "isType": false,
            "local": "b",
          },
        ],
        "c": [
          {
            "imported": "default",
            "isType": false,
            "local": "c",
          },
        ],
        "e": [
          {
            "imported": "default",
            "isType": false,
            "local": "e",
          },
          {
            "imported": "f",
            "isType": false,
            "local": "f",
          },
        ],
        "g": [
          {
            "imported": "g",
            "isType": true,
            "local": "g",
          },
        ],
        "h": [
          {
            "imported": "h",
            "isType": true,
            "local": "h",
          },
        ],
        "i": [
          {
            "imported": "*",
            "isType": true,
            "local": "i",
          },
        ],
        "j": [
          {
            "imported": "default",
            "isType": true,
            "local": "j",
          },
        ],
        "k": [
          {
            "imported": "default",
            "isType": false,
            "local": "k",
          },
          {
            "imported": "l",
            "isType": true,
            "local": "ll",
          },
        ],
      }
    `)
  })
})
