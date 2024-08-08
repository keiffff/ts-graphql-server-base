import { describe, expect, it } from "@jest/globals"

describe("sum", () => {
  it("adds 1 + 2 to equal 3", () => {
    expect(1 + 2).toBe(3)
  })
})

describe("divide", () => {
  it("divides 6 / 3 to equal 2", () => {
    expect(6 / 3).toBe(2)
  })
})
