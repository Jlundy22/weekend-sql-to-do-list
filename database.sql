DROP TABLE IF EXISTS "todo";

CREATE TABLE "todo" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (250) NOT NULL,
	"isComplete" BOOLEAN DEFAULT FALSE
 );

TRUNCATE TABLE "todo";

INSERT INTO "todo" 
	("task")
VALUES 
	('Brush Dog'),
	('Brush teeth'),
	('Brush hair');
	

	

