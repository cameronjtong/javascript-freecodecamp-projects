const ROMAN_NUMERALS = [
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];

export function convertToRoman(num) {
  if (num === 0) return "";
  let [value, numeral] = ROMAN_NUMERALS.find(([value]) => value <= num);
  return numeral + convertToRoman(num - value);
}
