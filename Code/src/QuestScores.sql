DROP TABLE QuestScores	;
 CREATE TABLE QuestScores
   (
   	userID	int 	NOT NULL AUTO_INCREMENT,
	  games   int   NOT NULL,
   	Score 	float(7,2) 	NULL,
   	PRIMARY KEY ( userID )
   )
   CHARACTER SET utf8 COLLATE utf8_general_ci;

   INSERT INTO QuestScores VALUES (1, 0 ,0);
   INSERT INTO QuestScores VALUES (2, 0, 0);
   INSERT INTO QuestScores VALUES (3, 0, 0);
   INSERT INTO QuestScores VALUES (4, 0, 0);
   INSERT INTO QuestScores VALUES (5, 0, 0);
   INSERT INTO QuestScores VALUES (6, 0, 0);
