CREATE TABLE `user_info` (
  `num` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(15) NOT NULL UNIQUE,
  `password` varchar(100) NOT NULL, 
  PRIMARY KEY (`num`)
);
CREATE TABLE `sns_info` (
  `num` int(11) NOT NULL AUTO_INCREMENT,
  `id` varchar(20) NOT NULL,
  `email` varchar(40) NOT NULL UNIQUE,
  `provider` varchar(15) NOT NULL,
  PRIMARY KEY (`num`)
);