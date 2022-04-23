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

router.post('/', (req, res) => {
  console.log('POST /tasks');
  console.log('req.body ==>', req.body);
  let sqlQuery = `
  INSERT INTO "todo" 
	("task")
  VALUES 
  ($1);
  `;
  let sqlValues = [
    req.body.taskToAdd
  ];
  pool.query(sqlQuery, sqlValues)
  .then((dbResult) => {
    res.sendStatus(201);
  })
  .catch((dbError) => {
    console.log('error in POST /tasks db requests', dbError);
  })
});

router.delete('/:taskId', (req, res) => {
  console.log("DELETE /tasks");
  let taskToDelete = req.params.taskId;
  let sqlQuery = `
  DELETE FROM "todo"
  WHERE "id"=$1;
  `
  let sqlValues = [taskToDelete];
  pool.query(sqlQuery, sqlValues)
  .then((dbResult) => {
    res.sendStatus(200);
  })
  .catch((dbError) => {
    console.log('error in DELETE /tasks db request:', dbError);
    res.sendStatus(500);
  })
})

router.put('/:taskId', (req, res) => {
  console.log('PUT /tasks')
  let sqlQuery = `
  UPDATE "todo"
  SET "isComplete"=$1
  WHERE "id"=$2;
  `;
  let sqlValues = [
    req.body.taskStatus,
    req.params.taskId
  ]
  pool.query(sqlQuery,sqlValues)
  .then((dbResult) => {
    res.sendStatus(200);
  })
  .catch((dbError) => {
    console.log('error in PUT /tasks db request:', dbError);
    res.sendStatus(500);
  })
})

module.exports = router;