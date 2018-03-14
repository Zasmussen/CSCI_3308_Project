DROP TABLE QuestScores	;
 CREATE TABLE QuestScores
   (
   	userID	int 	NOT NULL,
   	Score 	int 	NULL,
   	PRIMARY KEY ( userID )  
   )
   CHARACTER SET utf8 COLLATE utf8_general_ci;