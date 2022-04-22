const express = require('express');
const router = express.Router();


//////////////////////////////////////////////PG CODE START
const pg = require('pg');

const Pool = pg.Pool;
///////change this
const pool = new Pool({
  database: 'todoDB',
  host: 'localhost'
});
////////
pool.on('connect', () => {
  console.log('Yay! We are talking to our postgresql database!');
})

pool.on('error', (error) => {
  console.log('Something with postgresql really broke. It broke hard.', error);
})
//////////////////////////////////////////////PG CODE END


module.exports = router;