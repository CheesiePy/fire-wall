import pool from "../config/db";

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
  console.log("IP table created");
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
  console.log("URL table created");
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
  console.log("Port table created");
  await pool.query(query);
};

export const createTables = async () => {
  try{
    await createIpTable();
    await createUrlTable();
    await createPortTable();
    console.log("All tables created successfully");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
};



