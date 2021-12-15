export function palindrome(string) {
  let invalidCharacters = /[^a-z0-9]/g;
  let sanitizedString = deleteChars(string.toLowerCase(), invalidCharacters);
  return sanitizedString === reverse(sanitizedString);
}

function deleteChars(string, regex) {
  return string.replace(regex, "");
}

function reverse(string) {
  return string.split("").reverse().join("");
}
