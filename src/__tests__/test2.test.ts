import { describe, expect, it } from "@jest/globals"
import { divide, sum } from "./module.js"

describe("sum", () => {
  it("adds 2 + 2 to equal 4", () => {
    expect(sum(2, 2)).toBe(4)
  })
})

describe("divide", () => {
  it("divides 8 / 2 to equal 4", () => {
    expect(divide(8, 2)).toBe(4)
  })
})
