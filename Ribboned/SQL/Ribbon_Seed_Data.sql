USE [Ribboned]
GO

SET IDENTITY_INSERT [Avatar] ON
INSERT INTO [Avatar]
([Id], [ImageURL])
VALUES (1, 'https://firebasestorage.googleapis.com/v0/b/ribboned-50daf.appspot.com/o/avatars%2Favatar0.png?alt=media&token=82e10059-6c7d-41c6-99a6-87dbece9a74d'),
(2, 'https://firebasestorage.googleapis.com/v0/b/ribboned-50daf.appspot.com/o/avatars%2Favatar1.jpg?alt=media&token=d090cbf5-7604-4379-a51d-92277de3d1a8'),
(3, 'https://firebasestorage.googleapis.com/v0/b/ribboned-50daf.appspot.com/o/avatars%2Favatar10.jpg?alt=media&token=42219bee-838c-4829-a069-2eab3c36dc52'),
(4, 'https://firebasestorage.googleapis.com/v0/b/ribboned-50daf.appspot.com/o/avatars%2Favatar11.jpg?alt=media&token=2e331f78-59fc-4b37-8efc-ec8ecc6453e8'),
(5, 'https://firebasestorage.googleapis.com/v0/b/ribboned-50daf.appspot.com/o/avatars%2Favatar12.jpg?alt=media&token=3aa5ec80-87e6-4a4e-957c-b1e7061bc7e8'),
(6, 'https://firebasestorage.googleapis.com/v0/b/ribboned-50daf.appspot.com/o/avatars%2Favatar6.jpg?alt=media&token=d05b11b5-135e-424d-b149-bfe310abd850'),
(7, 'https://firebasestorage.googleapis.com/v0/b/ribboned-50daf.appspot.com/o/avatars%2Favatar14.jpg?alt=media&token=ce05ab4e-c4bf-4cbf-8314-122b2cd9552c'),
(8, 'https://firebasestorage.googleapis.com/v0/b/ribboned-50daf.appspot.com/o/avatars%2Favatar15.jpg?alt=media&token=f42eb054-4310-4d97-88e2-4764c3a2c4c7'),
(9, 'https://firebasestorage.googleapis.com/v0/b/ribboned-50daf.appspot.com/o/avatars%2Favatar16.jpg?alt=media&token=ada259da-cc4b-48ab-92c8-c74f0e1017d8'),
(10,'https://firebasestorage.googleapis.com/v0/b/ribboned-50daf.appspot.com/o/avatars%2Favatar17.jpg?alt=media&token=df0aa738-1e7a-4adf-a55b-b9b098b125d7'),
(11,'https://firebasestorage.googleapis.com/v0/b/ribboned-50daf.appspot.com/o/avatars%2Favatar18.jpg?alt=media&token=da773fa3-b0d8-4502-8f2b-257a7d1ff13a'),
(12,'https://firebasestorage.googleapis.com/v0/b/ribboned-50daf.appspot.com/o/avatars%2Favatar2.jpg?alt=media&token=8b8f40dd-60f5-430c-918e-caa37b1940f7'),
(13,'https://firebasestorage.googleapis.com/v0/b/ribboned-50daf.appspot.com/o/avatars%2Favatar3.jpg?alt=media&token=5a2a2e89-0fa3-4992-bfbc-405a86b6e316'),
(14,'https://firebasestorage.googleapis.com/v0/b/ribboned-50daf.appspot.com/o/avatars%2Favatar4.jpg?alt=media&token=597737e2-7b5c-4b7e-835d-848b5b7709b9'),
(15,'https://firebasestorage.googleapis.com/v0/b/ribboned-50daf.appspot.com/o/avatars%2Favatar5.jpg?alt=media&token=e414a239-29a9-4990-8f13-ee570c4d9560'),
(16,'https://firebasestorage.googleapis.com/v0/b/ribboned-50daf.appspot.com/o/avatars%2Favatar5.jpg?alt=media&token=e414a239-29a9-4990-8f13-ee570c4d9560'),
(17,'https://firebasestorage.googleapis.com/v0/b/ribboned-50daf.appspot.com/o/avatars%2Favatar7.jpg?alt=media&token=5bd637b4-6bc0-4510-9a5c-c9fa8eca1e64'),
(18,'https://firebasestorage.googleapis.com/v0/b/ribboned-50daf.appspot.com/o/avatars%2Favatar8.jpg?alt=media&token=802f1d1a-d077-4060-b0e3-e843ebe8f3fd'),
(19,'https://firebasestorage.googleapis.com/v0/b/ribboned-50daf.appspot.com/o/avatars%2Favatar9.jpg?alt=media&token=87d2d8d3-1e92-48b0-ba93-c1390ea13dc0');
SET  IDENTITY_INSERT [Avatar] OFF

SET IDENTITY_INSERT [UserProfile] ON
INSERT INTO [UserProfile]
  ([Id], [UserName], [Email], [AvatarId], [FirebaseUserId], [UncategorizedId])
VALUES 
  (1, 'cornelia', 'cornelia@gmail.com', 1, 'Q75GIr0mwsZNbWUawJUXKuxz3aK2', 1),
  (2, 'maggie', 'maggie@gmail.com', 1, 'B63utnxScVcvmSVmXJge0dGicoT2', 2),
  (3, 'whitney', 'whitney@gmail.com', 1, 'GEaiQvPXV7SoEFC7kXFNW9a0F7Q2', 3);
SET IDENTITY_INSERT [UserProfile] OFF

SET IDENTITY_INSERT [Source] ON
INSERT INTO [Source]
([Id], [Type])
VALUES (1, 'Other'),
(2, 'YouTube'),
(3, 'Local File');
SET  IDENTITY_INSERT [Source] OFF

SET IDENTITY_INSERT [Category] ON
INSERT INTO [Category] 
([Id], [Name], [UserProfileId])
VALUES (1, 'uncategorized', 1),(2, 'uncategorized', 2), (3, 'uncategorized', 3), (4, 'Tech', 1);
SET IDENTITY_INSERT [Category] OFF

SET IDENTITY_INSERT [Ribbon] ON
INSERT INTO [Ribbon]
([Id], [Title], [Decription],[SourceId],[CategoryId],[URL],[DateCreated], [Thumbnail],[isActive], [isPublic])
VALUES (1, 'Web Development In 2021', 'Web Development will change in 2021. And industries will. Here is what you should know as a web developer in 2021!', 2, 2, 'https://youtu.be/MLIKTBvgAGY', '2020-03-15', 'http://img.youtube.com/vi/MLIKTBvgAGY/hqdefault.jpg', 1, 1),
(2, 'Teaching myself to code and becoming a software engineer', 'Ill be sharing how I went from making $37.5K as a Business Analyst to over $125K+ by teaching myself how to code and became a self taught software engineer. Ill be sharing insights into software engineering salaries in this video as well, so stay tuned.', 2, 2, 'https://youtu.be/NyCyknm_n8M', '2020-03-15', 'http://img.youtube.com/vi/NyCyknm_n8M/hqdefault.jpg',1,0);
SET IDENTITY_INSERT [Ribbon] OFF

SET IDENTITY_INSERT [Snag] ON
INSERT INTO [Snag]
([Id], [RibbonId], [DateCreated], [Note], [Seconds], [TimeString])
VALUES (1, 1,'2020-06-12', 'Note One', 30, '00:30'),
(2,1, '2020-06-13', 'Note Two', 45, '00:45'),
(3,2, '2020-06-14', 'Note Free', 65, '01:05');
SET IDENTITY_INSERT [Snag] OFF
