const { findHighestNumber } = require("./utils");

describe("findHighestNumber", () => {
  it("should return the highest number from several items", () => {
    const arr = ["a1", "d4", "b2"];
    const expected = 4;
    const actual = findHighestNumber(arr);
    expect(actual).toBe(expected);
  });

  it("should return the number from the first item if there's only one single item", () => {
    const arr = ["a1"];
    const expected = 1;
    const actual = findHighestNumber(arr);
    expect(actual).toBe(expected);
  });

  it("should return 0 if the array is empty", () => {
    const arr = [];
    const expected = 0;
    const actual = findHighestNumber(arr);
    expect(actual).toBe(expected);
  });
});
