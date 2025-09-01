import { isValidIp, isValidPort, isValidUrl } from "../../../src/utils/validator";

test("isValidIp", () => {
  expect(isValidIp("192.168.1.1")).toBe(true);
  expect(isValidIp("invalid-ip")).toBe(false);
});

test("isValidPort", () => {
  expect(isValidPort("8080")).toBe(true);
  expect(isValidPort("70000")).toBe(false);
});

test("isValidUrl", () => {
  expect(isValidUrl("https://www.example.com")).toBe(true);
  expect(isValidUrl("invalid-url")).toBe(false);
});