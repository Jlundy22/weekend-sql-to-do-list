TRUNCATE TABLE "todo";
DROP TABLE "todo";

CREATE TABLE "todo" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (250) NOT NULL,
	"isComplete" BOOLEAN DEFAULT FALSE
 );

INSERT INTO "todo" 
	("task")
VALUES 
	('Brush Dog'),
	('Brush teeth'),
	('Brush hair');
	

	

