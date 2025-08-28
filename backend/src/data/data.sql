-- Corrected SQL Syntax
CREATE TABLE IF NOT EXISTS ips (
  id SERIAL PRIMARY KEY,
  ip_address VARCHAR(45) NOT NULL UNIQUE,
  is_blocked BOOLEAN DEFAULT FALSE,
  is_whitelisted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ports (
  id SERIAL PRIMARY KEY,
  port_number INT NOT NULL UNIQUE,
  is_blocked BOOLEAN DEFAULT FALSE,
  is_whitelisted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS urls (
  id SERIAL PRIMARY KEY,
  url VARCHAR(255) NOT NULL UNIQUE,
  is_blocked BOOLEAN DEFAULT FALSE,
  is_whitelisted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

WITH generated_rules AS (
  SELECT
    json_build_object(
      'ips', (
        SELECT json_build_object(
          'blacklist', COALESCE(json_agg(json_build_object('id', id, 'value', ip)) FILTER (WHERE is_blacklisted = TRUE), '[]'::json),
          'whitelist', COALESCE(json_agg(json_build_object('id', id, 'value', ip)) FILTER (WHERE is_whitelisted = TRUE), '[]'::json)
        ) FROM ips
      ),
      'urls', (
        SELECT json_build_object(
          'blacklist', COALESCE(json_agg(json_build_object('id', id, 'value', url)) FILTER (WHERE is_blacklisted = TRUE), '[]'::json),
          'whitelist', COALESCE(json_agg(json_build_object('id', id, 'value', url)) FILTER (WHERE is_whitelisted = TRUE), '[]'::json)
        ) FROM urls
      ),
      'ports', (
        SELECT json_build_object(
          'blacklist', COALESCE(json_agg(json_build_object('id', id, 'value', port)) FILTER (WHERE is_blacklisted = TRUE), '[]'::json),
          'whitelist', COALESCE(json_agg(json_build_object('id', id, 'value', port)) FILTER (WHERE is_whitelisted = TRUE), '[]'::json)
        ) FROM ports
      )
    ) AS full_rule_set
)
-- This is the final query to execute in your app
SELECT full_rule_set FROM generated_rules;