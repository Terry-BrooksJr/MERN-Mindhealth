CREATE DATABASE IF NOT EXISTS `nodelogin` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `nodelogin`;

CREATE TABLE IF NOT EXISTS `accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_first_name` varchar(100) NOT NULL,
  `user_last_name` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=250 DEFAULT CHARSET=utf8;

insert into `accounts` (`username`, `password`, user_first_name, user_last_name) values ('dnathwani', 'dnathw2', 'Dhara', 'Nathwani');
insert into `accounts` (`username`, `password`, user_first_name, user_last_name) values ('tbrooks', 'sm6VUenh6', 'Terry', 'Brooks');
