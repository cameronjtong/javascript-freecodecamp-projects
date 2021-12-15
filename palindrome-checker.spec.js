import { palindrome } from "./palindrome-checker";

describe("palindrome", () => {
  test("valid palindrome", () => {
    expect(palindrome("")).toBe(true);
    expect(palindrome("a")).toBe(true);
    expect(palindrome("racecar")).toBe(true);
    expect(palindrome("9racecar9")).toBe(true);
    expect(palindrome("Racecar")).toBe(true);
    expect(palindrome("rac ec a r")).toBe(true);

    expect(palindrome("almostomla")).toBe(false);
  });
});
