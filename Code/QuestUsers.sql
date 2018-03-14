DROP TABLE   QuestUsers  ;
 CREATE TABLE   QuestUsers
   (
   userID   int   NOT NULL,
   UserName    varchar(40)    NOT NULL,
   Email    varchar(200)    NOT NULL,
   Password    varchar(40)    NOT NULL,
   PRIMARY KEY ( userID )  
   ) 
   CHARACTER SET utf8 COLLATE utf8_general_ci;
