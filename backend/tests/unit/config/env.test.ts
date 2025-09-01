// testing getEnvVariables function 
import env from '../../../src/config/env';

describe("Environment Variables", () => {
  test("returns the correct environment variables", () => {
    const result = env;
    expect(result).toHaveProperty("PORT");
    expect(result).toHaveProperty("DATABASE_URL");
    expect(result).toHaveProperty("DB_USER");
    expect(result).toHaveProperty("DB_PASSWORD");
    expect(result).toHaveProperty("DB_HOST");
    expect(result).toHaveProperty("DB_PORT");
    expect(result).toHaveProperty("DB_NAME");
    expect(result).toHaveProperty("ENV");
    expect(result).toHaveProperty("DATABASE_URL");
    expect(result).toHaveProperty("DB_CONNECTION_INTERVAL");
  });
});