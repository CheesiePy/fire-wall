// testing getEnvVariables function 
import env from '../../../src/config/env';
import {describe, expect, test} from '@jest/globals';

describe("Environment Variables", () => {
  test("returns the correct environment variables", () => {
    expect(env).toHaveProperty("PORT");
    expect(env).toHaveProperty("LOG_LEVEL");
    expect(env).toHaveProperty("DB_USER");
    expect(env).toHaveProperty("DB_PASSWORD");
    expect(env).toHaveProperty("DB_HOST");
    expect(env).toHaveProperty("DB_PORT");
    expect(env).toHaveProperty("DB_NAME");
    expect(env).toHaveProperty("DATABASE_URL");
    expect(env).toHaveProperty("DB_CONNECTION_INTERVAL", '5000');
  });
});