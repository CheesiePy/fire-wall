import pool from '../config/db';


const GENERATE_RULES_QUERY = `
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
  SELECT full_rule_set FROM generated_rules;
`;

export const generateAndStoreRules = async () => {
  const result = await pool.query(GENERATE_RULES_QUERY);
  const rules = result.rows[0].full_rule_set;

  // Store the generated rules in the database
    await pool.query(`INSERT INTO rules (id, rule_set) VALUES (1, $1) ON CONFLICT (id) DO UPDATE SET rule_set = $1;`, [rules]);
};




// Function to get all rules
export const getAllRulesService = async () => {
  await generateAndStoreRules();
  const result = await pool.query('SELECT * FROM rules');
  return result;
};

export const updateRulesService = async (rule_set: any) => {


    const updated = [];

    const ruleTypes: { [key: string]: string } = {
        ips: 'ip',
        urls: 'url',
        ports: 'port',
    };

    for (const ruleType in rule_set) {
        if (Object.prototype.hasOwnProperty.call(rule_set, ruleType) && ruleTypes[ruleType]) {
            const { ids, mode, active } = rule_set[ruleType];

            if (!ids || ids.length === 0 || !mode || typeof active !== 'boolean') {
                continue;
            }

            const columnToUpdate = mode === 'blacklist' ? 'is_blacklisted' : 'is_whitelisted';
            const tableName = ruleType;
            const valueColumn = ruleTypes[ruleType];

            const query = `
              UPDATE ${tableName}
              SET ${columnToUpdate} = $1
              WHERE id = ANY($2::int[])
              RETURNING id, ${valueColumn} AS value;
              `;

            const result = await pool.query(query, [active, ids]);
            for (const row of result.rows) {
                updated.push({ ...row, active });
            }
        }
    }

    // After updating the individual tables, regenerate and store the consolidated rules
    await generateAndStoreRules();

    return { updated };
};


/**
 * rule table looks like this : 
 { 
  "ips": { 
    "blacklist": [ 
      { "id": 1, "value": "1.1.1.1" } 
    ], 
    "whitelist": [ 
      { "id": 2, "value": "9.9.9.9" } 
    ] 
  }, 
  "urls": { 
    "blacklist": [ 
      { "id": 3, "value": "bad.com" } 
 
    ], 
    "whitelist": [] 
  }, 
  "ports": { 
    "blacklist": [ 
      { "id": 4, "value": 22 }, 
      { "id": 5, "value": 23 } 
    ], 
    "whitelist": [ 
      { "id": 6, "value": 443 } 
    ] 
  } 
}


Toggle Rule Activation Status 
- Endpoint UPDATE /api/firewall/rules 
- Description Removes one or more domain names from the blacklist or whitelist. 
- Request Body 
{ 
urls: {"ids": [3, 7], "mode": "blacklist", "active": false}, 
ports {"ids": [13, 72], "mode": "blacklist", "active": true} 
ips {} 
} 
- Response 
{ 
  "updated": [ 
    { "id": 3, "value": "bad.com", "active": false }, 
    { "id": 7, "value": "phishing.net", "active": false } 
  ] 
} 
 
- 
 */
