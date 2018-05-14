import hashing from "./index";

test("hashing", () => {
  const expected =
    "84345bcf2be3296a3faee0d8a0dab3b450b224e1969c56cb58759a4edc7fdc72";
  const actual = hashing("See you in the next life, Jack!", "woof");
  expect(actual).toBe(expected);
});
