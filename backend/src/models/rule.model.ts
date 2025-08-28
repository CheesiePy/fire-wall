import pool from '../config/db';

// Function to get all rules
export const getAllRulesService = async () => {
    const result = await pool.query('SELECT * FROM rules');
    return result;
};

export const updateRuleService = async (rules : object[], list: string, ids: number[], active: boolean) => {
    const updatedRules = [];
    for (const rule of rules) {
        const { id, value } = rule as { id: number, value: string | number };
        const result = await pool.query(
            'UPDATE rules SET value = $1, active = $2 WHERE id = $3 RETURNING *',
            [value, active, id]
        );
        if (result.rowCount !== null && result.rowCount > 0) {
            updatedRules.push(result.rows[0]);
        }
    }
    return updatedRules;
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
