import { convertToRoman } from "./roman-numeral";

describe("convertToRoman", () => {
  test("converts to roman", () => {
    expect(convertToRoman(2)).toBe("II");
    expect(convertToRoman(4)).toBe("IV");
    expect(convertToRoman(9)).toBe("IX");
    expect(convertToRoman(300)).toBe("CCC");
    expect(convertToRoman(891)).toBe("DCCCXCI");
    expect(convertToRoman(3999)).toBe("MMMCMXCIX");
  });
});
