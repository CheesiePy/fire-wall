// testing getEnvVariables function 
import env from '../../../src/config/env';

describe("Environment Variables", () => {
  test("returns the correct environment variables", () => {
    const result = env;
    expect(result).toHaveProperty("NODE_ENV");
    expect(result).toHaveProperty("PORT");
    expect(result).toHaveProperty("DATABASE_URL");
  });
});