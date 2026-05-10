const { Pool } = require('pg'); 
const pool = new Pool({ connectionString: 'postgres://greenscore_user:greenscore_pass@localhost:5432/greenscore' }); 

async function test() {
  try {
    const res = await pool.query(`INSERT INTO companies (name, gstin, sector, annual_revenue_cr, state, city, email, password_hash) VALUES ('test', null, 'test', 10, null, null, 'test2@test.com', 'hash') RETURNING id, name, email, sector, role`);
    console.log(res.rows[0]);
  } catch(e) {
    console.error(e);
  } finally {
    pool.end();
  }
}
test();
