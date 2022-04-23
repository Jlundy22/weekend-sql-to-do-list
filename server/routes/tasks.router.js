const express = require('express');
const router = express.Router();

//////////////////////////////////////////////PG CODE START
const pg = require('pg');

const Pool = pg.Pool;

const pool = new Pool({
  database: 'todoDB',
  host: 'localhost'
});
pool.on('connect', () => {
  console.log('Yay! We are talking to our postgresql database!');
})

pool.on('error', (error) => {
  console.log('Something with postgresql really broke. It broke hard.', error);
})
//////////////////////////////////////////////PG CODE END
router.get('/', (req, res) => {
  console.log("GET /tasks");
  let queryText = `
  SELECT * FROM "todo";
  `;
  pool.query(queryText)
  .then((dbResult) => {
    //console.log(dbResult.rows)
    res.send(dbResult.rows)
  })
  .catch((dbError) => {
    console.log('error in GET /tasks db request:', dbError);
    res.sendStatus(500)
  })
})

module.exports = router;