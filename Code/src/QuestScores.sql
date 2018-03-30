DROP TABLE QuestScores	;
 CREATE TABLE QuestScores
   (
   	userID	int 	NOT NULL,
   	Score 	float(7,2) 	NULL,
   	PRIMARY KEY ( userID )
   )
   CHARACTER SET utf8 COLLATE utf8_general_ci;

   INSERT INTO QuestScores VALUES (1, 123.4);
   INSERT INTO QuestScores VALUES (2, 5.67);
   INSERT INTO QuestScores VALUES (3, 89.0);
   INSERT INTO QuestScores VALUES (4, 12.3);
   INSERT INTO QuestScores VALUES (5, 45.6);
   INSERT INTO QuestScores VALUES (6, 78.9);
