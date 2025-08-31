import {pgTable, serial, text, timestamp, boolean, jsonb} from 'drizzle-orm/pg-core'

export const ips = {
  table: pgTable('ips', {
    id: serial('id').primaryKey(),
    ip: text('ip').notNull(),
    is_blacklisted: boolean('is_blacklisted').notNull().default(false),
    is_whitelisted: boolean('is_whitelisted').notNull().default(false),
    createdAt: timestamp('created_at').defaultNow(),
  }),
}

export const ports = {
  table: pgTable('ports', {
    id: serial('id').primaryKey(),
    port: text('port').notNull(),
    is_blacklisted: boolean('is_blacklisted').notNull().default(false),
    is_whitelisted: boolean('is_whitelisted').notNull().default(false),
    createdAt: timestamp('created_at').defaultNow(),
  }),
}

export const urls = {
  table: pgTable('urls', {
    id: serial('id').primaryKey(),
    url: text('url').notNull(),
    is_blacklisted: boolean('is_blacklisted').notNull().default(false),
    is_whitelisted: boolean('is_whitelisted').notNull().default(false),
    createdAt: timestamp('created_at').defaultNow(),
  }),
}

export const rules = {
  table: pgTable('rules', {
    id: serial('id').primaryKey(),
    rule_set: jsonb('rule_set').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
  }),
}

