import { rot13 } from "./ceasars-cipher";

describe("caesars cipher", () => {
  test("handles a basic sentence", () => {
    expect(rot13("ONFVP FGHSS")).toEqual("BASIC STUFF");
  });
  test("handles non-letter characters", () => {
    expect(rot13("ONFVP FGHSS 123")).toEqual("BASIC STUFF 123");
  });
  test("handles lower-case input", () => {
    expect(rot13("onfvp fghss")).toEqual("BASIC STUFF");
  });
});
