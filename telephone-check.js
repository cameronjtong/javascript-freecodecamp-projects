export function telephoneCheck(str) {
  let validNum = new RegExp(
    [
      "^(1\\s?)?", // optional country code
      "(\\d{3}|\\(\\d{3}\\))", // 3-digit area code with optional parantheses
      "[-\\s]?", // optional delimiter
      "\\d{3}", // 3-digit exchange code
      "[-\\s]?", // optional delimiter
      "\\d{4}$", // 4-digit subscriber number
    ].join("")
  );
  return validNum.test(str);
}
