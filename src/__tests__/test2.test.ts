import { describe, expect, it } from "@jest/globals"

describe("sum", () => {
  it("adds 2 + 2 to equal 4", () => {
    expect(2 + 2).toBe(4)
  })
})

describe("divide", () => {
  it("divides 8 / 2 to equal 4", () => {
    expect(8 / 2).toBe(4)
  })
})
