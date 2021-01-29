USE [Ribboned]
GO
SET IDENTITY_INSERT [UserProfile] ON
INSERT INTO [UserProfile]
  ([Id], [UserName], [Email], [ImageUrl], [FirebaseUserId], [uncategorizedId])
VALUES 
  (1, 'cornelia', 'cornelia@gmail.com', null, 'Q75GIr0mwsZNbWUawJUXKuxz3aK2', 1),
  (2, 'maggie', 'maggie@gmail.com', null, 'B63utnxScVcvmSVmXJge0dGicoT2', 2),
  (3, 'whitney', 'whitney@gmail.com', null, 'GEaiQvPXV7SoEFC7kXFNW9a0F7Q2', 3);
SET IDENTITY_INSERT [UserProfile] OFF

SET IDENTITY_INSERT [Source] ON
INSERT INTO [Source]
([Id], [Type])
VALUES (1, 'Other'),
(2, 'YouTube'),
(3, 'Local');
SET  IDENTITY_INSERT [Source] OFF

SET IDENTITY_INSERT [Category] ON
INSERT INTO [Category] 
([Id], [Name], [UserProfileId])
VALUES (1, 'Other', 1),(2, 'Other', 2), (3, 'Other', 3), (4, 'Tech', 1);
SET IDENTITY_INSERT [Category] OFF

SET IDENTITY_INSERT [Snag] ON
INSERT INTO [Snag]
([Id], [RibbonId], [DateCreated], [Note], [Seconds], [TimeString])
VALUES (1, 1,'2020-06-12', 'Note One', 30, '00:30'),
(2,1, '2020-06-13', 'Note Two', 45, '00:45'),
(3,2, '2020-06-14', 'Note Free', 65, '01:05');
SET IDENTITY_INSERT [Snag] OFF

SET IDENTITY_INSERT [Ribbon] ON
INSERT INTO [Ribbon]
([Id], [Title], [Decription],[SourceId],[CategoryId],[URL],[DateCreated], [Thumbnail],[isActive], [isPublic])
VALUES (1, 'Web Development In 2021', 'Web Development will change in 2021. And industries will. Here is what you should know as a web developer in 2021!', 2, 2, 'https://youtu.be/MLIKTBvgAGY', '2020-03-15', 'http://img.youtube.com/vi/MLIKTBvgAGY/hqdefault.jpg', 1, 1),
(2, 'Teaching myself to code and becoming a software engineer', 'Ill be sharing how I went from making $37.5K as a Business Analyst to over $125K+ by teaching myself how to code and became a self taught software engineer. Ill be sharing insights into software engineering salaries in this video as well, so stay tuned.', 2, 2, 'https://youtu.be/NyCyknm_n8M', '2020-03-15', 'http://img.youtube.com/vi/NyCyknm_n8M/hqdefault.jpg',1,0);
SET IDENTITY_INSERT [Ribbon] OFF