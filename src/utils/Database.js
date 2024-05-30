const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  host: process.env.DBHOST,
  port: 5433,
  database: process.env.DBNAME,
});

module.exports = pool;
