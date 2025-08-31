import {db} from '../config/db';
import logger from '../config/logger';
import {ips, urls, ports, rules} from '../types/schemas';
import { inArray, eq } from 'drizzle-orm';


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
  const result = await db.execute(GENERATE_RULES_QUERY);
  const ruleset = result.rows[0]?.full_rule_set;

  // Store the generated rules in the database 
  if (ruleset) {
    await db.insert(rules).values({ id: 1, rule_set: ruleset }).onConflictDoUpdate({ target: rules.id, set: { rule_set: ruleset } });
  } else {
    logger.warn('No ruleset generated');
  }
};




// Function to get all rules
export const getAllRulesService = async () => {
  await generateAndStoreRules();
  const result = await db.select().from(rules);
  return result;
};

export const updateRulesService = async (rule_set: any) => {


    const updated = [];

    const ruleTypes: { [key: string]: { table: any, column: string } } = {
        ips: {table: ips, column: 'ip'},
        urls: {table: urls, column: 'url'},
        ports: {table: ports, column: 'port'},
    };

    for (const ruleType in rule_set) {
        if (Object.prototype.hasOwnProperty.call(rule_set, ruleType) && ruleTypes[ruleType]) {
            const { ids, mode, active } = rule_set[ruleType];

            if (!ids || ids.length === 0 || !mode || typeof active !== 'boolean') {
                continue;
            }

            const columnToUpdate = mode === 'blacklist' ? 'is_blacklisted' : 'is_whitelisted';
            const { table, column } = ruleTypes[ruleType];

            const result = await db.update(table)
              .set({ [columnToUpdate]: active })
              .where(inArray(table.id, ids))
              .returning({id : table.id, value: table[column]});
            for (const row of result) {
                updated.push({ ...row, active });
            }
        }
    }

    // After updating the individual tables, regenerate and store the consolidated rules
    await generateAndStoreRules();

    return { updated };
};
