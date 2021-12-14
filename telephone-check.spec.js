import { telephoneCheck } from "./telephone-check";

describe("telephoneCheck", () => {
  test("recognizes valid phone numbers", () => {
    expect(telephoneCheck("123-123-1234")).toBe(true);
    expect(telephoneCheck("(123)-123-1234")).toBe(true);
    expect(telephoneCheck("123 123 1234")).toBe(true);
    expect(telephoneCheck("1231231234")).toBe(true);
  });
  test("long distance phone numbers", () => {
    expect(telephoneCheck("1123-123-1234")).toBe(true);
    expect(telephoneCheck("1 123-123-1234")).toBe(true);
  });
  test("not enough digits", () => {
    expect(telephoneCheck("123-123-123")).toBe(false);
    expect(telephoneCheck("123-12-1234")).toBe(false);
    expect(telephoneCheck("12-123-1234")).toBe(false);
  });
  test("too many digits", () => {
    expect(telephoneCheck("12 123-123-1234")).toBe(false);
    expect(telephoneCheck("1 1234-123-1234")).toBe(false);
    expect(telephoneCheck("123-1234-1234")).toBe(false);
    expect(telephoneCheck("123-123-12345")).toBe(false);
  });
  test("invalid characters", () => {
    expect(telephoneCheck("123-123-123A")).toBe(false);
    expect(telephoneCheck("123-12A-1234")).toBe(false);
    expect(telephoneCheck("12A-123-1234")).toBe(false);
    expect(telephoneCheck("A 123-123-1234")).toBe(false);
  });
  test("long distance indicator followed by hyphen is invalid", () => {
    expect(telephoneCheck("1-123-123-1234")).toBe(false);
  });
});
