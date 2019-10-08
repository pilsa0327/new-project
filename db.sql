CREATE TABLE `user_info` (
  `num` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(15) NOT NULL UNIQUE,
  `password` varchar(100) NOT NULL, 
  PRIMARY KEY (`num`)
);