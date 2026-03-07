const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Bossfinalstore',
    password: 'BossStore_BD_2026#',
    port: 5432
});

module.exports = pool;