import { isValidIp, isValidPort, isValidUrl } from "../../../src/utils/validator";
import {describe, expect, test} from '@jest/globals';

describe("Validator", () => {
  test("isValidIp", () => {
    expect(isValidIp("192.168.1.1")).toBe(true);
    expect(isValidIp('256.168.1.2')).toBe(false);
    expect(isValidIp("invalid-ip")).toBe(false);
  });
});

describe("isValidPort", () => {
  test("valid port", () => {
    expect(isValidPort("8080")).toBe(true);
  });

  test("invalid port", () => {
    expect(isValidPort("70000")).toBe(false);
  });
});

describe("isValidUrl", () => {
  test("valid URL", () => {
    expect(isValidUrl("https://www.example.com")).toBe(true);
  });

  test("invalid URL", () => {
    expect(isValidUrl("invalid-url")).toBe(false);
  });
});