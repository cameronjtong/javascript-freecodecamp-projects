const LETTERS = {
  A: "N",
  B: "O",
  C: "P",
  D: "Q",
  E: "R",
  F: "S",
  G: "T",
  H: "U",
  I: "V",
  J: "W",
  K: "X",
  L: "Y",
  M: "Z",
  N: "A",
  O: "B",
  P: "C",
  Q: "D",
  R: "E",
  S: "F",
  T: "G",
  U: "H",
  V: "I",
  W: "J",
  X: "K",
  Y: "L",
  Z: "M",
};
function rot13(str) {
  let chars = str.split("");
  let newChars = chars.map((element) => {
    if (LETTERS.hasOwnProperty(element)) {
      return LETTERS[element];
    }
    return element;
  });
  return newChars.join("");
}

rot13("SERR PBQR PNZC");
