import pool from "../config/db";
import logger from "../config/logger";

const createIpTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS ips (
      id SERIAL PRIMARY KEY,
      ip VARCHAR(45) NOT NULL UNIQUE,
      is_blacklisted BOOLEAN DEFAULT FALSE,
      is_whitelisted BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  logger.info("IP table created");
  await pool.query(query);
};

const createUrlTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS urls (
      id SERIAL PRIMARY KEY,
      url VARCHAR(255) NOT NULL UNIQUE,
      is_blacklisted BOOLEAN DEFAULT FALSE,
      is_whitelisted BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  logger.info("URL table created");
  await pool.query(query);
};

const createPortTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS ports (
      id SERIAL PRIMARY KEY,
      port INTEGER NOT NULL UNIQUE,
      is_blacklisted BOOLEAN DEFAULT FALSE,
      is_whitelisted BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  logger.info("Port table created");
  await pool.query(query);
};

const createRulesTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS rules (
        id SERIAL PRIMARY KEY,
        rule_set JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(query);
  logger.info("Rules table created");
}

export const createTables = async () => {
  try{
    await createIpTable();
    await createUrlTable();
    await createPortTable();
    await createRulesTable();
    logger.info("All tables created successfully");
  } catch (error) {
    logger.error("Error creating tables:", error);
  }
};



