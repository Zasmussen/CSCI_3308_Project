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

INSERT INTO QuestUsers VALUES (1, "Bekah", "reha8209@colorado.edu", "Bekah");
INSERT INTO QuestUsers VALUES (2, "Jorge", "jorge.pulidolopez@colorado.edu", "Jorge");
INSERT INTO QuestUsers VALUES (3, "Zach", "zachary.asmussen@colorado.edu", "Zach");
INSERT INTO QuestUsers VALUES (4, "Haotian", "haotian.zheng@colorado.edu", "Haotian");
INSERT INTO QuestUsers VALUES (5, "Theo", "theodore.margoles@colorado.edu", "Theo");
INSERT INTO QuestUsers VALUES (6, "Binpeng", "binpeng.wu@colorado.edu", "Binpeng");