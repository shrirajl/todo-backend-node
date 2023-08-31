import type { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config({ path: '../.env' });

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      database: process.env.DB_NAME, 
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "db/migrations"
    }
  },

  production: {
    client: "pg",
    connection: {
      database: process.env.DB_NAME, 
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "src/db/migrations"
    }
  }

};

module.exports = config;
