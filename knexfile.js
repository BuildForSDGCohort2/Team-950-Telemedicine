module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: '',
      database: 'telemedicine_dev',
    },
    debug: true,
    migrations: {
      directory: './src/server/database/migrations'
    },
    seeds: {
      directory: './src/server/database/seeds'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
