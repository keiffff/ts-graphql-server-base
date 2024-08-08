import { describe, expect, it } from "vitest"
import { divide, sum } from "./module.js"

describe("sum", () => {
  it("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3)
  })
})

describe("divide", () => {
  it("divides 6 / 3 to equal 2", () => {
    expect(divide(6, 3)).toBe(2)
  })
})
