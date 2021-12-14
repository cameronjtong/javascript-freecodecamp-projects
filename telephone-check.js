export function telephoneCheck(str) {
  let validNum = new RegExp(
    "^(1\\s?)?(\\d{3}|\\(\\d{3}\\))[-\\s]?\\d{3}[-\\s]?\\d{4}$"
  );
  return validNum.test(str);
}
