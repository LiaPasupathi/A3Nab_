-- MySQL dump 10.13  Distrib 5.7.33, for Linux (x86_64)
--
-- Host: localhost    Database: a3nab_new
-- ------------------------------------------------------
-- Server version	5.7.33-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Admin`
--

DROP TABLE IF EXISTS `Admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `roleId` int(11) DEFAULT NULL,
  `firstName` varchar(255) NOT NULL DEFAULT '',
  `lastName` varchar(255) NOT NULL DEFAULT '',
  `password` varchar(255) NOT NULL,
  `dob` date DEFAULT NULL,
  `profilePic` varchar(255) DEFAULT NULL,
  `countryCode` int(5) DEFAULT NULL,
  `mobileNumber` varchar(20) DEFAULT NULL,
  `role` varchar(10) DEFAULT 'admin',
  `account` char(50) NOT NULL DEFAULT 'false',
  `level1` char(50) NOT NULL DEFAULT 'false',
  `level2` char(50) DEFAULT 'false',
  `level3` char(50) NOT NULL DEFAULT 'false',
  `isDelete` int(11) DEFAULT '0',
  `superAdmin` char(50) DEFAULT 'false',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Admin`
--

LOCK TABLES `Admin` WRITE;
/*!40000 ALTER TABLE `Admin` DISABLE KEYS */;
INSERT INTO `Admin` VALUES (1,'superadmin3@a3nab.com',1,'','','hKp5gOVfKaRdDAtQ9Ira2w==$k9+oHOlv0eA9xoeakontvXzkmz0y3z89H7WKEJJuu6EcnkrhtpqzAlUOxsIvV+kM/I6M+bvgU7c3Lplxn2DKfw==',NULL,NULL,971,'6543210','superadmin','false','false','false','false',0,'false','2021-03-07 16:26:27','2020-09-29 14:46:41'),(2,'abbas@gmail.com',1,'Abbas','s','Je997VZG76Yx5ssJuEyTCQ==$DwRKw/5Rzn1x8s0O4T/aN/aRNmxguKJMU48lm89os6yQnUYMCW5MPr+mG6rksXCDNzG1eO+RGwbhi7fIuc2tdA==','1994-01-11',NULL,NULL,'321334','admin','true','true','true','false',2,'true','2021-03-07 16:26:27','2021-02-19 13:02:49'),(3,'ganesh@gmail.com',1,'Ganesh','kumar','gSWyAzx8fYdP5nW+MlvtaA==$yyzyj2iL0fIfenTWYaNERKRfvTJi34X0CIcBEETOR+6m5PIo/7jRqdUUrdqAMTYu5B+49jgBi8aN8ZhHMk04QQ==','2021-02-01',NULL,NULL,'123456','admin','true','false','false','true',3,'false','2021-03-07 16:26:27','2021-02-20 06:35:24'),(4,'ganesh@ggg.com',1,'Ganesh','Kumar','aba8gz6hTm3ei4apOj+nmg==$KT5wDdTNOWHhHkbctLngb8zV3BX4QnvCGUAmUv1IyydRjy9zS5ROi7UHqiZgGJCWRJ1IskmlHi7H+/BxFDdKBw==','2020-12-09',NULL,NULL,'34555','admin','true','true','true','true',4,'true','2021-03-07 16:26:27','2021-02-20 09:34:24'),(5,'ganeshkkk@gmail.com',1,'Ganesh','Kumar','5dHt60wLMfawnkx94kvvhA==$Bn1kZlKR6+0yn/psrsADwoD+femL9iNbd0aVhcXi1GXcQN+tAtYdiu5n+pYQd9tuG1VMESU0CTBLDGz80+xn4w==','2020-12-07',NULL,NULL,'908787687','admin','true','true','false','true',0,'true','2021-03-07 16:26:27','2021-02-20 09:35:13'),(6,'gk@gmail.com',1,'Kumar','Ganesh','BOUuAu8LZ331LU5TG5Ff9w==$vQ52LPv/LuUS6AM95qDBJzkgtCGZOlh6RClW99skdA5fuGexbKepUxuRIIEE357QXsYx4JWXKH5B09bkIRHepg==','1994-08-08',NULL,NULL,'9087654432','admin','false','false','true','true',0,'true','2021-03-07 16:26:27','2021-02-20 09:36:00'),(7,'gk@gmai.com',1,'Gk','k','SbcAJyn/G+2kgd2L4GUJ7A==$xWr5xhvQKNPiN7628CVMaOJUVvHh3dxt8MlB9E2EyRZuLCw5mo0yQPmH4bIqZCQXAwcpKG5mruh2hXbYVWfWVA==','1996-03-13',NULL,NULL,'1231432','admin','true','true','true','true',1,'true','2021-03-07 16:26:27','2021-02-22 04:39:09'),(8,'test@gmail.com',3,'Test','sde','7N8t6CMoY49n5NK5IuExLQ==$KPSkGaYA42zaA3BIVU/eT2hFYFL38lI37uH7hMj8uMJuHFvdNiR2T0GMHBu3OtY+2VYON3qYj8B3lNIfDmvL3g==','2021-03-02',NULL,NULL,'12345660','admin','false','false','false','false',0,'false','2021-03-12 13:09:39','2021-03-10 07:17:17');
/*!40000 ALTER TABLE `Admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `adminNotification`
--

DROP TABLE IF EXISTS `adminNotification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `adminNotification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `carId` int(11) DEFAULT NULL,
  `driverId` int(11) DEFAULT NULL,
  `maintenanceId` int(11) DEFAULT NULL,
  `type` char(50) NOT NULL DEFAULT '',
  `textMessage` varchar(512) NOT NULL DEFAULT '',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adminNotification`
--

LOCK TABLES `adminNotification` WRITE;
/*!40000 ALTER TABLE `adminNotification` DISABLE KEYS */;
INSERT INTO `adminNotification` VALUES (1,1,1,1,'maintenance','Test','2021-02-18 11:37:33','2021-02-18 11:37:33'),(2,2,1,NULL,'returnCar','','2021-02-18 11:54:05','2021-02-18 11:54:05'),(3,10,12,1,'maintenance','Feb','2021-02-22 09:21:29','2021-02-22 09:21:29'),(4,10,12,NULL,'returnCar','','2021-02-22 09:47:45','2021-02-22 09:47:45'),(5,5,5,NULL,'returnCar','','2021-02-23 09:28:34','2021-02-23 09:28:34'),(6,4,4,1,'maintenance','hdhs','2021-02-23 19:15:57','2021-02-23 19:15:57'),(7,6,6,1,'maintenance','yyy','2021-03-04 09:02:52','2021-03-04 09:02:52'),(8,2,3,1,'maintenance','General Service','2021-03-06 07:10:41','2021-03-06 07:10:41'),(9,2,3,1,'maintenance','temp','2021-03-06 08:22:23','2021-03-06 08:22:23'),(10,2,3,1,'maintenance','Air Conditioning need to be prepared','2021-03-06 08:55:21','2021-03-06 08:55:21'),(11,2,3,1,'maintenance','General Service','2021-03-06 09:47:30','2021-03-06 09:47:30'),(12,2,3,1,'maintenance','hshsbs','2021-03-06 09:47:50','2021-03-06 09:47:50'),(13,3,4,NULL,'returnCar','','2021-03-06 11:17:33','2021-03-06 11:17:33'),(14,2,3,NULL,'returnCar','','2021-03-06 11:19:55','2021-03-06 11:19:55'),(15,1,2,NULL,'returnCar','','2021-03-08 10:30:53','2021-03-08 10:30:53'),(16,1,2,1,'maintenance','hdhdhshsushshhdhd','2021-03-09 16:16:08','2021-03-09 16:16:08'),(17,1,1,1,'maintenance','gsgsg','2021-03-15 09:48:06','2021-03-15 09:48:06'),(18,1,1,NULL,'returnCar','','2021-03-15 09:48:12','2021-03-15 09:48:12');
/*!40000 ALTER TABLE `adminNotification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `appFeedback`
--

DROP TABLE IF EXISTS `appFeedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `appFeedback` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `apps` char(50) NOT NULL,
  `commemts` varchar(255) NOT NULL,
  `userId` int(11) NOT NULL,
  `rating` float(10,1) DEFAULT '0.0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `appFeedback_fk0` (`userId`),
  CONSTRAINT `appFeedback_fk0` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appFeedback`
--

LOCK TABLES `appFeedback` WRITE;
/*!40000 ALTER TABLE `appFeedback` DISABLE KEYS */;
INSERT INTO `appFeedback` VALUES (1,'android','test',5,3.0,'2021-03-08 08:15:24','2021-03-08 08:15:24'),(2,'iOS','Bbb',4,1.0,'2021-03-12 04:57:09','2021-03-12 04:57:09'),(3,'android','bb',4,0.5,'2021-03-16 12:31:53','2021-03-16 12:31:53');
/*!40000 ALTER TABLE `appFeedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `appSettings`
--

DROP TABLE IF EXISTS `appSettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `appSettings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `radius` float(10,2) NOT NULL,
  `instagramURL` varchar(191) NOT NULL DEFAULT '',
  `facebookURL` varchar(191) NOT NULL DEFAULT '',
  `linkedURL` varchar(191) NOT NULL DEFAULT '',
  `twitterURL` varchar(191) NOT NULL DEFAULT '',
  `minimumOrderValue` float(10,2) NOT NULL DEFAULT '0.00',
  `quickDelivery` char(50) NOT NULL DEFAULT 'false',
  `walletAmount` float(10,2) NOT NULL DEFAULT '0.00',
  `expiryDate` int(11) NOT NULL DEFAULT '0',
  `taxAmount` float(10,2) DEFAULT '0.00',
  `walletSAR` int(11) NOT NULL DEFAULT '0',
  `flatRate` float(10,2) NOT NULL DEFAULT '0.00',
  `perKM` float(10,2) DEFAULT '0.00',
  `QuickDeliveryPerKM` float(10,2) NOT NULL DEFAULT '0.00',
  `walletPoints` float(10,2) NOT NULL DEFAULT '0.00',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updateAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appSettings`
--

LOCK TABLES `appSettings` WRITE;
/*!40000 ALTER TABLE `appSettings` DISABLE KEYS */;
INSERT INTO `appSettings` VALUES (1,25.00,'cdcdcdfewf','facebook.com','sdfewef','twitter.wfcom',90.00,'true',1000.00,0,15.00,1,12.00,5.00,3.00,2000.00,'2021-03-15 12:57:45','2021-03-15 12:57:45');
/*!40000 ALTER TABLE `appSettings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `billingCyle`
--

DROP TABLE IF EXISTS `billingCyle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `billingCyle` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `storeId` int(11) NOT NULL,
  `fromDate` date NOT NULL,
  `toDate` date NOT NULL,
  `paidStatus` int(11) NOT NULL DEFAULT '0',
  `document` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `billingCyle_fk0` (`storeId`),
  CONSTRAINT `billingCyle_fk0` FOREIGN KEY (`storeId`) REFERENCES `store` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `billingCyle`
--

LOCK TABLES `billingCyle` WRITE;
/*!40000 ALTER TABLE `billingCyle` DISABLE KEYS */;
INSERT INTO `billingCyle` VALUES (1,1,'2021-02-15','2021-03-15',0,'http://65.1.122.8/uploads/uploaded_file-1615188922921.jpg','2021-03-08 07:35:23','2021-03-08 07:35:23'),(2,1,'2021-02-15','2021-03-15',0,'http://65.1.122.8/uploads/uploaded_file-1615188986384.jpg','2021-03-08 07:36:26','2021-03-08 07:36:26'),(3,1,'2021-02-15','2021-03-15',0,'http://65.1.122.8/uploads/uploaded_file-1615189033009.jpg','2021-03-08 07:37:13','2021-03-08 07:37:13'),(4,1,'2021-02-15','2021-03-15',0,'http://65.1.122.8/uploads/uploaded_file-1615189038625.jpg','2021-03-08 07:37:18','2021-03-08 07:37:18'),(5,4,'2021-03-10','2021-04-10',0,'http://65.1.122.8/uploads/uploaded_file-1615525102084.jpg','2021-03-12 04:58:22','2021-03-12 04:58:22'),(6,4,'2021-03-10','2021-04-10',0,'http://65.1.122.8/uploads/uploaded_file-1615525103145.jpg','2021-03-12 04:58:23','2021-03-12 04:58:23'),(7,4,'2021-03-10','2021-04-10',0,'http://65.1.122.8/uploads/uploaded_file-1615555216504.jpg','2021-03-12 13:20:16','2021-03-12 13:20:16'),(8,4,'2021-03-10','2021-04-10',0,'http://65.1.122.8/uploads/uploaded_file-1615556251522.jpg','2021-03-12 13:37:31','2021-03-12 13:37:31'),(9,4,'2021-03-10','2021-04-10',0,'http://65.1.122.8/uploads/uploaded_file-1615802758196.jpg','2021-03-15 10:05:58','2021-03-15 10:05:58'),(10,3,'2021-02-10','2021-03-10',0,'http://65.1.122.8/uploads/uploaded_file-1615889745756.jpg','2021-03-16 10:15:45','2021-03-16 10:15:45'),(11,3,'2021-02-10','2021-03-10',0,'http://65.1.122.8/uploads/uploaded_file-1615889745961.jpg','2021-03-16 10:15:46','2021-03-16 10:15:46'),(12,3,'2021-02-10','2021-03-10',0,'http://65.1.122.8/uploads/uploaded_file-1615889746170.jpg','2021-03-16 10:15:46','2021-03-16 10:15:46'),(13,3,'2021-02-10','2021-03-10',0,'http://65.1.122.8/uploads/uploaded_file-1615889755926.jpg','2021-03-16 10:15:56','2021-03-16 10:15:56'),(14,3,'2021-02-10','2021-03-10',0,'http://65.1.122.8/uploads/uploaded_file-1615889757509.jpg','2021-03-16 10:15:57','2021-03-16 10:15:57'),(15,3,'2021-02-10','2021-03-10',0,'http://65.1.122.8/uploads/uploaded_file-1615889757284.jpg','2021-03-16 10:15:57','2021-03-16 10:15:57'),(16,3,'2021-02-10','2021-03-10',0,'http://65.1.122.8/uploads/uploaded_file-1615889757722.jpg','2021-03-16 10:15:57','2021-03-16 10:15:57'),(17,3,'2021-02-10','2021-03-10',0,'http://65.1.122.8/uploads/uploaded_file-1615889757107.jpg','2021-03-16 10:15:57','2021-03-16 10:15:57');
/*!40000 ALTER TABLE `billingCyle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `boxStyle`
--

DROP TABLE IF EXISTS `boxStyle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `boxStyle` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `productId` int(11) NOT NULL,
  `boxName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `arabicName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `boxPrice` float(10,2) NOT NULL,
  `activeStatus` int(11) DEFAULT '1',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `boxStyle_fk0` (`productId`),
  CONSTRAINT `boxStyle_fk0` FOREIGN KEY (`productId`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boxStyle`
--

LOCK TABLES `boxStyle` WRITE;
/*!40000 ALTER TABLE `boxStyle` DISABLE KEYS */;
INSERT INTO `boxStyle` VALUES (1,2,'Family - XL','الأسرة - XL',180.00,1,'2021-03-06 08:34:15','2021-03-06 08:34:15');
/*!40000 ALTER TABLE `boxStyle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carDamages`
--

DROP TABLE IF EXISTS `carDamages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carDamages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `carId` int(11) NOT NULL,
  `driverId` int(11) DEFAULT NULL,
  `returnId` int(45) NOT NULL,
  `addedBy` varchar(50) NOT NULL DEFAULT '',
  `DamageReason` varchar(255) NOT NULL DEFAULT '',
  `carMileage` float NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `carDamages_fk1` (`driverId`),
  KEY `carDamages_fk2` (`carId`),
  CONSTRAINT `carDamages_fk1` FOREIGN KEY (`driverId`) REFERENCES `driver` (`id`),
  CONSTRAINT `carDamages_fk2` FOREIGN KEY (`carId`) REFERENCES `cars` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carDamages`
--

LOCK TABLES `carDamages` WRITE;
/*!40000 ALTER TABLE `carDamages` DISABLE KEYS */;
INSERT INTO `carDamages` VALUES (1,3,4,1,'DRIVER','test',20,'2021-03-06 11:17:33','2021-03-06 11:17:33'),(2,2,3,2,'DRIVER','nol',18,'2021-03-06 11:19:55','2021-03-06 11:19:55'),(3,1,2,3,'DRIVER','Too much Scratch',50000,'2021-03-08 10:30:53','2021-03-08 10:30:53'),(4,1,1,4,'DRIVER','hzbsg',949,'2021-03-15 09:48:12','2021-03-15 09:48:12');
/*!40000 ALTER TABLE `carDamages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cars`
--

DROP TABLE IF EXISTS `cars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cars` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `carID` varchar(191) NOT NULL DEFAULT '',
  `driverId` int(11) DEFAULT NULL,
  `carModel` varchar(191) NOT NULL DEFAULT '',
  `carImage` varchar(255) NOT NULL DEFAULT '',
  `licenseNumber` varchar(191) NOT NULL DEFAULT '',
  `lastDateOilChange` date DEFAULT NULL,
  `lastDateGasRefill` date DEFAULT NULL,
  `expirationDate` date DEFAULT NULL,
  `currentMileage` float(10,2) NOT NULL DEFAULT '0.00',
  `startingMileage` float(10,2) NOT NULL DEFAULT '0.00',
  `returnMileage` float(10,2) DEFAULT '0.00',
  `carStatus` int(11) NOT NULL DEFAULT '1',
  `deleteStatus` int(11) NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `cars_fk0` (`driverId`),
  CONSTRAINT `cars_fk0` FOREIGN KEY (`driverId`) REFERENCES `driver` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cars`
--

LOCK TABLES `cars` WRITE;
/*!40000 ALTER TABLE `cars` DISABLE KEYS */;
INSERT INTO `cars` VALUES (1,'#Car2421',1,'2020','http://65.1.122.8/uploads/uploaded_file-1615013006891.jpg','TN 18 AK 6807',NULL,NULL,'2025-11-12',0.00,15.00,949.00,1,0,'2021-03-06 06:43:27','2021-03-16 13:38:05'),(2,'#Car3633',1,'2021','http://65.1.122.8/uploads/uploaded_file-1615014418192.jpg','TN 18 AD 6746',NULL,NULL,'2025-05-07',0.00,18.00,0.00,1,0,'2021-03-06 07:06:58','2021-03-08 04:49:21'),(3,'#Car1306',3,'BMW','http://65.1.122.8/uploads/uploaded_file-1615017000224.jpg','wdjw',NULL,NULL,'2021-03-06',0.00,30.00,0.00,1,0,'2021-03-06 07:50:00','2021-03-08 04:48:36'),(4,'#Car1337',5,'Swift 2019','http://65.1.122.8/uploads/uploaded_file-1615186762877.jpg','TN 01 AS 7291',NULL,NULL,'2021-03-08',0.00,16.00,0.00,1,0,'2021-03-08 06:59:22','2021-03-08 06:59:28'),(5,'#Car3673',6,'2019','http://65.1.122.8/uploads/uploaded_file-1615187289259.jpg','TAN82',NULL,NULL,'2021-03-08',0.00,18.00,0.00,1,0,'2021-03-08 07:08:09','2021-03-08 07:08:15'),(6,'#Car5997',4,'Verna - 2010','http://65.1.122.8/uploads/uploaded_file-1615266835481.jpg','TN 22 BA 1240',NULL,NULL,'2021-03-17',0.00,65800.00,0.00,1,0,'2021-03-09 05:13:55','2021-03-12 13:24:32'),(7,'#Car8738',NULL,'efw','','qrewr',NULL,NULL,'2020-10-20',0.00,25.00,0.00,1,0,'2021-03-11 05:47:47','2021-03-11 05:47:47'),(8,'#Car5114',NULL,'efw','','qrewr',NULL,NULL,'2020-10-20',0.00,25.00,0.00,1,0,'2021-03-11 10:45:33','2021-03-11 10:45:33');
/*!40000 ALTER TABLE `cars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `storeId` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `specialInstructions` varchar(512) NOT NULL DEFAULT '',
  `cuttingStyle` int(11) DEFAULT NULL,
  `boxStyle` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `cart_fk0` (`userId`),
  KEY `cart_fk1` (`productId`),
  KEY `cart_fk2` (`storeId`),
  CONSTRAINT `cart_fk0` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `cart_fk1` FOREIGN KEY (`productId`) REFERENCES `product` (`id`),
  CONSTRAINT `cart_fk2` FOREIGN KEY (`storeId`) REFERENCES `store` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=173 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (71,5,7,4,6,'',NULL,NULL,'2021-03-12 06:05:21','2021-03-12 06:05:58'),(122,1,5,3,1,'',NULL,NULL,'2021-03-16 03:12:12','2021-03-16 03:12:12');
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `storeId` int(11) DEFAULT NULL,
  `categoryName` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `categoryImage` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `categoryStatus` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `minimum` int(11) DEFAULT '0',
  `cate_processingMin` int(11) NOT NULL DEFAULT '0',
  `arabicName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `isComingSoon` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `managerPrice` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `isDelete` varchar(11) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `orderProcessing` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `category_fk0` (`storeId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,1,'Breakfast','http://65.1.122.8/uploads/uploaded_file-1615012214400.jpg','active',30,10,'وجبة افطار','false','true','0','10','2021-03-06 06:30:14','2021-03-06 06:30:14'),(2,3,'Dinner','http://65.1.122.8/uploads/uploaded_file-1615180526993.jpg','active',100,10,'وجبة عشاء','false','true','0','10','2021-03-17 05:41:43','2021-03-08 05:15:27'),(3,4,'MRV Super Market','http://65.1.122.8/uploads/uploaded_file-1615441552333.jpg','active',100,10,'MRV سوبر ماركت','false','true','0','15','2021-03-11 05:45:52','2021-03-11 05:45:52');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `currency`
--

DROP TABLE IF EXISTS `currency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `currency` (
  `uuid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `status` tinyint(4) DEFAULT '1',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `currency`
--

LOCK TABLES `currency` WRITE;
/*!40000 ALTER TABLE `currency` DISABLE KEYS */;
/*!40000 ALTER TABLE `currency` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cuttingStyle`
--

DROP TABLE IF EXISTS `cuttingStyle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cuttingStyle` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `productId` int(11) NOT NULL,
  `cuttingName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `arabicName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `cuttingPrice` float(10,2) NOT NULL,
  `activeStatus` int(11) DEFAULT '1',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `cuttingStyle_fk0` (`productId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuttingStyle`
--

LOCK TABLES `cuttingStyle` WRITE;
/*!40000 ALTER TABLE `cuttingStyle` DISABLE KEYS */;
INSERT INTO `cuttingStyle` VALUES (1,2,'Round - Medium','مستدير',50.00,1,'2021-03-06 08:34:15','2021-03-06 08:34:15');
/*!40000 ALTER TABLE `cuttingStyle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `days`
--

DROP TABLE IF EXISTS `days`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `days` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dayName` varchar(50) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `days`
--

LOCK TABLES `days` WRITE;
/*!40000 ALTER TABLE `days` DISABLE KEYS */;
INSERT INTO `days` VALUES (1,'Monday','2021-02-09 09:22:00','2021-02-09 09:22:00'),(2,'Tuesday','2021-02-09 09:22:00','2021-02-09 09:22:00'),(3,'Wednesday','2021-02-09 09:22:00','2021-02-09 09:22:00'),(4,'Thursday','2021-02-09 09:22:00','2021-02-09 09:22:00'),(5,'Friday','2021-02-09 09:22:00','2021-02-09 09:22:00'),(6,'Saturday','2021-02-09 09:22:00','2021-02-09 09:22:00'),(7,'Sunday','2021-02-09 09:22:00','2021-02-09 09:22:00');
/*!40000 ALTER TABLE `days` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deliveryTime`
--

DROP TABLE IF EXISTS `deliveryTime`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `deliveryTime` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dayId` int(11) DEFAULT NULL,
  `fromTime` time DEFAULT NULL,
  `toTime` time DEFAULT NULL,
  `maxOrder` int(11) NOT NULL DEFAULT '0',
  `timeText` varchar(255) NOT NULL,
  `status` char(50) NOT NULL DEFAULT 'active',
  `timeDelete` int(11) NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `deliveryTime_fk0` (`dayId`),
  CONSTRAINT `deliveryTime_fk0` FOREIGN KEY (`dayId`) REFERENCES `days` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deliveryTime`
--

LOCK TABLES `deliveryTime` WRITE;
/*!40000 ALTER TABLE `deliveryTime` DISABLE KEYS */;
INSERT INTO `deliveryTime` VALUES (1,5,'21:09:00','22:10:00',20,'21-22','active',1,'2020-10-30 08:26:07','2021-02-22 07:18:37'),(2,1,'12:00:00','01:00:00',3,'12-01','active',1,'2020-12-07 10:03:15','2021-02-11 09:12:39'),(3,2,'12:00:00','13:00:00',0,'12-01','active',1,'2021-01-01 06:31:48','2021-02-11 10:12:55'),(4,2,'13:00:00','14:00:00',0,'01-02','active',0,'2021-01-01 06:31:48','2021-02-09 15:43:15'),(5,2,'14:00:00','15:00:00',0,'02-03','active',0,'2021-01-01 06:31:48','2021-02-09 15:43:20'),(6,3,'15:00:00','16:00:00',0,'03-04','active',0,'2021-01-01 06:31:48','2021-02-09 15:43:27'),(7,4,'16:00:00','17:00:00',0,'04-05','active',0,'2021-01-01 06:33:25','2021-02-09 15:43:33'),(8,5,'17:00:00','18:00:00',0,'05-06','active',0,'2021-01-01 06:33:25','2021-02-09 15:43:40'),(9,6,'18:00:00','19:00:00',0,'06-07','active',1,'2021-01-01 06:33:25','2021-02-11 10:16:28'),(10,7,'19:00:00','20:00:00',0,'07-08','active',0,'2021-01-01 06:33:25','2021-02-09 15:43:52'),(11,7,'20:00:00','21:00:00',0,'08-09','active',0,'2021-01-01 06:33:25','2021-02-09 15:43:57'),(12,1,'10:01:00','11:00:00',20,'10-11','active',1,'2021-02-09 16:27:45','2021-02-11 10:09:02'),(13,1,'10:02:00','11:00:00',20,'10-11','active',1,'2021-02-09 16:39:49','2021-02-11 10:56:34'),(14,1,'10:00:00','12:00:00',2,'10-12','active',1,'2021-02-10 06:58:33','2021-02-18 10:19:36'),(15,1,'06:00:00','07:00:00',10,'06-07','active',0,'2021-02-10 07:04:38','2021-02-18 10:38:23'),(16,4,'02:00:00','02:30:00',3,'02-02','active',0,'2021-02-10 07:10:07','2021-02-10 07:10:07'),(17,5,'03:00:00','03:30:00',3,'03-03','active',0,'2021-02-10 07:12:19','2021-02-10 07:12:19'),(18,7,'00:00:12','00:00:12',3,'12-12','active',1,'2021-02-10 07:16:06','2021-02-11 10:15:50'),(19,3,'00:00:00','02:00:00',3,'00-02','active',1,'2021-02-11 05:26:10','2021-02-11 10:14:32'),(20,6,'02:00:00','03:00:00',20,'02-03','active',0,'2021-02-11 10:18:00','2021-02-11 10:18:17'),(21,6,'09:00:00','10:00:00',20,'09-10','active',0,'2021-02-11 10:22:46','2021-02-11 10:22:46'),(22,1,'00:00:00','01:00:00',3,'00-01','active',1,'2021-02-11 10:33:44','2021-02-18 10:12:46'),(23,4,'05:00:00','09:00:00',23,'05-09','active',0,'2021-02-11 11:02:53','2021-02-22 07:38:07'),(24,2,'10:02:00','12:00:00',2,'10-12','active',0,'2021-02-18 10:08:08','2021-02-18 10:08:08'),(25,6,'07:00:00','08:00:00',29,'07-08','active',0,'2021-02-18 10:11:29','2021-02-22 07:39:11'),(26,1,'14:00:00','16:00:00',10,'14-16','active',1,'2021-02-18 10:14:26','2021-02-18 10:19:32'),(27,1,'12:00:00','14:00:00',20,'12-14','active',1,'2021-02-18 10:14:53','2021-02-18 10:17:01'),(28,1,'10:02:00','11:00:00',20,'10-11','active',1,'2021-02-18 10:16:49','2021-02-18 10:17:12'),(29,1,'20:01:00','21:02:00',2,'20-21','active',1,'2021-02-18 10:17:06','2021-02-18 10:17:20'),(30,1,'01:00:00','02:00:00',4,'01-02','active',1,'2021-02-18 10:19:54','2021-02-18 10:28:29'),(31,2,'21:00:00','22:02:00',5,'21-22','active',1,'2021-02-18 10:20:22','2021-02-22 07:37:30'),(32,7,'22:09:00','23:09:00',4,'22-23','active',0,'2021-02-18 10:24:47','2021-02-18 10:24:47'),(33,3,'23:00:00','24:00:00',1,'23-24','active',0,'2021-02-18 10:25:07','2021-02-18 10:25:07'),(34,1,'08:00:00','10:00:00',10,'8-10','active',0,'2021-02-18 14:42:28','2021-02-18 14:42:28'),(35,2,'22:00:00','22:01:00',3,'22-22','active',1,'2021-02-19 08:11:23','2021-02-22 07:36:11'),(36,5,'00:00:00','00:01:00',90,'00-00','active',0,'2021-02-22 07:19:23','2021-02-22 07:39:20'),(37,3,'09:09:00','20:08:00',27,'09-20','active',0,'2021-02-22 07:19:53','2021-02-22 07:19:53'),(38,1,'21:09:00','22:09:00',24,'21-22','active',0,'2021-02-22 07:37:48','2021-02-22 07:37:48'),(39,1,'10:02:00','11:00:00',20,'10-11','active',0,'2021-02-23 06:11:28','2021-02-23 06:11:28'),(40,1,'06:01:00','07:00:00',2,'06-07','active',0,'2021-03-12 13:06:04','2021-03-12 13:06:04');
/*!40000 ALTER TABLE `deliveryTime` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deliveryUsers`
--

DROP TABLE IF EXISTS `deliveryUsers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `deliveryUsers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `routeId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `orderId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL,
  `storeId` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` float(10,2) DEFAULT NULL,
  `discount` float(10,2) DEFAULT NULL,
  `supplyPrice` float(10,2) DEFAULT NULL,
  `isPickUp` int(11) NOT NULL DEFAULT '0',
  `receipt` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `deliveryUsers_fk0` (`routeId`),
  KEY `deliveryUsers_fk1` (`userId`),
  KEY `deliveryUsers_fk2` (`storeId`),
  KEY `deliveryUsers_fk3` (`orderId`),
  KEY `deliveryUsers_fk5` (`productId`),
  CONSTRAINT `deliveryUsers_fk0` FOREIGN KEY (`routeId`) REFERENCES `driverOrders` (`id`),
  CONSTRAINT `deliveryUsers_fk1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `deliveryUsers_fk2` FOREIGN KEY (`storeId`) REFERENCES `store` (`id`),
  CONSTRAINT `deliveryUsers_fk3` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`),
  CONSTRAINT `deliveryUsers_fk5` FOREIGN KEY (`productId`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deliveryUsers`
--

LOCK TABLES `deliveryUsers` WRITE;
/*!40000 ALTER TABLE `deliveryUsers` DISABLE KEYS */;
INSERT INTO `deliveryUsers` VALUES (1,1,1,2,4,1,5,90.00,5.00,427.50,1,NULL,'2021-03-06 15:37:42','2021-03-08 07:04:15'),(2,1,1,2,4,1,5,90.00,5.00,427.50,1,NULL,'2021-03-07 10:01:55','2021-03-08 07:04:25'),(3,1,1,2,4,1,5,90.00,5.00,427.50,1,NULL,'2021-03-07 10:02:05','2021-03-08 07:04:23'),(4,2,1,1,1,1,1,35.00,0.00,35.00,1,NULL,'2021-03-07 10:12:43','2021-03-08 04:53:56'),(5,2,1,1,2,1,1,50.00,2.00,49.00,1,NULL,'2021-03-07 10:12:43','2021-03-08 04:54:01'),(6,2,1,1,4,1,2,90.00,5.00,171.00,1,NULL,'2021-03-07 10:12:43','2021-03-08 04:54:07'),(7,2,1,2,4,1,5,90.00,5.00,427.50,1,NULL,'2021-03-07 11:23:10','2021-03-08 04:54:11'),(8,1,1,2,4,1,5,90.00,5.00,427.50,1,NULL,'2021-03-07 11:51:59','2021-03-08 07:04:29'),(19,1,1,2,4,1,5,90.00,5.00,427.50,1,NULL,'2021-03-07 13:51:12','2021-03-08 07:04:19'),(25,2,1,2,4,1,5,90.00,5.00,427.50,1,NULL,'2021-03-08 04:31:31','2021-03-08 04:54:14'),(26,6,5,5,2,1,4,50.00,2.00,196.00,1,NULL,'2021-03-08 06:49:11','2021-03-08 06:50:25'),(27,6,5,5,2,1,3,50.00,0.00,150.00,1,NULL,'2021-03-08 06:49:11','2021-03-08 06:50:27'),(28,6,5,5,3,1,5,45.00,10.00,202.50,1,NULL,'2021-03-08 06:49:11','2021-03-08 06:50:22'),(29,7,3,10,2,1,1,50.00,0.00,50.00,1,NULL,'2021-03-08 08:47:54','2021-03-08 08:48:49'),(30,8,5,9,2,1,1,50.00,2.00,49.00,1,NULL,'2021-03-08 09:19:57','2021-03-08 11:37:58'),(31,9,4,14,3,1,1,45.00,10.00,40.50,1,NULL,'2021-03-08 13:03:30','2021-03-08 13:18:31'),(32,9,4,14,2,1,1,50.00,2.00,49.00,1,NULL,'2021-03-08 13:03:30','2021-03-08 13:19:15'),(33,10,4,12,2,1,2,50.00,2.00,98.00,1,NULL,'2021-03-08 13:03:46','2021-03-11 07:03:42'),(34,10,4,12,3,1,2,45.00,10.00,81.00,1,NULL,'2021-03-08 13:03:46','2021-03-11 10:46:05'),(35,10,4,12,1,1,2,40.00,0.00,80.00,1,NULL,'2021-03-08 13:03:46','2021-03-11 10:46:12'),(36,10,4,12,4,2,4,100.00,5.00,684.00,1,NULL,'2021-03-08 13:03:46','2021-03-11 07:03:56'),(37,10,4,12,6,1,5,230.00,5.00,1092.50,1,NULL,'2021-03-08 13:03:46','2021-03-11 10:46:09'),(38,11,4,8,3,1,3,45.00,10.00,121.50,1,'https://a3naab.s3.amazonaws.com/tempImage','2021-03-08 13:04:15','2021-03-11 10:12:58'),(39,11,3,7,4,1,1,80.00,5.00,76.00,1,NULL,'2021-03-08 13:04:15','2021-03-11 10:12:17'),(40,11,4,8,4,1,4,80.00,5.00,304.00,1,'https://a3naab.s3.amazonaws.com/tempImage','2021-03-08 13:04:15','2021-03-11 10:12:58'),(41,11,5,6,3,1,1,45.00,10.00,40.50,1,NULL,'2021-03-08 13:04:15','2021-03-11 10:12:00'),(42,11,3,11,2,1,1,50.00,0.00,165.52,1,NULL,'2021-03-08 13:04:15','2021-03-11 10:12:20'),(43,11,4,8,2,1,4,50.00,2.00,196.00,1,'https://a3naab.s3.amazonaws.com/tempImage','2021-03-08 13:04:15','2021-03-11 10:12:58'),(44,11,4,8,1,1,3,40.00,0.00,120.00,1,'https://a3naab.s3.amazonaws.com/tempImage','2021-03-08 13:04:15','2021-03-11 10:12:58'),(45,12,2,17,6,1,2,230.00,5.00,437.00,1,NULL,'2021-03-11 04:23:38','2021-03-11 09:32:39'),(46,13,4,19,9,4,2,58.00,1.00,114.84,1,NULL,'2021-03-11 11:25:20','2021-03-11 11:56:06'),(47,14,4,20,7,4,2,100.00,0.00,200.00,1,NULL,'2021-03-11 12:01:06','2021-03-11 12:57:29'),(48,15,5,22,7,4,2,100.00,0.00,200.00,1,NULL,'2021-03-11 12:56:28','2021-03-11 12:57:06'),(49,15,5,22,4,1,3,80.00,5.00,228.00,1,NULL,'2021-03-11 12:56:28','2021-03-11 12:57:01'),(50,16,4,21,9,4,2,58.00,1.00,114.84,1,NULL,'2021-03-11 13:28:15','2021-03-12 05:24:31'),(51,17,2,25,4,1,2,80.00,5.00,152.00,0,NULL,'2021-03-15 04:13:56','2021-03-15 04:13:56'),(52,18,2,28,4,1,3,80.00,5.00,228.00,1,NULL,'2021-03-15 09:26:30','2021-03-15 09:47:42'),(53,19,2,28,4,1,3,80.00,5.00,228.00,1,NULL,'2021-03-15 09:26:30','2021-03-15 09:27:07'),(54,20,7,29,7,4,5,100.00,0.00,500.00,0,NULL,'2021-03-16 11:32:57','2021-03-16 11:32:57'),(55,21,4,23,5,3,1,150.00,5.00,142.50,1,NULL,'2021-03-16 12:19:16','2021-03-16 12:19:30'),(56,21,2,26,4,1,2,80.00,5.00,152.00,1,NULL,'2021-03-16 12:19:16','2021-03-16 12:19:27'),(57,22,7,30,11,4,1,1999.00,10.00,1799.10,1,NULL,'2021-03-16 12:23:46','2021-03-16 12:24:00'),(58,22,7,30,4,2,1,80.00,5.00,76.00,1,NULL,'2021-03-16 12:23:46','2021-03-16 12:24:10'),(59,23,7,31,6,1,1,230.00,5.00,218.50,1,NULL,'2021-03-16 13:49:30','2021-03-16 13:49:46'),(60,24,7,32,6,1,2,230.00,5.00,437.00,1,NULL,'2021-03-16 13:53:45','2021-03-16 13:53:59'),(61,25,11,36,9,4,3,50.00,1.00,148.50,1,NULL,'2021-03-17 07:26:33','2021-03-17 07:27:05'),(62,26,11,35,7,4,3,100.00,0.00,300.00,1,'https://a3naab.s3.amazonaws.com/tempImage','2021-03-17 12:10:20','2021-03-18 05:26:04'),(63,27,10,33,6,1,4,230.00,5.00,874.00,1,NULL,'2021-03-18 04:40:06','2021-03-18 05:26:54'),(64,27,10,33,2,1,1,50.00,2.00,49.00,1,NULL,'2021-03-18 04:40:06','2021-03-18 05:26:59'),(65,27,10,33,1,1,1,40.00,0.00,40.00,1,NULL,'2021-03-18 04:40:06','2021-03-18 05:27:02'),(66,27,10,33,4,1,2,80.00,5.00,152.00,1,NULL,'2021-03-18 04:40:06','2021-03-18 05:27:09'),(67,27,10,33,3,1,2,45.00,10.00,81.00,1,NULL,'2021-03-18 04:40:06','2021-03-18 05:27:21'),(68,27,10,33,7,1,8,70.00,0.00,560.00,1,NULL,'2021-03-18 04:40:06','2021-03-18 05:27:13'),(69,27,10,34,7,1,2,70.00,0.00,140.00,1,NULL,'2021-03-18 04:40:06','2021-03-18 05:27:18'),(70,28,11,39,9,4,3,50.00,1.00,148.50,1,NULL,'2021-03-18 05:30:50','2021-03-18 05:31:26');
/*!40000 ALTER TABLE `deliveryUsers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `driver`
--

DROP TABLE IF EXISTS `driver`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `driver` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(191) NOT NULL,
  `lastName` varchar(191) NOT NULL DEFAULT '',
  `email` varchar(191) NOT NULL DEFAULT '',
  `drId` varchar(45) DEFAULT '',
  `profilePic` varchar(191) NOT NULL DEFAULT '',
  `countryCode` int(11) NOT NULL,
  `mobileNumber` varchar(191) NOT NULL DEFAULT '',
  `gender` char(50) NOT NULL DEFAULT '',
  `dob` date DEFAULT NULL,
  `floatingCash` float(10,2) DEFAULT '0.00',
  `IDNumber` varchar(191) NOT NULL DEFAULT '',
  `carId` int(11) DEFAULT NULL,
  `latitude` decimal(10,5) DEFAULT NULL,
  `longitude` decimal(10,5) DEFAULT NULL,
  `documentA` varchar(191) NOT NULL DEFAULT '',
  `documentB` varchar(191) NOT NULL DEFAULT '',
  `driverLicence` varchar(191) NOT NULL DEFAULT '',
  `isAccepted` int(11) NOT NULL DEFAULT '0',
  `newCar` int(11) NOT NULL DEFAULT '0',
  `fcmToken` varchar(512) DEFAULT NULL,
  `returnCar` int(11) NOT NULL DEFAULT '0',
  `driverActive` int(11) NOT NULL DEFAULT '1',
  `isDeleteDriver` int(11) NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `mobileNumber` (`mobileNumber`),
  KEY `driver_fk0` (`carId`),
  CONSTRAINT `driver_fk0` FOREIGN KEY (`carId`) REFERENCES `driver` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `driver`
--

LOCK TABLES `driver` WRITE;
/*!40000 ALTER TABLE `driver` DISABLE KEYS */;
INSERT INTO `driver` VALUES (1,'Ababs','s','jai9@gmail.com','#dr2553','',1,'2353456355','MALE','2020-12-20',1021.44,'sad32423',1,13.18449,80.30732,'','','',0,1,'dTeNAgi8QUi8dyqpOj9t_X:APA91bH60yTGDvQtsgk2MvIuvy08p-sCoEcf6qCjy6BSF9oCMEKEAUsV7CNYwE0eM6Btpl9BTPpCKQ7s3kZcjYAj6iVpWEKD7FavCGGwQ3vF5IZ5JNq5exDcEXXumZMUbxArt_MFcGA2',1,0,0,'2021-03-06 06:27:21','2021-03-18 10:51:10'),(2,'Karthick','B','karthick12@mailinator.com','#dr7476','http://65.1.122.8/uploads/uploaded_file-1615012944691.jpg',1,'9988776655','Male','1995-11-20',2038.99,'03',1,13.03554,80.24546,'','','',1,0,'eRhHIKNuQLmaiJTHaz30mD:APA91bG5j7wrVXqWQeOqDTZW2qiTbKpgCSaMsLP-1AM40hntIaTn0EOqInSg1wn1SuZCACKK3HUwOcxDd1SbJpAE3QrP6YwUYn_uimVF0mXY420hiZqcojEaXzX44rlMi4qrV99U3Mv3',0,1,0,'2021-03-06 06:42:24','2021-03-16 06:55:02'),(3,'Virat','Kohli','virat18@mailinator.com','#dr8551','http://65.1.122.8/uploads/uploaded_file-1615014358634.jpg',1,'8939781712','Male','1989-03-03',15566.38,'18',3,13.18447,80.30733,'','','',0,1,'f0DCOnq2S56fZyqVORrBCe:APA91bFctDNnWvHbCuahb3p3PyzQx2_pys-Fw9Kk0J0pifnRlNCg0HS_LmA2z4JaosMJvaiwbZw2CAarQr_uLxheSF9T_4eBMsdun2f0F0dS9hvuZHWhfOIp6Le96K5nJQnx_XqTPw5_',1,1,0,'2021-03-06 07:05:58','2021-03-18 05:31:37'),(4,'Ababs','s','abbass@gmail.com','#dr8604','http://65.1.122.8/uploads/uploaded_file-1615178998763.jpg',91,'9677965573','Male','2020-12-20',0.00,'sad32423',6,13.03753,80.11147,'','','',0,1,'cXLYp7SUSfqselPspSOsT0:APA91bGs0uw9Wa84TKnlBJmb1k_8jRhdLjmyG1rXtPsh8eFJu3jl_MbQ4ITQC8JQIqVmw5F5SwG8dnlr1GyK5Q50MAuBx1VLQjVxi3YT3BQdtW72qM5WV-Z_Be0LlhMJKFyRhYPKXi7p',1,1,0,'2021-03-06 07:46:54','2021-03-12 13:24:32'),(5,'Ganesh','Kumar','ganesh@mailinator.com','#dr8169','http://65.1.122.8/uploads/uploaded_file-1615186725225.jpg',1,'8072431669','Male','1996-07-05',0.00,'34',4,NULL,NULL,'','','',0,1,NULL,0,1,0,'2021-03-08 06:58:46','2021-03-08 06:59:28'),(6,'Deva','One','deva@gmail.com','#dr6300','http://65.1.122.8/uploads/uploaded_file-1615187263360.jpg',1,'6383159335','Male','2021-03-04',0.00,'001',5,NULL,NULL,'','','',0,1,NULL,0,1,0,'2021-03-08 07:07:43','2021-03-12 12:21:34');
/*!40000 ALTER TABLE `driver` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `driverFeedback`
--

DROP TABLE IF EXISTS `driverFeedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `driverFeedback` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `routeId` int(11) NOT NULL,
  `orderId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `FdriverId` int(11) DEFAULT NULL,
  `notes` varchar(518) NOT NULL DEFAULT '',
  `findLocation` char(50) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `driverFeedback_fk0` (`routeId`),
  KEY `driverFeedback_fk1` (`orderId`),
  KEY `driverFeedback_fk2` (`userId`),
  KEY `driverFeedback_fk3` (`FdriverId`),
  CONSTRAINT `driverFeedback_fk0` FOREIGN KEY (`routeId`) REFERENCES `driverOrders` (`id`),
  CONSTRAINT `driverFeedback_fk1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`),
  CONSTRAINT `driverFeedback_fk2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `driverFeedback_fk3` FOREIGN KEY (`FdriverId`) REFERENCES `driver` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `driverFeedback`
--

LOCK TABLES `driverFeedback` WRITE;
/*!40000 ALTER TABLE `driverFeedback` DISABLE KEYS */;
INSERT INTO `driverFeedback` VALUES (1,2,2,1,2,'gg','No','2021-03-08 04:54:43','2021-03-08 04:54:43'),(2,2,1,1,2,'tt','Yes','2021-03-08 04:54:53','2021-03-08 04:54:53'),(3,6,5,5,3,'Nik','Yes','2021-03-08 06:51:23','2021-03-08 06:51:23'),(4,1,2,1,2,'','No','2021-03-08 08:46:29','2021-03-08 08:46:29'),(5,8,9,5,3,'','Yes','2021-03-08 11:43:58','2021-03-08 11:43:58'),(6,7,10,3,2,'temp','No','2021-03-08 11:58:43','2021-03-08 11:58:43'),(7,9,14,4,3,'Good Location','No','2021-03-08 13:25:56','2021-03-08 13:25:56'),(8,12,17,2,2,'bshshsj','Yes','2021-03-11 09:32:56','2021-03-11 09:32:56'),(9,11,6,5,3,'gg','Yes','2021-03-11 10:12:58','2021-03-11 10:12:58'),(10,11,7,3,3,'','Yes','2021-03-11 10:13:06','2021-03-11 10:13:06'),(11,11,11,3,3,'h','No','2021-03-11 10:13:14','2021-03-11 10:13:14'),(12,11,8,4,3,'uuh','Yes','2021-03-11 10:13:22','2021-03-11 10:13:22'),(13,10,12,4,3,'hsbsb','No','2021-03-11 10:47:43','2021-03-11 10:47:43'),(14,13,19,4,3,'Address looks easy','No','2021-03-11 11:56:46','2021-03-11 11:56:46'),(15,15,22,5,3,'bx','No','2021-03-11 12:57:24','2021-03-11 12:57:24'),(16,14,20,4,3,'bh','Yes','2021-03-11 12:57:40','2021-03-11 12:57:40'),(17,16,21,4,3,'','No','2021-03-12 05:24:38','2021-03-12 05:24:38'),(18,19,28,2,1,'Easy','No','2021-03-15 09:27:56','2021-03-15 09:27:56'),(19,18,28,2,1,'Test','Yes','2021-03-16 11:33:20','2021-03-16 11:33:20'),(20,21,23,4,3,'','No','2021-03-16 12:19:38','2021-03-16 12:19:38'),(21,21,26,2,3,'','No','2021-03-16 12:19:45','2021-03-16 12:19:45'),(22,22,30,7,3,'','No','2021-03-16 12:24:18','2021-03-16 12:24:18'),(23,23,31,7,3,'fgjj','No','2021-03-16 13:49:53','2021-03-16 13:49:53'),(24,24,32,7,3,'','No','2021-03-16 13:54:05','2021-03-16 13:54:05'),(25,25,36,11,3,'','Yes','2021-03-17 07:27:23','2021-03-17 07:27:23'),(26,26,35,11,3,'','Yes','2021-03-18 05:26:39','2021-03-18 05:26:39'),(27,27,33,10,3,'','Yes','2021-03-18 05:27:34','2021-03-18 05:27:34'),(28,27,34,10,3,'','No','2021-03-18 05:27:44','2021-03-18 05:27:44'),(29,28,39,11,3,'Teno','No','2021-03-18 05:31:37','2021-03-18 05:31:37');
/*!40000 ALTER TABLE `driverFeedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `driverFloatingCash`
--

DROP TABLE IF EXISTS `driverFloatingCash`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `driverFloatingCash` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `driverId` int(11) NOT NULL,
  `orderId` int(11) DEFAULT NULL,
  `cashType` char(50) NOT NULL,
  `amount` float(10,2) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `driverFloatingCash_fk0` (`driverId`),
  KEY `driverFloatingCash_fk1` (`orderId`),
  CONSTRAINT `driverFloatingCash_fk0` FOREIGN KEY (`driverId`) REFERENCES `driver` (`id`),
  CONSTRAINT `driverFloatingCash_fk1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `driverFloatingCash`
--

LOCK TABLES `driverFloatingCash` WRITE;
/*!40000 ALTER TABLE `driverFloatingCash` DISABLE KEYS */;
INSERT INTO `driverFloatingCash` VALUES (1,2,2,'ORDER',448.88,'2021-03-08 04:54:43','2021-03-08 04:54:43'),(2,2,1,'ORDER',218.75,'2021-03-08 04:54:53','2021-03-08 04:54:53'),(3,3,5,'ORDER',150.00,'2021-03-08 06:51:23','2021-03-08 06:51:23'),(4,2,2,'ORDER',448.88,'2021-03-08 08:46:29','2021-03-08 08:46:29'),(5,3,9,'ORDER',54.88,'2021-03-08 11:43:58','2021-03-08 11:43:58'),(6,2,10,'ORDER',50.00,'2021-03-08 11:58:43','2021-03-08 11:58:43'),(7,3,14,'ORDER',100.24,'2021-03-08 13:25:56','2021-03-08 13:25:56'),(8,2,17,'ORDER',872.48,'2021-03-11 09:32:56','2021-03-11 09:32:56'),(9,3,6,'ORDER',45.36,'2021-03-11 10:12:58','2021-03-11 10:12:58'),(10,3,7,'ORDER',191.52,'2021-03-11 10:13:06','2021-03-11 10:13:06'),(11,3,11,'ORDER',165.52,'2021-03-11 10:13:14','2021-03-11 10:13:14'),(12,3,8,'ORDER',1256.08,'2021-03-11 10:13:22','2021-03-11 10:13:22'),(13,3,12,'ORDER',3237.36,'2021-03-11 10:47:43','2021-03-11 10:47:43'),(14,3,19,'ORDER',132.07,'2021-03-11 11:56:46','2021-03-11 11:56:46'),(15,3,22,'ORDER',798.56,'2021-03-11 12:57:24','2021-03-11 12:57:24'),(16,3,20,'ORDER',224.00,'2021-03-11 12:57:40','2021-03-11 12:57:40'),(17,3,21,'ORDER',128.62,'2021-03-12 05:24:38','2021-03-12 05:24:38'),(18,1,28,'ORDER',510.72,'2021-03-15 09:27:56','2021-03-15 09:27:56'),(19,1,28,'ORDER',510.72,'2021-03-16 11:33:20','2021-03-16 11:33:20'),(20,3,23,'ORDER',159.60,'2021-03-16 12:19:38','2021-03-16 12:19:38'),(21,3,26,'ORDER',340.48,'2021-03-16 12:19:45','2021-03-16 12:19:45'),(22,3,30,'ORDER',2185.23,'2021-03-16 12:24:18','2021-03-16 12:24:18'),(23,3,31,'ORDER',436.24,'2021-03-16 13:49:53','2021-03-16 13:49:53'),(24,3,32,'ORDER',872.48,'2021-03-16 13:54:05','2021-03-16 13:54:05'),(25,3,36,'ORDER',166.32,'2021-03-17 07:27:23','2021-03-17 07:27:23'),(26,3,35,'ORDER',571.20,'2021-03-18 05:26:39','2021-03-18 05:26:39'),(27,3,33,'ORDER',3799.04,'2021-03-18 05:27:34','2021-03-18 05:27:34'),(28,3,34,'ORDER',380.80,'2021-03-18 05:27:44','2021-03-18 05:27:44'),(29,3,39,'ORDER',170.78,'2021-03-18 05:31:37','2021-03-18 05:31:37'),(30,3,NULL,'ADMIN',10.00,'2021-03-18 10:54:35','2021-03-18 10:54:35'),(31,3,NULL,'ADMIN',10.00,'2021-03-18 10:54:36','2021-03-18 10:54:36'),(32,3,NULL,'ADMIN',30.00,'2021-03-18 10:54:44','2021-03-18 10:54:44');
/*!40000 ALTER TABLE `driverFloatingCash` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `driverMaintenance`
--

DROP TABLE IF EXISTS `driverMaintenance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `driverMaintenance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `driverId` int(11) NOT NULL,
  `carId` int(11) NOT NULL,
  `maintenanceId` int(11) NOT NULL,
  `maintenanceAmount` float(10,2) NOT NULL DEFAULT '0.00',
  `currentMileage` float(10,2) NOT NULL DEFAULT '0.00',
  `message` varchar(812) NOT NULL DEFAULT '',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `driverMaintenance_fk0` (`driverId`),
  KEY `driverMaintenance_fk1` (`carId`),
  KEY `driverMaintenance_fk2` (`maintenanceId`),
  CONSTRAINT `driverMaintenance_fk0` FOREIGN KEY (`driverId`) REFERENCES `driver` (`id`) ON DELETE CASCADE,
  CONSTRAINT `driverMaintenance_fk1` FOREIGN KEY (`carId`) REFERENCES `cars` (`id`) ON DELETE CASCADE,
  CONSTRAINT `driverMaintenance_fk2` FOREIGN KEY (`maintenanceId`) REFERENCES `maintenanceList` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `driverMaintenance`
--

LOCK TABLES `driverMaintenance` WRITE;
/*!40000 ALTER TABLE `driverMaintenance` DISABLE KEYS */;
INSERT INTO `driverMaintenance` VALUES (1,3,2,1,800.00,18.00,'General Service','2021-03-06 07:10:41','2021-03-06 07:10:41'),(2,3,2,1,500.00,15.00,'temp','2021-03-06 08:22:23','2021-03-06 08:22:23'),(3,3,2,1,1500.00,30.00,'Air Conditioning need to be prepared','2021-03-06 08:55:21','2021-03-06 08:55:21'),(4,3,2,1,1000.00,15.00,'General Service','2021-03-06 09:47:30','2021-03-06 09:47:30'),(5,3,2,1,646.00,949494.00,'hshsbs','2021-03-06 09:47:50','2021-03-06 09:47:50'),(6,2,1,1,12.00,23000.00,'hdhdhshsushshhdhd','2021-03-09 16:16:08','2021-03-09 16:16:08'),(7,1,1,1,500.00,15.00,'gsgsg','2021-03-15 09:48:06','2021-03-15 09:48:06');
/*!40000 ALTER TABLE `driverMaintenance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `driverOrders`
--

DROP TABLE IF EXISTS `driverOrders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `driverOrders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `driverId` int(11) NOT NULL,
  `assignment_ID` varchar(45) NOT NULL DEFAULT '',
  `latitude` float(10,5) DEFAULT NULL,
  `longitude` float(10,5) DEFAULT NULL,
  `orders` int(11) NOT NULL DEFAULT '0',
  `pickupCount` int(11) NOT NULL DEFAULT '0',
  `dropCount` int(11) NOT NULL DEFAULT '0',
  `assignDate` datetime DEFAULT NULL,
  `isComplete` int(11) NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `driverOrders_fk0` (`driverId`),
  CONSTRAINT `driverOrders_fk0` FOREIGN KEY (`driverId`) REFERENCES `driver` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `driverOrders`
--

LOCK TABLES `driverOrders` WRITE;
/*!40000 ALTER TABLE `driverOrders` DISABLE KEYS */;
INSERT INTO `driverOrders` VALUES (1,2,'#Ass8998',13.18452,80.30725,10,5,5,'2021-03-06 15:37:43',1,'2021-03-06 15:37:42','2021-03-08 08:46:29'),(2,2,'#Ass4793',13.18452,80.30725,10,5,5,'2021-03-07 10:12:43',1,'2021-03-07 10:12:43','2021-03-08 04:54:53'),(3,1,'#Ass3279',10.13400,12.21400,6,3,3,'2021-03-07 12:39:13',0,'2021-03-07 12:39:12','2021-03-07 12:39:12'),(4,1,'#Ass2107',10.13400,12.21400,6,3,3,'2021-03-07 12:39:58',0,'2021-03-07 12:39:58','2021-03-07 12:39:58'),(5,1,'#Ass4233',10.13400,12.21400,6,3,3,'2021-03-07 14:57:49',0,'2021-03-07 14:57:48','2021-03-07 14:57:48'),(6,3,'#Ass1325',13.18452,80.30725,10,5,5,'2021-03-08 06:49:12',1,'2021-03-08 06:49:11','2021-03-08 06:51:23'),(7,2,'#Ass6294',13.18437,80.30745,10,5,5,'2021-03-08 08:47:54',1,'2021-03-08 08:47:54','2021-03-08 11:58:44'),(8,3,'#Ass9767',13.18452,80.30725,10,5,5,'2021-03-08 09:19:57',1,'2021-03-08 09:19:57','2021-03-08 11:43:59'),(9,3,'#Ass7644',13.18453,80.30726,10,5,5,'2021-03-08 13:03:30',1,'2021-03-08 13:03:30','2021-03-08 13:25:56'),(10,3,'#Ass7909',13.18453,80.30726,10,5,5,'2021-03-08 13:03:47',1,'2021-03-08 13:03:46','2021-03-11 10:47:43'),(11,3,'#Ass9246',13.18453,80.30726,10,5,5,'2021-03-08 13:04:15',1,'2021-03-08 13:04:15','2021-03-11 10:13:22'),(12,2,'#Ass9516',13.00990,80.22167,10,5,5,'2021-03-11 04:23:38',1,'2021-03-11 04:23:38','2021-03-11 09:32:58'),(13,3,'#Ass7946',13.18449,80.30728,10,5,5,'2021-03-11 11:25:21',1,'2021-03-11 11:25:20','2021-03-11 11:56:46'),(14,3,'#Ass4596',13.18449,80.30728,10,5,5,'2021-03-11 12:01:06',1,'2021-03-11 12:01:06','2021-03-11 12:57:40'),(15,3,'#Ass3057',13.18449,80.30728,10,5,5,'2021-03-11 12:56:29',1,'2021-03-11 12:56:28','2021-03-11 12:57:24'),(16,3,'#Ass8600',13.18449,80.30728,10,5,5,'2021-03-11 13:28:16',1,'2021-03-11 13:28:15','2021-03-12 05:24:39'),(17,2,'#Ass6808',13.00993,80.22167,10,5,5,'2021-03-15 04:13:57',0,'2021-03-15 04:13:56','2021-03-15 04:13:56'),(18,1,'#Ass6395',13.18445,80.30725,10,5,5,'2021-03-15 09:26:30',1,'2021-03-15 09:26:30','2021-03-16 11:33:20'),(19,1,'#Ass4697',13.18445,80.30725,10,5,5,'2021-03-15 09:26:31',1,'2021-03-15 09:26:30','2021-03-15 09:27:56'),(20,4,'#Ass8976',13.03753,80.11147,10,5,5,'2021-03-16 11:32:57',0,'2021-03-16 11:32:57','2021-03-16 11:32:57'),(21,3,'#Ass7547',13.18448,80.30732,10,5,5,'2021-03-16 12:19:16',1,'2021-03-16 12:19:16','2021-03-16 12:19:45'),(22,3,'#Ass2304',13.18448,80.30732,10,5,5,'2021-03-16 12:23:47',1,'2021-03-16 12:23:46','2021-03-16 12:24:18'),(23,3,'#Ass6183',13.18448,80.30732,10,5,5,'2021-03-16 13:49:30',1,'2021-03-16 13:49:30','2021-03-16 13:49:54'),(24,3,'#Ass1827',13.18448,80.30732,10,5,5,'2021-03-16 13:53:45',1,'2021-03-16 13:53:45','2021-03-16 13:54:06'),(25,3,'#Ass2818',13.18448,80.30732,10,5,5,'2021-03-17 07:26:33',1,'2021-03-17 07:26:33','2021-03-17 07:27:24'),(26,3,'#Ass2162',13.18449,80.30732,10,5,5,'2021-03-17 12:10:21',1,'2021-03-17 12:10:20','2021-03-18 05:26:39'),(27,3,'#Ass1447',13.18449,80.30732,10,5,5,'2021-03-18 04:40:06',1,'2021-03-18 04:40:06','2021-03-18 05:27:44'),(28,3,'#Ass2531',13.18447,80.30733,10,5,5,'2021-03-18 05:30:50',1,'2021-03-18 05:30:50','2021-03-18 05:31:37');
/*!40000 ALTER TABLE `driverOrders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `driverrRoute`
--

DROP TABLE IF EXISTS `driverrRoute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `driverrRoute` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `routeId` int(11) NOT NULL,
  `r_type` char(50) NOT NULL DEFAULT '',
  `userId` int(11) DEFAULT NULL,
  `storeId` int(11) DEFAULT NULL,
  `orderId` int(11) DEFAULT NULL,
  `sortOrder` int(11) NOT NULL DEFAULT '0',
  `r_latitude` float(10,5) DEFAULT NULL,
  `r_longitude` float(10,5) DEFAULT NULL,
  `receipt` varchar(45) DEFAULT '',
  `makeDelivery` int(11) DEFAULT '0',
  `type` char(50) DEFAULT '',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `driverrRoute_fk0` (`routeId`),
  CONSTRAINT `driverrRoute_fk0` FOREIGN KEY (`routeId`) REFERENCES `driverOrders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `driverrRoute`
--

LOCK TABLES `driverrRoute` WRITE;
/*!40000 ALTER TABLE `driverrRoute` DISABLE KEYS */;
INSERT INTO `driverrRoute` VALUES (1,1,'',NULL,1,NULL,1,13.00670,80.22060,'',0,'STORE','2021-03-06 15:37:42','2021-03-06 15:37:42'),(2,1,'',1,NULL,2,3,13.00670,80.22060,'',1,'ORDER','2021-03-08 08:46:29','2021-03-06 15:37:42'),(3,1,'',NULL,1,NULL,0,13.00670,80.22060,'',0,'STORE','2021-03-07 10:01:55','2021-03-07 10:01:55'),(4,1,'',1,NULL,2,4,13.00670,80.22060,'',1,'ORDER','2021-03-08 08:46:29','2021-03-07 10:01:55'),(5,1,'',NULL,1,NULL,0,13.00670,80.22060,'',0,'STORE','2021-03-07 10:02:05','2021-03-07 10:02:05'),(6,1,'',1,NULL,2,5,13.00670,80.22060,'',1,'ORDER','2021-03-08 08:46:29','2021-03-07 10:02:05'),(7,2,'',NULL,1,NULL,1,13.00670,80.22060,'',0,'STORE','2021-03-07 10:12:43','2021-03-07 10:12:43'),(8,2,'',1,NULL,1,2,13.00670,80.22060,'',1,'ORDER','2021-03-08 04:54:53','2021-03-07 10:12:43'),(9,2,'',NULL,1,NULL,0,13.00670,80.22060,'',0,'STORE','2021-03-07 11:23:10','2021-03-07 11:23:10'),(10,2,'',1,NULL,2,0,13.00670,80.22060,'',1,'ORDER','2021-03-08 04:54:43','2021-03-07 11:23:10'),(11,1,'',NULL,1,NULL,0,13.00670,80.22060,'',0,'STORE','2021-03-07 11:51:59','2021-03-07 11:51:59'),(12,1,'',1,NULL,2,6,13.00670,80.22060,'',1,'ORDER','2021-03-08 08:46:29','2021-03-07 11:51:59'),(13,3,'',NULL,6,NULL,1,43.00000,0.00000,'',0,'STORE','2021-03-07 12:39:12','2021-03-07 12:39:12'),(14,3,'',NULL,7,NULL,2,17.53769,44.12316,'',0,'STORE','2021-03-07 12:39:12','2021-03-07 12:39:12'),(15,3,'',1,NULL,2,3,10.58826,76.93640,'',0,'ORDER','2021-03-07 12:39:12','2021-03-07 12:39:12'),(16,3,'',1,NULL,3,4,10.58826,76.93640,'',0,'ORDER','2021-03-07 12:39:12','2021-03-07 12:39:12'),(17,3,'',1,NULL,4,5,10.58826,76.93640,'',0,'ORDER','2021-03-07 12:39:12','2021-03-07 12:39:12'),(18,4,'',NULL,6,NULL,1,43.00000,0.00000,'',0,'STORE','2021-03-07 12:39:58','2021-03-07 12:39:58'),(19,4,'',NULL,7,NULL,2,17.53769,44.12316,'',0,'STORE','2021-03-07 12:39:58','2021-03-07 12:39:58'),(20,4,'',1,NULL,2,3,10.58826,76.93640,'',0,'ORDER','2021-03-07 12:39:58','2021-03-07 12:39:58'),(21,4,'',1,NULL,3,4,10.58826,76.93640,'',0,'ORDER','2021-03-07 12:39:58','2021-03-07 12:39:58'),(22,4,'',1,NULL,4,5,10.58826,76.93640,'',0,'ORDER','2021-03-07 12:39:58','2021-03-07 12:39:58'),(23,1,'',NULL,1,NULL,0,13.00670,80.22060,'',0,'STORE','2021-03-07 13:51:12','2021-03-07 13:51:12'),(24,1,'',1,NULL,2,7,13.00670,80.22060,'',1,'ORDER','2021-03-08 08:46:29','2021-03-07 13:51:12'),(25,5,'',NULL,6,NULL,1,43.00000,0.00000,'',0,'STORE','2021-03-07 14:57:48','2021-03-07 14:57:48'),(26,5,'',NULL,7,NULL,2,17.53769,44.12316,'',0,'STORE','2021-03-07 14:57:48','2021-03-07 14:57:48'),(27,5,'',1,NULL,2,3,10.58826,76.93640,'',0,'ORDER','2021-03-07 14:57:48','2021-03-07 14:57:48'),(28,5,'',1,NULL,3,4,10.58826,76.93640,'',0,'ORDER','2021-03-07 14:57:48','2021-03-07 14:57:48'),(29,5,'',1,NULL,4,5,10.58826,76.93640,'',0,'ORDER','2021-03-07 14:57:48','2021-03-07 14:57:48'),(30,2,'',NULL,1,NULL,0,13.00670,80.22060,'',0,'STORE','2021-03-08 04:31:31','2021-03-08 04:31:31'),(31,2,'',1,NULL,2,0,13.00670,80.22060,'',1,'ORDER','2021-03-08 04:54:43','2021-03-08 04:31:31'),(32,6,'',NULL,1,NULL,1,26.46833,49.79506,'',0,'STORE','2021-03-08 06:49:11','2021-03-08 06:49:11'),(33,6,'',5,NULL,5,2,26.47847,49.79725,'',1,'ORDER','2021-03-08 06:51:23','2021-03-08 06:49:11'),(34,7,'',NULL,1,NULL,1,26.46833,49.79506,'',0,'STORE','2021-03-08 08:47:54','2021-03-08 08:47:54'),(35,7,'',3,NULL,10,3,26.42095,50.08658,'',1,'ORDER','2021-03-08 11:58:43','2021-03-08 08:47:54'),(36,8,'',NULL,1,NULL,1,26.46833,49.79506,'',0,'STORE','2021-03-08 09:19:57','2021-03-08 09:19:57'),(37,8,'',5,NULL,9,4,26.47847,49.79725,'',1,'ORDER','2021-03-08 11:43:58','2021-03-08 09:19:57'),(38,9,'',NULL,1,NULL,1,26.46833,49.79506,'',0,'STORE','2021-03-08 13:03:30','2021-03-08 13:03:30'),(39,9,'',4,NULL,14,2,26.48302,50.07568,'',1,'ORDER','2021-03-08 13:25:56','2021-03-08 13:03:30'),(40,10,'',NULL,1,NULL,1,26.46833,49.79506,'',0,'STORE','2021-03-08 13:03:46','2021-03-08 13:03:46'),(41,10,'',NULL,2,NULL,2,26.50424,49.99750,'',0,'STORE','2021-03-08 13:03:46','2021-03-08 13:03:46'),(42,10,'',4,NULL,12,4,26.48302,50.07568,'',1,'ORDER','2021-03-11 10:47:43','2021-03-08 13:03:46'),(43,11,'',NULL,1,NULL,1,26.46833,49.79506,'',0,'STORE','2021-03-08 13:04:15','2021-03-08 13:04:15'),(44,11,'',5,NULL,6,2,26.47847,49.79725,'',1,'ORDER','2021-03-11 10:12:58','2021-03-08 13:04:15'),(45,11,'',3,NULL,7,3,26.42095,50.08658,'',1,'ORDER','2021-03-11 10:13:06','2021-03-08 13:04:15'),(46,11,'',4,NULL,8,4,26.46896,49.80188,'',1,'ORDER','2021-03-11 10:13:22','2021-03-08 13:04:15'),(47,11,'',3,NULL,11,5,26.42095,50.08658,'',1,'ORDER','2021-03-11 10:13:14','2021-03-08 13:04:15'),(48,12,'',NULL,1,NULL,1,13.08270,80.27070,'',0,'STORE','2021-03-11 04:23:38','2021-03-11 04:23:38'),(49,12,'',2,NULL,17,2,13.03552,80.24545,'',1,'ORDER','2021-03-11 09:32:56','2021-03-11 04:23:38'),(50,13,'',NULL,4,NULL,1,31.65377,38.71131,'',0,'STORE','2021-03-11 11:25:20','2021-03-11 11:25:20'),(51,13,'',4,NULL,19,2,31.69351,38.73365,'',1,'ORDER','2021-03-11 11:56:46','2021-03-11 11:25:20'),(52,14,'',NULL,4,NULL,1,31.65377,38.71131,'',0,'STORE','2021-03-11 12:01:06','2021-03-11 12:01:06'),(53,14,'',4,NULL,20,2,13.18450,80.30728,'',1,'ORDER','2021-03-11 12:57:40','2021-03-11 12:01:06'),(54,15,'',NULL,1,NULL,1,31.68894,38.73162,'',0,'STORE','2021-03-11 12:56:28','2021-03-11 12:56:28'),(55,15,'',NULL,4,NULL,2,31.65377,38.71131,'',0,'STORE','2021-03-11 12:56:28','2021-03-11 12:56:28'),(56,15,'',5,NULL,22,3,31.69631,38.73247,'',1,'ORDER','2021-03-11 12:57:24','2021-03-11 12:56:28'),(57,16,'',NULL,4,NULL,1,31.65377,38.71131,'',0,'STORE','2021-03-11 13:28:15','2021-03-11 13:28:15'),(58,16,'',4,NULL,21,2,31.69351,38.73365,'',1,'ORDER','2021-03-12 05:24:38','2021-03-11 13:28:15'),(59,17,'',NULL,1,NULL,1,13.08270,80.27070,'',0,'STORE','2021-03-15 04:13:56','2021-03-15 04:13:56'),(60,17,'',2,NULL,25,2,13.03552,80.24545,'',0,'ORDER','2021-03-15 04:13:56','2021-03-15 04:13:56'),(61,18,'',NULL,1,NULL,1,13.08270,80.27070,'',0,'STORE','2021-03-15 09:26:30','2021-03-15 09:26:30'),(62,18,'',2,NULL,28,2,13.03552,80.24545,'',1,'ORDER','2021-03-16 11:33:20','2021-03-15 09:26:30'),(63,19,'',NULL,1,NULL,1,13.08270,80.27070,'',0,'STORE','2021-03-15 09:26:30','2021-03-15 09:26:30'),(64,19,'',2,NULL,28,2,13.03552,80.24545,'',1,'ORDER','2021-03-15 09:27:56','2021-03-15 09:26:30'),(65,20,'',NULL,4,NULL,1,31.67980,38.71958,'',0,'STORE','2021-03-16 11:32:57','2021-03-16 11:32:57'),(66,20,'',7,NULL,29,2,31.66092,38.68539,'',0,'ORDER','2021-03-16 11:32:57','2021-03-16 11:32:57'),(67,21,'',NULL,1,NULL,1,26.46379,49.77185,'',0,'STORE','2021-03-16 12:19:16','2021-03-16 12:19:16'),(68,21,'',NULL,3,NULL,2,24.52506,39.47816,'',0,'STORE','2021-03-16 12:19:16','2021-03-16 12:19:16'),(69,21,'',4,NULL,23,3,24.53233,39.57284,'',1,'ORDER','2021-03-16 12:19:38','2021-03-16 12:19:16'),(70,21,'',2,NULL,26,4,13.03552,80.24545,'',1,'ORDER','2021-03-16 12:19:45','2021-03-16 12:19:16'),(71,22,'',NULL,4,NULL,1,31.70475,38.66698,'',0,'STORE','2021-03-16 12:23:46','2021-03-16 12:23:46'),(72,22,'',7,NULL,30,2,31.66092,38.68539,'',1,'ORDER','2021-03-16 12:24:18','2021-03-16 12:23:46'),(73,22,'',NULL,2,NULL,3,31.64150,38.68417,'',0,'STORE','2021-03-16 12:23:46','2021-03-16 12:23:46'),(74,23,'',NULL,1,NULL,1,26.46379,49.77185,'',0,'STORE','2021-03-16 13:49:30','2021-03-16 13:49:30'),(75,23,'',7,NULL,31,2,26.51607,49.83187,'',1,'ORDER','2021-03-16 13:49:53','2021-03-16 13:49:30'),(76,24,'',NULL,1,NULL,1,26.46379,49.77185,'',0,'STORE','2021-03-16 13:53:45','2021-03-16 13:53:45'),(77,24,'',7,NULL,32,2,26.51607,49.83187,'',1,'ORDER','2021-03-16 13:54:05','2021-03-16 13:53:45'),(78,25,'',NULL,4,NULL,1,31.70427,38.74846,'',0,'STORE','2021-03-17 07:26:33','2021-03-17 07:26:33'),(79,25,'',11,NULL,36,2,31.78889,38.64616,'',1,'ORDER','2021-03-17 07:27:23','2021-03-17 07:26:33'),(80,26,'',NULL,4,NULL,1,31.70427,38.74846,'',0,'STORE','2021-03-17 12:10:20','2021-03-17 12:10:20'),(81,26,'',11,NULL,35,2,31.78889,38.64616,'',1,'ORDER','2021-03-18 05:26:39','2021-03-17 12:10:20'),(82,27,'',NULL,1,NULL,1,24.74541,50.71330,'',0,'STORE','2021-03-18 04:40:06','2021-03-18 04:40:06'),(83,27,'',10,NULL,33,2,24.72530,50.76367,'',1,'ORDER','2021-03-18 05:27:34','2021-03-18 04:40:06'),(84,27,'',10,NULL,34,3,24.72530,50.76367,'',1,'ORDER','2021-03-18 05:27:44','2021-03-18 04:40:06'),(85,28,'',NULL,4,NULL,1,31.70427,38.74846,'',0,'STORE','2021-03-18 05:30:50','2021-03-18 05:30:50'),(86,28,'',11,NULL,39,2,31.78889,38.64616,'',1,'ORDER','2021-03-18 05:31:37','2021-03-18 05:30:50');
/*!40000 ALTER TABLE `driverrRoute` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faq`
--

DROP TABLE IF EXISTS `faq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `faq` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question` varchar(812) COLLATE utf8mb4_unicode_ci NOT NULL,
  `arabicQuestion` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `arabicAnswer` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `answer` varchar(812) COLLATE utf8mb4_unicode_ci NOT NULL,
  `faqCategory` int(11) DEFAULT NULL,
  `type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `faq_fk0` (`faqCategory`),
  CONSTRAINT `faq_fk0` FOREIGN KEY (`faqCategory`) REFERENCES `faqCategory` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faq`
--

LOCK TABLES `faq` WRITE;
/*!40000 ALTER TABLE `faq` DISABLE KEYS */;
/*!40000 ALTER TABLE `faq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faqCategory`
--

DROP TABLE IF EXISTS `faqCategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `faqCategory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(255) NOT NULL DEFAULT '',
  `arabicName` varchar(255) NOT NULL DEFAULT '',
  `isDelete` int(11) NOT NULL DEFAULT '0',
  `status` char(50) NOT NULL DEFAULT 'true',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faqCategory`
--

LOCK TABLES `faqCategory` WRITE;
/*!40000 ALTER TABLE `faqCategory` DISABLE KEYS */;
INSERT INTO `faqCategory` VALUES (1,'Question 1','Question 1',0,'true','2021-03-10 09:38:55','2021-03-10 09:38:55');
/*!40000 ALTER TABLE `faqCategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favourite_products`
--

DROP TABLE IF EXISTS `favourite_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `favourite_products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `favourite_products_fk0` (`userId`),
  KEY `favourite_products_fk1` (`productId`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favourite_products`
--

LOCK TABLES `favourite_products` WRITE;
/*!40000 ALTER TABLE `favourite_products` DISABLE KEYS */;
INSERT INTO `favourite_products` VALUES (10,5,9,'2021-03-11 12:17:29','2021-03-11 12:17:29'),(11,5,7,'2021-03-12 04:37:41','2021-03-12 04:37:41'),(13,4,9,'2021-03-12 11:21:04','2021-03-12 11:21:04'),(15,4,11,'2021-03-16 12:37:28','2021-03-16 12:37:28'),(16,9,6,'2021-03-16 13:15:19','2021-03-16 13:15:19'),(17,10,7,'2021-03-17 06:32:02','2021-03-17 06:32:02');
/*!40000 ALTER TABLE `favourite_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `maintenanceList`
--

DROP TABLE IF EXISTS `maintenanceList`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `maintenanceList` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nameList` varchar(191) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maintenanceList`
--

LOCK TABLES `maintenanceList` WRITE;
/*!40000 ALTER TABLE `maintenanceList` DISABLE KEYS */;
INSERT INTO `maintenanceList` VALUES (1,'Oil change','2021-02-18 11:34:42','2021-02-18 11:34:42');
/*!40000 ALTER TABLE `maintenanceList` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `makeDelivery`
--

DROP TABLE IF EXISTS `makeDelivery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `makeDelivery` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orderId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `deliveryNotes` varchar(255) NOT NULL DEFAULT '',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `makeDelivery`
--

LOCK TABLES `makeDelivery` WRITE;
/*!40000 ALTER TABLE `makeDelivery` DISABLE KEYS */;
/*!40000 ALTER TABLE `makeDelivery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `managerOrders`
--

DROP TABLE IF EXISTS `managerOrders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `managerOrders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `managerId` int(11) NOT NULL,
  `orderId` int(11) NOT NULL,
  `storeId` int(11) NOT NULL,
  `status` varchar(50) NOT NULL,
  `acceptDate` datetime DEFAULT NULL,
  `rejectDate` datetime DEFAULT NULL,
  `pickupDate` datetime DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `managerOrders_fk0` (`managerId`),
  KEY `managerOrders_fk1` (`orderId`),
  KEY `managerOrders_fk2` (`storeId`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `managerOrders`
--

LOCK TABLES `managerOrders` WRITE;
/*!40000 ALTER TABLE `managerOrders` DISABLE KEYS */;
INSERT INTO `managerOrders` VALUES (1,1,1,1,'ONGOING','2021-03-06 13:42:38',NULL,'2021-03-08 07:50:18','2021-03-06 13:42:37','2021-03-08 07:50:17'),(2,1,2,1,'ONGOING','2021-03-06 13:55:13',NULL,'2021-03-08 09:09:35','2021-03-06 13:55:13','2021-03-08 09:09:34'),(3,1,4,1,'ONGOING','2021-03-08 04:47:12',NULL,'2021-03-08 07:50:19','2021-03-08 04:47:11','2021-03-08 07:50:19'),(4,1,5,1,'ONGOING','2021-03-08 06:34:37',NULL,'2021-03-08 07:50:20','2021-03-08 06:34:37','2021-03-08 07:50:19'),(5,9,8,1,'ONGOING','2021-03-08 07:24:48',NULL,'2021-03-17 11:51:28','2021-03-08 07:24:47','2021-03-17 11:51:27'),(6,9,7,1,'ONGOING','2021-03-08 07:24:49',NULL,'2021-03-17 11:51:27','2021-03-08 07:24:48','2021-03-17 11:51:26'),(7,9,6,1,'ONGOING','2021-03-08 07:24:50',NULL,'2021-03-17 11:51:26','2021-03-08 07:24:49','2021-03-17 11:51:26'),(8,9,10,1,'ONGOING','2021-03-08 08:21:49',NULL,'2021-03-17 11:51:30','2021-03-08 08:21:48','2021-03-17 11:51:29'),(9,9,11,1,'ONGOING','2021-03-08 08:25:08',NULL,'2021-03-17 11:51:31','2021-03-08 08:25:07','2021-03-17 11:51:30'),(10,9,9,1,'ONGOING','2021-03-08 09:09:26',NULL,'2021-03-17 11:51:29','2021-03-08 09:09:25','2021-03-17 11:51:28'),(11,9,14,1,'ONGOING','2021-03-08 12:51:09',NULL,'2021-03-17 11:50:52','2021-03-08 12:51:08','2021-03-17 11:50:51'),(12,1,12,1,'ONGOING','2021-03-08 12:51:10',NULL,'2021-03-08 12:51:24','2021-03-08 12:51:09','2021-03-08 12:51:24'),(13,9,17,1,'ONGOING','2021-03-11 04:20:12',NULL,'2021-03-17 11:50:52','2021-03-11 04:13:12','2021-03-17 11:50:52'),(14,5,19,4,'ONGOING','2021-03-11 11:15:09',NULL,'2021-03-12 05:52:19','2021-03-11 11:15:08','2021-03-12 05:52:18'),(15,5,20,4,'ONGOING','2021-03-11 11:52:27',NULL,'2021-03-12 05:48:55','2021-03-11 11:52:27','2021-03-12 05:48:55'),(16,5,21,4,'ONGOING','2021-03-11 11:54:27',NULL,'2021-03-12 05:48:52','2021-03-11 11:54:26','2021-03-12 05:48:52'),(17,5,22,4,'REJECTED',NULL,'2021-03-11 12:55:48',NULL,'2021-03-11 12:55:47','2021-03-11 12:55:47'),(18,1,22,1,'ONGOING','2021-03-11 12:55:54',NULL,'2021-03-12 05:55:35','2021-03-11 12:55:53','2021-03-12 05:55:34'),(19,1,25,1,'ONGOING','2021-03-15 04:10:40',NULL,'2021-03-15 04:10:55','2021-03-15 04:10:39','2021-03-15 04:10:55'),(20,9,28,1,'ONGOING','2021-03-15 09:14:47',NULL,'2021-03-17 11:51:20','2021-03-15 09:14:47','2021-03-17 11:51:19'),(21,1,27,1,'ONGOING','2021-03-15 09:14:49',NULL,'2021-03-15 09:14:57','2021-03-15 09:14:48','2021-03-15 09:14:56'),(22,9,26,1,'ONGOING','2021-03-15 09:14:50',NULL,'2021-03-17 11:51:22','2021-03-15 09:14:49','2021-03-17 11:51:21'),(23,3,24,3,'ONGOING','2021-03-16 05:41:50',NULL,'2021-03-16 05:46:45','2021-03-16 05:41:50','2021-03-16 05:46:44'),(24,3,23,3,'ONGOING','2021-03-16 05:41:51',NULL,'2021-03-16 05:42:12','2021-03-16 05:41:51','2021-03-16 05:42:11'),(25,5,29,4,'ONGOING','2021-03-16 11:32:17',NULL,'2021-03-16 11:32:22','2021-03-16 11:32:16','2021-03-16 11:32:22'),(26,4,12,2,'ONGOING','2021-03-16 12:18:34',NULL,'2021-03-16 12:18:38','2021-03-16 12:18:34','2021-03-16 12:18:38'),(27,4,30,2,'REJECTED',NULL,'2021-03-16 12:22:40',NULL,'2021-03-16 12:22:39','2021-03-16 12:22:39'),(28,12,30,4,'ONGOING','2021-03-16 12:22:59',NULL,'2021-03-18 05:33:20','2021-03-16 12:22:58','2021-03-18 05:33:20'),(29,8,31,1,'ONGOING','2021-03-16 13:49:08',NULL,'2021-03-16 13:52:33','2021-03-16 13:49:07','2021-03-16 13:52:33'),(30,9,32,1,'ONGOING','2021-03-16 13:52:23',NULL,'2021-03-17 06:37:54','2021-03-16 13:52:22','2021-03-17 06:37:53'),(31,9,33,1,'ONGOING','2021-03-17 06:51:57',NULL,'2021-03-17 07:54:29','2021-03-17 06:51:57','2021-03-17 07:54:29'),(32,9,34,1,'ONGOING','2021-03-17 06:55:11',NULL,'2021-03-17 06:55:18','2021-03-17 06:55:11','2021-03-17 06:55:18'),(33,12,35,4,'ONGOING','2021-03-17 07:00:26',NULL,'2021-03-18 05:33:19','2021-03-17 07:00:26','2021-03-18 05:33:19'),(34,12,36,4,'ONGOING','2021-03-17 07:00:28',NULL,'2021-03-18 05:33:18','2021-03-17 07:00:28','2021-03-18 05:33:17'),(35,12,39,4,'ONGOING','2021-03-18 05:30:28',NULL,'2021-03-18 05:30:36','2021-03-18 05:30:27','2021-03-18 05:30:36');
/*!40000 ALTER TABLE `managerOrders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notificationList`
--

DROP TABLE IF EXISTS `notificationList`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notificationList` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `stoteManagerId` int(11) DEFAULT NULL,
  `driverId` int(11) DEFAULT NULL,
  `storeId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `routeId` int(11) DEFAULT NULL,
  `assigId` char(50) DEFAULT NULL,
  `orderId` int(11) DEFAULT NULL,
  `ordIds` char(50) DEFAULT NULL,
  `amount` float(10,2) NOT NULL DEFAULT '0.00',
  `notifyType` char(50) DEFAULT NULL,
  `notifyMessage` varchar(255) NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `notificationList_fk0` (`stoteManagerId`),
  KEY `notificationList_fk1` (`userId`),
  KEY `notificationList_fk2` (`driverId`),
  KEY `notificationList_fk3` (`routeId`),
  KEY `notificationList_fk4` (`orderId`),
  KEY `notificationList_fk5` (`storeId`),
  CONSTRAINT `notificationList_fk0` FOREIGN KEY (`stoteManagerId`) REFERENCES `storemanager` (`id`),
  CONSTRAINT `notificationList_fk1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `notificationList_fk2` FOREIGN KEY (`driverId`) REFERENCES `driver` (`id`),
  CONSTRAINT `notificationList_fk3` FOREIGN KEY (`routeId`) REFERENCES `driverOrders` (`id`),
  CONSTRAINT `notificationList_fk4` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`),
  CONSTRAINT `notificationList_fk5` FOREIGN KEY (`storeId`) REFERENCES `store` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notificationList`
--

LOCK TABLES `notificationList` WRITE;
/*!40000 ALTER TABLE `notificationList` DISABLE KEYS */;
INSERT INTO `notificationList` VALUES (1,3,NULL,3,4,NULL,NULL,24,'#Ord1051',0.00,'ADMIN_ACCEPT','Admin accept your order #Ord1051','2021-03-12 05:32:45','2021-03-12 05:32:45'),(2,1,NULL,1,2,NULL,NULL,25,'#Ord7106',0.00,'ADMIN_ACCEPT','Admin accept your order #Ord7106','2021-03-15 04:09:04','2021-03-15 04:09:04'),(3,NULL,2,NULL,NULL,17,'#Ass6808',NULL,NULL,0.00,'ASSIGN_ORDER','Admin assign you orders for delivery #Ass6808','2021-03-15 04:13:56','2021-03-15 04:13:56'),(4,1,NULL,1,2,NULL,NULL,28,'#Ord6469',0.00,'ADMIN_ACCEPT','Admin accept your order #Ord6469','2021-03-15 05:36:36','2021-03-15 05:36:36'),(5,1,NULL,1,2,NULL,NULL,27,'#Ord5421',0.00,'ADMIN_ACCEPT','Admin accept your order #Ord5421','2021-03-15 05:36:43','2021-03-15 05:36:43'),(6,1,NULL,1,2,NULL,NULL,26,'#Ord3756',0.00,'ADMIN_ACCEPT','Admin accept your order #Ord3756','2021-03-15 05:36:49','2021-03-15 05:36:49'),(7,NULL,1,NULL,NULL,18,'#Ass6395',NULL,NULL,0.00,'ASSIGN_ORDER','Admin assign you orders for delivery #Ass6395','2021-03-15 09:26:30','2021-03-15 09:26:30'),(8,NULL,1,NULL,NULL,19,'#Ass4697',NULL,NULL,0.00,'ASSIGN_ORDER','Admin assign you orders for delivery #Ass4697','2021-03-15 09:26:30','2021-03-15 09:26:30'),(9,4,NULL,4,7,NULL,NULL,29,'#Ord3197',0.00,'ADMIN_ACCEPT','Admin accept your order #Ord3197','2021-03-16 11:32:02','2021-03-16 11:32:02'),(10,NULL,4,NULL,NULL,20,'#Ass8976',NULL,NULL,0.00,'ASSIGN_ORDER','Admin assign you orders for delivery #Ass8976','2021-03-16 11:32:57','2021-03-16 11:32:57'),(11,NULL,3,NULL,NULL,21,'#Ass7547',NULL,NULL,0.00,'ASSIGN_ORDER','Admin assign you orders for delivery #Ass7547','2021-03-16 12:19:16','2021-03-16 12:19:16'),(12,2,NULL,2,7,NULL,NULL,30,'#Ord3374',0.00,'ADMIN_ACCEPT','Admin accept your order #Ord3374','2021-03-16 12:20:17','2021-03-16 12:20:17'),(13,4,NULL,4,7,NULL,NULL,30,'#Ord3374',0.00,'ADMIN_ACCEPT','Admin accept your order #Ord3374','2021-03-16 12:20:17','2021-03-16 12:20:17'),(14,NULL,3,NULL,NULL,22,'#Ass2304',NULL,NULL,0.00,'ASSIGN_ORDER','Admin assign you orders for delivery #Ass2304','2021-03-16 12:23:46','2021-03-16 12:23:46'),(15,1,NULL,1,7,NULL,NULL,31,'#Ord7001',0.00,'ADMIN_ACCEPT','Admin accept your order #Ord7001','2021-03-16 13:48:58','2021-03-16 13:48:58'),(16,NULL,3,NULL,NULL,23,'#Ass6183',NULL,NULL,0.00,'ASSIGN_ORDER','Admin assign you orders for delivery #Ass6183','2021-03-16 13:49:30','2021-03-16 13:49:30'),(17,1,NULL,1,7,NULL,NULL,32,'#Ord9737',0.00,'ADMIN_ACCEPT','Admin accept your order #Ord9737','2021-03-16 13:51:41','2021-03-16 13:51:41'),(18,NULL,3,NULL,NULL,24,'#Ass1827',NULL,NULL,0.00,'ASSIGN_ORDER','Admin assign you orders for delivery #Ass1827','2021-03-16 13:53:45','2021-03-16 13:53:45'),(19,1,NULL,1,10,NULL,NULL,33,'#Ord2378',0.00,'ADMIN_ACCEPT','Admin accept your order #Ord2378','2021-03-17 06:51:52','2021-03-17 06:51:52'),(20,1,NULL,1,10,NULL,NULL,34,'#Ord7247',0.00,'ADMIN_ACCEPT','Admin accept your order #Ord7247','2021-03-17 06:55:05','2021-03-17 06:55:05'),(21,4,NULL,4,11,NULL,NULL,35,'#Ord4430',0.00,'ADMIN_ACCEPT','Admin accept your order #Ord4430','2021-03-17 06:58:16','2021-03-17 06:58:16'),(22,4,NULL,4,11,NULL,NULL,36,'#Ord9819',0.00,'ADMIN_ACCEPT','Admin accept your order #Ord9819','2021-03-17 07:00:05','2021-03-17 07:00:05'),(23,NULL,3,NULL,NULL,25,'#Ass2818',NULL,NULL,0.00,'ASSIGN_ORDER','Admin assign you orders for delivery #Ass2818','2021-03-17 07:26:33','2021-03-17 07:26:33'),(24,NULL,3,NULL,NULL,26,'#Ass2162',NULL,NULL,0.00,'ASSIGN_ORDER','Admin assign you orders for delivery #Ass2162','2021-03-17 12:10:20','2021-03-17 12:10:20'),(25,4,NULL,4,11,NULL,NULL,39,'#Ord8431',0.00,'ADMIN_ACCEPT','Admin accept your order #Ord8431','2021-03-18 04:27:19','2021-03-18 04:27:19'),(26,4,NULL,4,11,NULL,NULL,38,'#Ord1630',0.00,'ADMIN_ACCEPT','Admin accept your order #Ord1630','2021-03-18 04:27:24','2021-03-18 04:27:24'),(27,3,NULL,3,9,NULL,NULL,37,'#Ord7644',0.00,'ADMIN_ACCEPT','Admin accept your order #Ord7644','2021-03-18 04:27:28','2021-03-18 04:27:28'),(28,NULL,3,NULL,NULL,27,'#Ass1447',NULL,NULL,0.00,'ASSIGN_ORDER','Admin assign you orders for delivery #Ass1447','2021-03-18 04:40:06','2021-03-18 04:40:06'),(29,NULL,3,NULL,NULL,28,'#Ass2531',NULL,NULL,0.00,'ASSIGN_ORDER','Admin assign you orders for delivery #Ass2531','2021-03-18 05:30:50','2021-03-18 05:30:50');
/*!40000 ALTER TABLE `notificationList` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notificationSettings`
--

DROP TABLE IF EXISTS `notificationSettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notificationSettings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(70) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` char(70) COLLATE utf8mb4_unicode_ci NOT NULL,
  `emailTitle` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `emailDescription` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `smsTitle` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `smsDescription` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `pushTitle` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `pushDescription` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` char(70) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'false',
  `sms` char(70) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'false',
  `push` char(70) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'false',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notificationSettings`
--

LOCK TABLES `notificationSettings` WRITE;
/*!40000 ALTER TABLE `notificationSettings` DISABLE KEYS */;
INSERT INTO `notificationSettings` VALUES (1,'Order Placed','Customer','1\\test','1tesr','sms 1','sms descz','push 1','push desc 1','true','true','true','2021-02-11 22:02:56','2021-03-15 04:17:54'),(2,'Order Accepted by stores','Customer','Goa','Tour','sms 2','sms desc 2','push 2','push desc 2','true','false','true','2021-02-11 22:02:56','2021-03-11 04:20:07'),(3,'Order Updated','Customer','3','3','sms 3','sms desc 3','push 3','push desc 3','false','false','false','2021-02-11 22:02:56','2021-02-15 05:38:50'),(4,'Order Completed','Customer','4','4','sms  4','SMS desc 4','push 4','push desc 4','false','false','false','2021-02-11 22:02:56','2021-02-15 05:38:51'),(5,'Order Cancelled','Customer','5','5','sms 5','sms desc 5','push 5','push desc 5','false','false','false','2021-02-11 22:02:56','2021-02-15 05:38:51'),(6,'Order Failed / Rejected','Customer','6','6','sms 6','sms desc 6','push 6','push ddesc 6','true','false','false','2021-02-11 22:02:56','2021-02-15 05:38:55'),(7,'Order Placed','Manager','storetest','store desctest','sms store 1','sms store desc','push store 1','push store desc 1','true','false','false','2021-02-11 22:02:56','2021-02-22 05:01:58'),(8,'Order Accepted by stores','Manager','store 2','desc 2','sms store 2','sms store  desc 2','push store 2','push store 2 desc','true','false','false','2021-02-11 22:02:56','2021-02-15 05:39:00'),(9,'Assignment Recieved','Delivery','deli email 1','desc deli email 1','sms deli 1','sms deli desc 1','push deli','push deli desc','false','false','false','2021-02-11 22:02:56','2021-02-15 05:39:04'),(10,'Custom Push','Delivery','deli email 2','deli email 2 desc','sms deli 2','sms deli desc 2','push deli 2','push deli 2 desc','true','false','false','2021-02-11 22:02:56','2021-02-15 05:39:02');
/*!40000 ALTER TABLE `notificationSettings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `offers`
--

DROP TABLE IF EXISTS `offers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `offers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image` varchar(255) NOT NULL,
  `status` varchar(15) NOT NULL DEFAULT 'active',
  `title` varchar(255) NOT NULL,
  `trustUser` char(50) NOT NULL DEFAULT '',
  `description` varchar(255) NOT NULL,
  `couponCode` varchar(255) NOT NULL,
  `discount` float(10,2) NOT NULL,
  `minimumValue` int(11) NOT NULL DEFAULT '0',
  `count` int(11) NOT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `offCategoryId` int(11) DEFAULT NULL,
  `offProductId` int(11) DEFAULT NULL,
  `offDelete` int(45) DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `offers`
--

LOCK TABLES `offers` WRITE;
/*!40000 ALTER TABLE `offers` DISABLE KEYS */;
INSERT INTO `offers` VALUES (1,'http://65.1.122.8/uploads/uploaded_file-1615030789249.jpg','active','Mar offer Coming Soon','true','Mar offer description','march',10.00,100,1000,'2021-03-06','2021-03-16',1,2,0,'2021-03-06 11:39:49','2021-03-06 10:54:13'),(2,'http://65.1.122.8/uploads/uploaded_file-1615193909739.jpg','active','FIRST50','true','Opening Ceremony','FIRST50',30.00,200,2,'2021-03-08','2021-03-12',2,6,0,'2021-03-08 08:58:29','2021-03-08 08:58:29');
/*!40000 ALTER TABLE `offers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderItems`
--

DROP TABLE IF EXISTS `orderItems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orderItems` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orderId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `storeId` int(11) NOT NULL,
  `u_id` int(11) DEFAULT NULL,
  `isAssign` int(11) NOT NULL DEFAULT '0',
  `quantity` int(11) NOT NULL DEFAULT '0',
  `price` float(10,2) NOT NULL,
  `discount` float(10,2) NOT NULL,
  `supplyPrice` float(10,2) NOT NULL,
  `assignDR` int(11) NOT NULL DEFAULT '0',
  `orderInstructions` varchar(512) NOT NULL DEFAULT '',
  `adminApprove` varchar(45) DEFAULT 'PENDING',
  `storeStatus` varchar(70) DEFAULT 'NOT CONFIRM',
  `cuttingStyleId` int(11) DEFAULT NULL,
  `boxStyleId` int(11) DEFAULT NULL,
  `isPaid` int(11) DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `orderItems_fk0` (`orderId`),
  KEY `orderItems_fk1` (`productId`),
  KEY `orderItems_fk2` (`storeId`),
  KEY `orderItems_fk6` (`u_id`),
  CONSTRAINT `orderItems_fk6` FOREIGN KEY (`u_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderItems`
--

LOCK TABLES `orderItems` WRITE;
/*!40000 ALTER TABLE `orderItems` DISABLE KEYS */;
INSERT INTO `orderItems` VALUES (4,2,4,1,1,1,5,90.00,5.00,427.50,1,'','ACCEPTED','ONGOING',NULL,NULL,0,'2021-03-06 13:36:50','2021-03-06 13:36:50'),(5,3,2,1,1,0,3,50.00,2.00,147.00,1,'','PENDING','NOT CONFIRM',NULL,NULL,0,'2021-03-06 13:37:14','2021-03-06 13:37:14'),(6,4,1,1,1,1,5,35.00,0.00,175.00,1,'','ACCEPTED','ONGOING',NULL,NULL,0,'2021-03-06 13:37:36','2021-03-06 13:37:36'),(7,5,2,1,5,1,4,50.00,2.00,196.00,1,'','ACCEPTED','ONGOING',NULL,NULL,0,'2021-03-08 06:32:07','2021-03-08 06:32:07'),(8,5,2,1,5,1,3,50.00,0.00,150.00,1,'','ACCEPTED','ONGOING',NULL,NULL,0,'2021-03-08 06:32:07','2021-03-08 06:32:07'),(9,5,3,1,5,1,5,45.00,10.00,202.50,1,'','ACCEPTED','ONGOING',NULL,NULL,0,'2021-03-08 06:32:07','2021-03-08 06:32:07'),(10,6,3,1,5,1,1,45.00,10.00,40.50,1,'','ACCEPTED','ONGOING',NULL,NULL,0,'2021-03-08 07:21:58','2021-03-08 07:21:58'),(11,7,4,1,3,1,1,80.00,5.00,76.00,1,'','ACCEPTED','ONGOING',NULL,NULL,0,'2021-03-08 07:23:11','2021-03-08 07:23:11'),(12,8,4,1,4,1,4,80.00,5.00,304.00,1,'','ACCEPTED','ONGOING',NULL,NULL,0,'2021-03-08 07:24:09','2021-03-08 07:24:09'),(13,8,3,1,4,1,3,45.00,10.00,121.50,1,'','ACCEPTED','ONGOING',NULL,NULL,0,'2021-03-08 07:24:09','2021-03-08 07:24:09'),(14,8,1,1,4,1,3,40.00,0.00,120.00,1,'','ACCEPTED','ONGOING',NULL,NULL,0,'2021-03-08 07:24:09','2021-03-08 07:24:09'),(15,8,2,1,4,1,4,50.00,2.00,196.00,1,'','ACCEPTED','ONGOING',NULL,NULL,0,'2021-03-08 07:24:09','2021-03-08 07:24:09'),(16,9,2,1,5,1,1,50.00,2.00,49.00,1,'','ACCEPTED','ONGOING',NULL,NULL,0,'2021-03-08 08:09:51','2021-03-08 08:09:51'),(17,10,2,1,3,1,1,50.00,0.00,50.00,1,'','ACCEPTED','ONGOING',NULL,NULL,0,'2021-03-08 08:21:22','2021-03-08 08:21:22'),(18,11,2,1,3,1,1,50.00,0.00,165.52,1,'','ACCEPTED','ONGOING',NULL,NULL,0,'2021-03-08 08:22:16','2021-03-08 08:22:16'),(19,12,2,1,4,1,2,50.00,2.00,98.00,1,'','ACCEPTED','ONGOING',NULL,NULL,0,'2021-03-08 12:47:20','2021-03-08 12:47:20'),(20,12,3,1,4,1,2,45.00,10.00,81.00,1,'','ACCEPTED','ONGOING',NULL,NULL,0,'2021-03-08 12:47:20','2021-03-08 12:47:20'),(21,12,1,1,4,1,2,40.00,0.00,80.00,1,'','ACCEPTED','ONGOING',NULL,NULL,0,'2021-03-08 12:47:20','2021-03-08 12:47:20'),(22,12,4,2,4,1,4,100.00,5.00,684.00,1,'','ACCEPTED','ONGOING',NULL,NULL,0,'2021-03-08 12:47:20','2021-03-08 12:47:20'),(23,12,6,1,4,1,5,230.00,5.00,1092.50,1,'','ACCEPTED','ONGOING',NULL,NULL,0,'2021-03-08 12:47:20','2021-03-08 12:47:20'),(25,14,2,1,4,1,1,50.00,2.00,49.00,1,'','ACCEPTED','ONGOING',NULL,NULL,0,'2021-03-08 12:49:07','2021-03-08 12:49:07'),(26,14,3,1,4,1,1,45.00,10.00,40.50,1,'','ACCEPTED','ONGOING',NULL,NULL,0,'2021-03-08 12:49:07','2021-03-08 12:49:07'),(27,15,6,3,5,0,4,180.00,5.00,684.00,0,'','PENDING','NOT CONFIRM',NULL,NULL,0,'2021-03-08 12:54:06','2021-03-08 12:54:06'),(30,16,4,1,8,0,2,80.00,5.00,152.00,0,'','PENDING','NOT CONFIRM',NULL,NULL,0,'2021-03-11 01:06:44','2021-03-11 01:06:44'),(32,18,9,4,4,0,2,58.00,1.00,114.84,0,'','PENDING','NOT CONFIRM',NULL,NULL,0,'2021-03-11 10:56:09','2021-03-11 10:56:09'),(34,20,7,4,4,1,2,100.00,0.00,200.00,1,'','ACCEPTED','ONGOING',NULL,NULL,0,'2021-03-11 11:20:34','2021-03-11 11:20:34'),(35,21,9,4,4,1,2,58.00,1.00,114.84,1,'','ACCEPTED','ONGOING',NULL,NULL,0,'2021-03-11 11:53:44','2021-03-11 11:53:44'),(37,22,7,4,5,1,2,100.00,0.00,200.00,1,'','ACCEPTED','REJECTED',NULL,NULL,0,'2021-03-11 12:51:39','2021-03-11 12:51:39'),(38,23,5,3,4,1,1,150.00,5.00,142.50,1,'','ACCEPTED','ONGOING',NULL,NULL,0,'2021-03-11 12:52:42','2021-03-11 12:52:42'),(40,25,4,1,2,1,2,80.00,5.00,152.00,1,'','ACCEPTED','ONGOING',NULL,NULL,0,'2021-03-15 04:07:22','2021-03-15 04:07:22'),(41,26,4,1,2,1,2,80.00,5.00,152.00,1,'','ACCEPTED','ONGOING',NULL,NULL,0,'2021-03-15 04:14:51','2021-03-15 04:14:51'),(43,28,4,1,2,1,3,80.00,5.00,228.00,1,'','ACCEPTED','ONGOING',NULL,NULL,0,'2021-03-15 04:32:00','2021-03-15 04:32:00'),(46,30,4,2,7,1,1,80.00,5.00,76.00,1,'','ACCEPTED','REJECTED',NULL,NULL,0,'2021-03-16 12:19:55','2021-03-16 12:19:55'),(47,31,6,1,7,1,1,230.00,5.00,218.50,1,'','ACCEPTED','ONGOING',NULL,NULL,0,'2021-03-16 13:48:42','2021-03-16 13:48:42'),(48,32,6,1,7,1,2,230.00,5.00,437.00,1,'','ACCEPTED','ONGOING',NULL,NULL,0,'2021-03-16 13:51:19','2021-03-16 13:51:19'),(49,33,6,1,10,1,4,230.00,5.00,874.00,1,'','ACCEPTED','ONGOING',NULL,NULL,0,'2021-03-17 06:36:04','2021-03-17 06:36:04'),(50,33,2,1,10,1,1,50.00,2.00,49.00,1,'','ACCEPTED','ONGOING',NULL,NULL,0,'2021-03-17 06:36:04','2021-03-17 06:36:04'),(51,33,1,1,10,1,1,40.00,0.00,40.00,1,'','ACCEPTED','ONGOING',NULL,NULL,0,'2021-03-17 06:36:04','2021-03-17 06:36:04'),(52,33,4,1,10,1,2,80.00,5.00,152.00,1,'','ACCEPTED','ONGOING',NULL,NULL,0,'2021-03-17 06:36:04','2021-03-17 06:36:04'),(53,33,3,1,10,1,2,45.00,10.00,81.00,1,'','ACCEPTED','ONGOING',NULL,NULL,0,'2021-03-17 06:36:04','2021-03-17 06:36:04'),(54,33,7,1,10,1,8,70.00,0.00,560.00,1,'','ACCEPTED','ONGOING',NULL,NULL,0,'2021-03-17 06:36:04','2021-03-17 06:36:04'),(55,34,7,1,10,1,2,70.00,0.00,140.00,1,'','ACCEPTED','ONGOING',NULL,NULL,0,'2021-03-17 06:54:49','2021-03-17 06:54:49'),(56,35,7,4,11,1,3,100.00,0.00,300.00,1,'','ACCEPTED','ONGOING',NULL,NULL,0,'2021-03-17 06:58:06','2021-03-17 06:58:06'),(57,36,9,4,11,1,3,50.00,1.00,148.50,1,'','ACCEPTED','ONGOING',NULL,NULL,0,'2021-03-17 06:59:54','2021-03-17 06:59:54'),(58,37,5,3,9,0,1,150.00,5.00,142.50,0,'','ACCEPTED','NOT CONFIRM',NULL,NULL,0,'2021-03-17 09:34:17','2021-03-17 09:34:17'),(59,37,6,3,9,0,2,180.00,5.00,342.00,0,'','ACCEPTED','NOT CONFIRM',NULL,NULL,0,'2021-03-17 09:34:17','2021-03-17 09:34:17'),(60,38,13,4,11,0,2,799.00,10.00,1438.20,0,'','ACCEPTED','NOT CONFIRM',NULL,NULL,0,'2021-03-17 11:19:50','2021-03-17 11:19:50'),(61,39,9,4,11,1,3,50.00,1.00,148.50,1,'','ACCEPTED','ONGOING',NULL,NULL,0,'2021-03-17 11:20:23','2021-03-17 11:20:23');
/*!40000 ALTER TABLE `orderItems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orderIDs` varchar(70) NOT NULL,
  `userId` int(11) NOT NULL,
  `addressId` int(11) NOT NULL,
  `timeId` int(11) NOT NULL,
  `as_driverId` int(11) DEFAULT NULL,
  `paymentId` int(11) NOT NULL,
  `orderStatus` varchar(70) NOT NULL DEFAULT 'PENDING',
  `isPlaced` int(11) NOT NULL DEFAULT '0',
  `acceptByStore` int(11) NOT NULL DEFAULT '0',
  `cancelledByUser` int(11) NOT NULL DEFAULT '0',
  `assignDriver` int(11) NOT NULL DEFAULT '0',
  `packedByStore` int(11) NOT NULL DEFAULT '0',
  `packedByDriver` int(11) NOT NULL DEFAULT '0',
  `onWayToDelivery` int(11) NOT NULL DEFAULT '0',
  `driverAssign` int(11) DEFAULT '0',
  `orderRouteId` int(11) DEFAULT NULL,
  `orderProgress` char(50) DEFAULT 'PLACED',
  `isApproved` varchar(45) DEFAULT 'PENDING',
  `orderOn` datetime NOT NULL,
  `deliveryOn` datetime DEFAULT NULL,
  `deliveryDate` date DEFAULT NULL,
  `cancelDate` datetime DEFAULT NULL,
  `cancelReason` varchar(255) DEFAULT '',
  `ordertax` float(10,2) DEFAULT '0.00',
  `taxValue` float(10,2) DEFAULT '0.00',
  `totalAmount` float(10,2) NOT NULL,
  `discountAmount` float(10,2) NOT NULL,
  `grandTotal` float(10,2) NOT NULL,
  `paidByWallet` float(10,2) DEFAULT '0.00',
  `couponDiscount` float(10,2) DEFAULT '0.00',
  `couponDiscountPer` float(10,2) DEFAULT '0.00',
  `totalQuantity` int(11) NOT NULL DEFAULT '0',
  `trustUserOrder` int(11) DEFAULT '0',
  `trustTrans` float(10,2) DEFAULT '0.00',
  `delievryNotes` varchar(812) DEFAULT '',
  `fastDelivery` int(45) NOT NULL DEFAULT '0',
  `isRate` int(11) DEFAULT '0',
  `deleteItems` int(11) NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `orders_fk0` (`userId`),
  KEY `orders_fk2` (`addressId`),
  KEY `orders_fk3` (`timeId`),
  KEY `orders_fk4` (`paymentId`),
  KEY `orders_fk7` (`as_driverId`),
  CONSTRAINT `orders_fk7` FOREIGN KEY (`as_driverId`) REFERENCES `driver` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'#Ord9806',1,2,29,2,2,'ONGOING',1,1,0,1,0,0,0,1,2,'ACCEPTSTORE','ACCEPTED','2021-03-06 13:33:29',NULL,'2021-03-06',NULL,'',12.75,5.00,265.00,10.00,12.75,0.00,0.00,0.00,4,0,0.00,'tt',0,0,0,'2021-03-06 13:33:28','2021-03-09 13:40:33'),(2,'#Ord9901',1,2,29,1,2,'ONGOING',1,1,0,1,0,0,0,1,5,'ACCEPTSTORE','ACCEPTED','2021-03-06 13:36:50',NULL,'2021-03-06',NULL,'',21.38,5.00,450.00,22.50,448.88,0.00,0.00,0.00,5,0,0.00,'gg',0,0,0,'2021-03-06 13:36:50','2021-03-08 09:09:34'),(3,'#Ord9165',1,2,38,1,2,'PENDING',1,0,0,1,0,0,0,1,5,'PLACED','PENDING','2021-03-06 13:37:14',NULL,'2021-03-06',NULL,'',7.35,5.00,150.00,3.00,154.35,0.00,0.00,0.00,3,0,0.00,'',0,0,1,'2021-03-06 13:37:14','2021-03-07 14:57:48'),(4,'#Ord6042',1,2,29,1,2,'ONGOING',1,1,0,1,0,0,0,1,5,'ACCEPTSTORE','ACCEPTED','2021-03-06 13:37:36',NULL,'2021-03-06',NULL,'',8.75,5.00,175.00,0.00,183.75,0.00,0.00,0.00,5,0,0.00,'',0,0,0,'2021-03-06 13:37:36','2021-03-08 07:50:19'),(5,'#Ord7968',5,8,29,3,2,'ONGOING',1,1,0,1,0,0,0,1,6,'ACCEPTSTORE','ACCEPTED','2021-03-08 06:32:08',NULL,'2021-03-08',NULL,'',62.22,12.00,545.00,26.50,150.00,0.00,0.00,0.00,12,0,0.00,'Nik',0,0,1,'2021-03-08 06:32:07','2021-03-08 07:50:19'),(6,'#Ord1035',5,8,38,3,2,'ONGOING',1,1,0,1,0,0,0,1,11,'ACCEPTSTORE','ACCEPTED','2021-03-08 07:21:59',NULL,'2021-03-08',NULL,'',4.86,12.00,45.00,4.50,45.36,0.00,0.00,0.00,1,0,0.00,'gg',0,1,0,'2021-03-08 07:21:58','2021-03-17 11:51:26'),(7,'#Ord7513',3,6,3,3,2,'ONGOING',1,1,0,1,0,0,0,1,11,'ACCEPTSTORE','ACCEPTED','2021-03-08 07:23:12',NULL,'2021-03-09',NULL,'',20.52,12.00,180.00,9.00,191.52,0.00,0.00,0.00,1,0,0.00,'',0,0,0,'2021-03-08 07:23:11','2021-03-17 11:51:26'),(8,'#Ord9714',4,5,29,3,2,'ONGOING',1,1,0,1,0,0,0,1,11,'ACCEPTSTORE','ACCEPTED','2021-03-08 07:24:09',NULL,'2021-03-08',NULL,'',134.58,12.00,1175.00,53.50,1256.08,0.00,0.00,0.00,14,0,0.00,'uuh',0,1,1,'2021-03-08 07:24:09','2021-03-17 11:51:27'),(9,'#Ord4402',5,8,26,3,2,'ONGOING',1,1,0,1,0,0,0,1,8,'ACCEPTSTORE','ACCEPTED','2021-03-08 08:09:51',NULL,'2021-03-08',NULL,'',5.88,12.00,50.00,1.00,54.88,0.00,0.00,0.00,1,0,0.00,'',0,1,1,'2021-03-08 08:09:51','2021-03-17 11:51:28'),(10,'#Ord6848',3,6,29,2,2,'ONGOING',1,1,0,1,0,0,0,1,7,'ACCEPTSTORE','ACCEPTED','2021-03-08 08:21:23',NULL,'2021-03-08',NULL,'',20.52,12.00,180.00,9.00,50.00,0.00,0.00,0.00,1,0,0.00,'temp',0,1,1,'2021-03-08 08:21:22','2021-03-17 11:51:29'),(11,'#Ord1740',3,6,29,3,2,'ONGOING',1,1,0,1,0,0,0,1,11,'ACCEPTSTORE','ACCEPTED','2021-03-08 08:22:16',NULL,'2021-03-08',NULL,'',20.52,12.00,180.00,9.00,165.52,0.00,0.00,0.00,1,0,0.00,'h',0,0,1,'2021-03-08 08:22:16','2021-03-17 11:51:30'),(12,'#Ord7544',4,14,38,3,2,'ONGOING',1,1,0,1,0,0,0,1,10,'ACCEPTSTORE','ACCEPTED','2021-03-08 12:47:20',NULL,'2021-03-08',NULL,'',346.86,12.00,3040.00,149.50,3237.36,0.00,0.00,0.00,15,0,0.00,'hsbsb',0,1,1,'2021-03-08 12:47:20','2021-03-16 12:18:38'),(13,'#Ord5018',4,14,38,NULL,2,'REJECTED',1,0,0,0,0,0,0,0,NULL,'PLACED','REJECTED','2021-03-08 12:47:51',NULL,'2021-03-08',NULL,'',93.48,12.00,820.00,41.00,530.48,0.00,0.00,0.00,2,0,0.00,'',0,0,1,'2021-03-08 12:47:51','2021-03-09 13:44:45'),(14,'#Ord2281',4,14,5,3,2,'ONGOING',1,1,0,1,0,0,0,1,9,'ACCEPTSTORE','ACCEPTED','2021-03-08 12:49:07',NULL,'2021-03-09',NULL,'',10.74,12.00,95.00,5.50,100.24,0.00,0.00,0.00,2,0,0.00,'Good Location',0,1,0,'2021-03-08 12:49:07','2021-03-17 11:50:51'),(15,'#Ord4895',5,8,38,NULL,2,'CANCELLED',1,0,1,0,0,0,0,0,NULL,'PLACED','PENDING','2021-03-08 12:54:06',NULL,'2021-03-08','2021-03-11 12:04:59','Lorem ipsum dolor sit amet,consetuter',186.96,12.00,1640.00,82.00,1744.96,0.00,0.00,0.00,4,0,0.00,'',0,0,1,'2021-03-08 12:54:06','2021-03-11 12:04:58'),(16,'#Ord9139',8,20,9,NULL,2,'CANCELLED',1,0,1,0,0,0,0,0,NULL,'PLACED','PENDING','2021-03-11 01:06:44',NULL,'2021-03-13','2021-03-11 01:08:45','Lorem ipsum dolor sit amet,consetuter',60.36,12.00,530.00,27.00,402.36,0.00,0.00,0.00,6,0,0.00,'',0,0,0,'2021-03-11 01:06:44','2021-03-11 10:11:19'),(17,'#Ord3638',2,21,7,2,2,'ONGOING',1,1,0,1,0,0,0,1,12,'ACCEPTSTORE','ACCEPTED','2021-03-11 04:09:24',NULL,'2021-03-11',NULL,'',93.48,12.00,820.00,41.00,435.48,0.00,0.00,0.00,2,0,0.00,'bshshsj',0,1,0,'2021-03-11 04:09:23','2021-03-17 11:50:52'),(18,'#Ord2947',4,23,1,NULL,2,'CANCELLED',1,0,1,0,0,0,0,0,NULL,'PLACED','PENDING','2021-03-11 10:56:09',NULL,'2021-03-12','2021-03-11 11:13:10','hshhd\n',13.78,12.00,116.00,1.16,128.62,0.00,0.00,0.00,2,0,0.00,'',0,0,1,'2021-03-11 10:56:09','2021-03-11 11:13:10'),(19,'#Ord7535',4,23,1,3,2,'ONGOING',1,1,0,1,0,0,0,1,13,'ACCEPTSTORE','ACCEPTED','2021-03-11 11:13:48',NULL,'2021-03-12',NULL,'',17.23,15.00,116.00,1.16,17.23,0.00,0.00,0.00,2,0,0.00,'Address looks easy',0,1,1,'2021-03-11 11:13:47','2021-03-12 05:52:18'),(20,'#Ord1179',4,24,1,3,2,'ONGOING',1,1,0,1,0,0,0,1,14,'ACCEPTSTORE','ACCEPTED','2021-03-11 11:20:35',NULL,'2021-03-12',NULL,'',24.00,12.00,200.00,0.00,224.00,0.00,0.00,0.00,2,0,0.00,'bh',0,1,1,'2021-03-11 11:20:34','2021-03-12 05:48:55'),(21,'#Ord2939',4,23,17,3,2,'ONGOING',1,1,0,1,0,0,0,1,16,'ACCEPTSTORE','ACCEPTED','2021-03-11 11:53:45',NULL,'2021-03-12',NULL,'',13.78,12.00,116.00,1.16,128.62,0.00,0.00,0.00,2,0,0.00,'',0,0,0,'2021-03-11 11:53:44','2021-03-12 05:48:52'),(22,'#Ord3932',5,25,1,3,2,'ONGOING',1,1,0,1,0,0,0,1,15,'ACCEPTSTORE','ACCEPTED','2021-03-11 12:51:39',NULL,'2021-03-12',NULL,'',85.56,12.00,740.00,27.00,570.56,0.00,0.00,0.00,5,0,0.00,'bx',0,0,1,'2021-03-11 12:51:39','2021-03-12 05:55:34'),(23,'#Ord9238',4,18,17,3,2,'COMPLETED',1,1,0,1,0,0,0,1,21,'ACCEPTSTORE','ACCEPTED','2021-03-11 12:52:42',NULL,'2021-03-12',NULL,'',17.10,12.00,150.00,7.50,159.60,0.00,0.00,0.00,1,0,0.00,'',0,1,0,'2021-03-11 12:52:42','2021-03-16 12:31:39'),(24,'#Ord1051',4,18,8,NULL,2,'ONGOING',1,1,0,0,0,0,0,0,NULL,'ACCEPTSTORE','ACCEPTED','2021-03-12 05:32:30',NULL,'2021-03-12',NULL,'',17.10,12.00,150.00,7.50,0.00,0.00,0.00,0.00,1,0,0.00,'',1,0,1,'2021-03-12 05:32:29','2021-03-16 05:46:44'),(25,'#Ord7106',2,21,2,2,2,'ONGOING',1,1,0,1,0,0,0,1,17,'ACCEPTSTORE','ACCEPTED','2021-03-15 04:07:22',NULL,'2021-03-15',NULL,'',36.48,12.00,320.00,16.00,340.48,0.00,0.00,0.00,2,1,0.00,'',0,0,0,'2021-03-15 04:07:22','2021-03-15 04:13:56'),(26,'#Ord3756',2,21,2,3,2,'ONGOING',1,1,0,1,0,0,0,1,21,'ACCEPTSTORE','ACCEPTED','2021-03-15 04:14:51',NULL,'2021-03-15',NULL,'',36.48,12.00,320.00,16.00,340.48,0.00,0.00,0.00,2,1,0.00,'',1,0,0,'2021-03-15 04:14:51','2021-03-17 11:51:21'),(27,'#Ord5421',2,21,2,NULL,2,'ONGOING',1,1,0,0,0,0,0,0,NULL,'ACCEPTSTORE','ACCEPTED','2021-03-15 04:18:34',NULL,'2021-03-15',NULL,'',18.24,12.00,160.00,8.00,94.24,0.00,0.00,0.00,1,1,0.00,'',0,0,0,'2021-03-15 04:18:34','2021-03-16 11:44:55'),(28,'#Ord6469',2,21,2,1,2,'ONGOING',1,1,0,1,0,0,0,1,19,'ACCEPTSTORE','ACCEPTED','2021-03-15 04:32:01',NULL,'2021-03-15',NULL,'',54.72,12.00,480.00,24.00,510.72,0.00,0.00,0.00,3,1,0.00,'Test',0,0,0,'2021-03-15 04:32:00','2021-03-17 11:51:19'),(29,'#Ord3197',7,33,6,4,2,'ONGOING',1,1,0,1,0,0,0,1,20,'ACCEPTSTORE','ACCEPTED','2021-03-16 11:31:11',NULL,'2021-03-17',NULL,'',60.00,12.00,500.00,0.00,60.00,0.00,0.00,0.00,5,1,0.00,'',0,0,1,'2021-03-16 11:31:11','2021-03-16 11:45:12'),(30,'#Ord3374',7,33,35,3,2,'ONGOING',1,1,0,1,0,0,0,1,22,'ACCEPTSTORE','ACCEPTED','2021-03-16 12:19:55',NULL,'2021-03-16',NULL,'',234.13,12.00,2159.00,207.90,386.13,0.00,0.00,0.00,2,1,0.00,'',0,1,1,'2021-03-16 12:19:55','2021-03-18 05:33:20'),(31,'#Ord7001',7,37,35,3,2,'ONGOING',1,1,0,1,0,0,0,1,23,'ACCEPTSTORE','ACCEPTED','2021-03-16 13:48:42',NULL,'2021-03-16',NULL,'',46.74,12.00,410.00,20.50,436.24,0.00,0.00,0.00,1,1,0.00,'fgjj',0,1,1,'2021-03-16 13:48:42','2021-03-16 13:52:33'),(32,'#Ord9737',7,37,31,3,2,'ONGOING',1,1,0,1,0,0,0,1,24,'ACCEPTSTORE','ACCEPTED','2021-03-16 13:51:20',NULL,'2021-03-16',NULL,'',93.48,12.00,820.00,41.00,872.48,0.00,0.00,0.00,2,1,0.00,'',0,1,0,'2021-03-16 13:51:19','2021-03-17 06:37:53'),(33,'#Ord2378',10,40,6,3,2,'COMPLETED',1,1,0,1,0,0,0,1,27,'ACCEPTSTORE','ACCEPTED','2021-03-17 06:36:04',NULL,'2021-03-17',NULL,'',407.04,12.00,3500.00,108.00,3799.04,0.00,0.00,0.00,18,0,0.00,'',0,0,1,'2021-03-17 06:36:04','2021-03-18 05:27:34'),(34,'#Ord7247',10,40,6,3,2,'COMPLETED',1,1,0,1,0,0,0,1,27,'ACCEPTSTORE','ACCEPTED','2021-03-17 06:54:49',NULL,'2021-03-17',NULL,'',40.80,12.00,340.00,0.00,380.80,0.00,0.00,0.00,2,0,0.00,'',0,0,1,'2021-03-17 06:54:49','2021-03-18 05:27:44'),(35,'#Ord4430',11,38,6,3,2,'ONGOING',1,1,0,1,0,0,0,1,26,'ACCEPTSTORE','ACCEPTED','2021-03-17 06:58:06',NULL,'2021-03-17',NULL,'',61.20,12.00,510.00,0.00,571.20,0.00,0.00,0.00,3,0,0.00,'',0,0,0,'2021-03-17 06:58:06','2021-03-18 05:33:19'),(36,'#Ord9819',11,38,6,3,2,'ONGOING',1,1,0,1,0,0,0,1,25,'ACCEPTSTORE','ACCEPTED','2021-03-17 06:59:55',NULL,'2021-03-17',NULL,'',17.82,12.00,150.00,1.50,166.32,0.00,0.00,0.00,3,0,0.00,'',0,1,1,'2021-03-17 06:59:54','2021-03-18 05:33:17'),(37,'#Ord7644',9,42,33,NULL,2,'ACCEPTED',1,0,0,0,0,0,0,0,NULL,'PLACED','ACCEPTED','2021-03-17 09:34:18',NULL,'2021-03-17',NULL,'',110.58,12.00,970.00,48.50,1032.08,0.00,0.00,0.00,3,0,0.00,'',0,0,1,'2021-03-17 09:34:17','2021-03-18 04:27:28'),(38,'#Ord1630',11,38,33,NULL,2,'ACCEPTED',1,0,0,0,0,0,0,0,NULL,'PLACED','ACCEPTED','2021-03-17 11:19:50',NULL,'2021-03-17',NULL,'',172.58,12.00,1598.00,159.80,1610.78,0.00,0.00,0.00,2,0,0.00,'',0,0,0,'2021-03-17 11:19:50','2021-03-18 04:27:24'),(39,'#Ord8431',11,38,33,3,2,'COMPLETED',1,1,0,1,0,0,0,1,28,'ACCEPTSTORE','ACCEPTED','2021-03-17 11:20:23',NULL,'2021-03-17',NULL,'',22.27,15.00,150.00,1.50,170.78,0.00,0.00,0.00,3,0,0.00,'Teno',0,0,1,'2021-03-17 11:20:23','2021-03-18 05:31:37');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paymentType`
--

DROP TABLE IF EXISTS `paymentType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `paymentType` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `status` char(50) NOT NULL DEFAULT 'active',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paymentType`
--

LOCK TABLES `paymentType` WRITE;
/*!40000 ALTER TABLE `paymentType` DISABLE KEYS */;
INSERT INTO `paymentType` VALUES (1,'card','active','2020-10-30 08:26:35','2020-10-30 08:26:35'),(2,'cash','active','2020-12-07 08:12:20','2020-12-07 08:12:20');
/*!40000 ALTER TABLE `paymentType` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `policyNcondition`
--

DROP TABLE IF EXISTS `policyNcondition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `policyNcondition` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `privacyPolicy` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `termsNcondition` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `policyNcondition`
--

LOCK TABLES `policyNcondition` WRITE;
/*!40000 ALTER TABLE `policyNcondition` DISABLE KEYS */;
/*!40000 ALTER TABLE `policyNcondition` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categoryId` int(11) DEFAULT NULL,
  `productCategoryId` int(11) NOT NULL,
  `productSubCategoryId` int(11) DEFAULT NULL,
  `storeId` int(11) DEFAULT NULL,
  `productCode` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `productName` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `arabicName` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `productStatus` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `productWeight` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `qty` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `maxQty` int(11) DEFAULT '0',
  `productPrice` float(10,2) NOT NULL DEFAULT '0.00',
  `productDiscount` float(10,2) NOT NULL DEFAULT '0.00',
  `productDiscountStatus` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'percentage',
  `productDescription` varchar(512) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `isBestProduct` int(5) DEFAULT '0',
  `orderVariants` char(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `specialInstructions` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `instructionsStatus` char(50) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `differentPriceVariant` char(50) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `isComingSoon` char(50) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `managerPrice` char(50) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `status` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `isDelete` int(11) NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `product_fk0` (`productCategoryId`),
  KEY `product_fk1` (`productSubCategoryId`),
  KEY `product_fk2` (`storeId`),
  KEY `product_fk3` (`categoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,1,1,NULL,NULL,'#Pro5625','Idly','الخمول','active','0','2',5,30.00,0.00,'percentage','',0,'','','true','','false','true','active',0,'2021-03-06 06:33:27','2021-03-06 06:33:27'),(2,1,1,NULL,NULL,'#Pro8060','Paper Roast','تحميص الورق','active','0','1',5,50.00,2.00,'percentage','',0,'','','true','','false','true','active',0,'2021-03-06 08:34:15','2021-03-06 08:34:15'),(3,1,1,NULL,NULL,'#Pro5912','Poori','بوري','active','0','2',5,40.00,10.00,'percentage','',0,'','','true','','false','true','active',0,'2021-03-06 08:35:26','2021-03-06 08:35:26'),(4,1,1,NULL,NULL,'#Pro6572','Mini-Tiffin','ميني تيفين','active','0','1',5,80.00,5.00,'percentage','',0,'','','true','','false','true','active',0,'2021-03-16 12:07:47','2021-03-06 08:36:51'),(5,2,2,NULL,NULL,'#Pro7817','Chicken Biryani','برياني دجاج','active','0','1',5,150.00,5.00,'percentage','',0,'','','true','','false','true','active',0,'2021-03-08 05:21:42','2021-03-08 05:21:42'),(6,2,3,NULL,NULL,'#Pro5636','Shakshuka','شكشوكة','active','0','5',5,180.00,5.00,'percentage','',0,'','','true','','true','true','active',0,'2021-03-12 04:39:42','2021-03-08 05:55:05'),(7,3,6,NULL,NULL,'#Pro5795','Diary Milk','الحليب الألبان','active','0','5',10,100.00,0.00,'percentage','',0,'','','true','','false','true','active',0,'2021-03-16 06:40:13','2021-03-11 06:24:08'),(8,3,6,NULL,NULL,'#Pro2425','Milky Bar','شريط حليبي','active','0','2',8,120.00,5.00,'percentage','',0,'','','true','','false','true','active',0,'2021-03-12 04:38:26','2021-03-11 06:25:56'),(9,3,5,NULL,NULL,'#Pro6804','Lays','Lays','active','0','10',5,50.00,1.00,'percentage','',0,'','','true','','false','true','active',0,'2021-03-16 06:40:17','2021-03-11 06:27:25'),(10,3,4,NULL,NULL,'#Pro4075','Rice','أرز','active','0','2KG',5,100.00,5.00,'percentage','',0,'','','true','','false','true','active',0,'2021-03-12 05:59:56','2021-03-11 07:54:27'),(11,3,7,2,NULL,'#Pro4711','Realme Headphones','سماعات Realme','active','0','1 No\'s',2,1999.00,10.00,'percentage','',0,'','','true','','true','true','active',0,'2021-03-17 09:42:08','2021-03-12 07:19:55'),(12,3,7,2,NULL,'#Pro2952','Noise Band','نطاق الضوضاء','active','0','1',1,2799.00,10.00,'percentage','',0,'','','true','','false','true','active',0,'2021-03-17 09:42:07','2021-03-12 07:22:50'),(13,3,7,1,NULL,'#Pro4683','Denim Shirts','قمصان دنيم','active','0','1',2,799.00,10.00,'percentage','',1,'','','true','','true','true','active',0,'2021-03-16 06:40:29','2021-03-12 10:56:08'),(14,3,7,1,NULL,'#Pro7360','Levi\'s Shirt','قميص ليفي','active','0','1',2,1200.00,10.00,'percentage','',0,'','','true','','false','true','active',0,'2021-03-12 13:18:27','2021-03-12 13:18:27');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productVariants`
--

DROP TABLE IF EXISTS `productVariants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productVariants` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `productId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT '',
  `image` varchar(255) NOT NULL DEFAULT '',
  `price` float(10,2) NOT NULL,
  `stock` varchar(70) NOT NULL,
  `variantStatus` varchar(50) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `productVariants_fk0` (`productId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productVariants`
--

LOCK TABLES `productVariants` WRITE;
/*!40000 ALTER TABLE `productVariants` DISABLE KEYS */;
/*!40000 ALTER TABLE `productVariants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_category`
--

DROP TABLE IF EXISTS `product_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categoryId` int(11) NOT NULL,
  `isSubcate` int(11) NOT NULL DEFAULT '0',
  `minimumOrderValue` int(11) NOT NULL DEFAULT '0',
  `sub_processingMin` int(11) NOT NULL DEFAULT '0',
  `orderProcessing` varchar(70) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `storeId` int(11) DEFAULT NULL,
  `arabicName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `minOrderTime` int(11) NOT NULL DEFAULT '0',
  `managerPrice` varchar(70) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `isComingSoon` varchar(70) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `productCategoryName` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productCategoryImage` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productCategoryStatus` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `isDelete` int(11) NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `product_category_fk0` (`categoryId`),
  KEY `product_category_fk1` (`storeId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_category`
--

LOCK TABLES `product_category` WRITE;
/*!40000 ALTER TABLE `product_category` DISABLE KEYS */;
INSERT INTO `product_category` VALUES (1,1,0,30,0,'10',2,'عناصر تيفين',15,'true','false','Tiffin Items','http://65.1.122.8/uploads/uploaded_file-1615012300044.jpg','active',0,'2021-03-16 12:08:05','2021-03-06 06:31:40'),(2,2,0,100,0,'10',3,'برياني',10,'true','false','Biryani','http://65.1.122.8/uploads/uploaded_file-1615180573802.jpg','active',0,'2021-03-08 05:16:14','2021-03-08 05:16:14'),(3,2,0,100,0,'10',3,'عناصر البيض',10,'true','false','Egg Items','http://65.1.122.8/uploads/uploaded_file-1615182780254.jpg','active',0,'2021-03-08 05:53:00','2021-03-08 05:53:00'),(4,3,0,100,0,'20',4,'أحكام',10,'true','false','Provisions','http://65.1.122.8/uploads/uploaded_file-1615441615815.jpg','active',0,'2021-03-11 07:34:38','2021-03-11 05:46:56'),(5,3,0,100,0,'10',4,'سناك الاطفال',12,'true','false','Kids Snack','http://65.1.122.8/uploads/uploaded_file-1615441658030.jpg','active',0,'2021-03-11 05:47:38','2021-03-11 05:47:38'),(6,3,0,100,0,'10',4,'الشوكولاتة',15,'true','false','Chocolates','http://65.1.122.8/uploads/uploaded_file-1615442127428.jpg','active',0,'2021-03-11 05:55:27','2021-03-11 05:48:25'),(7,3,1,50,0,'10',4,'موضة',10,'true','false','Fashion','http://65.1.122.8/uploads/uploaded_file-1615533411569.jpg','active',0,'2021-03-12 07:16:52','2021-03-12 07:16:52');
/*!40000 ALTER TABLE `product_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_image`
--

DROP TABLE IF EXISTS `product_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `productId` int(11) NOT NULL,
  `productImage` varchar(255) NOT NULL,
  `productImageStatus` varchar(50) NOT NULL DEFAULT 'active',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `product_image_fk0` (`productId`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_image`
--

LOCK TABLES `product_image` WRITE;
/*!40000 ALTER TABLE `product_image` DISABLE KEYS */;
INSERT INTO `product_image` VALUES (1,1,'http://65.1.122.8/uploads/uploaded_file-1615012407633.jpg','active','2021-03-06 06:33:27','2021-03-06 06:33:27'),(2,2,'http://65.1.122.8/uploads/uploaded_file-1615019655261.jpg','active','2021-03-06 08:34:15','2021-03-06 08:34:15'),(10,3,'http://65.1.122.8/uploads/uploaded_file-1615019655261.jpg','active','2021-03-06 11:13:19','2021-03-06 11:13:19'),(11,3,'http://65.1.122.8/uploads/uploaded_file-1615019726741.jpg','active','2021-03-06 11:13:19','2021-03-06 11:13:19'),(12,3,'http://65.1.122.8/uploads/uploaded_file-1615019726857.jpg','active','2021-03-06 11:13:19','2021-03-06 11:13:19'),(17,5,'http://65.1.122.8/uploads/uploaded_file-1615180902017.jpg','active','2021-03-08 05:21:42','2021-03-08 05:21:42'),(18,6,'http://65.1.122.8/uploads/uploaded_file-1615182905206.jpg','active','2021-03-08 05:55:05','2021-03-08 05:55:05'),(46,12,'http://65.1.122.8/uploads/uploaded_file-1615533594297.jpg','active','2021-03-16 06:43:08','2021-03-16 06:43:08'),(47,12,'http://65.1.122.8/uploads/uploaded_file-1615533769785.jpg','active','2021-03-16 06:43:08','2021-03-16 06:43:08'),(48,12,'http://65.1.122.8/uploads/uploaded_file-1615533770848.jpg','active','2021-03-16 06:43:08','2021-03-16 06:43:08'),(49,11,'http://65.1.122.8/uploads/uploaded_file-1615533594297.jpg','active','2021-03-16 06:43:19','2021-03-16 06:43:19'),(50,14,'http://65.1.122.8/uploads/uploaded_file-1615555106566.jpg','active','2021-03-16 06:43:41','2021-03-16 06:43:41'),(51,14,'http://65.1.122.8/uploads/uploaded_file-1615546568722.jpg','active','2021-03-16 06:43:41','2021-03-16 06:43:41'),(52,13,'http://65.1.122.8/uploads/uploaded_file-1615546568722.jpg','active','2021-03-16 06:43:51','2021-03-16 06:43:51'),(57,9,'http://65.1.122.8/uploads/uploaded_file-1615444045231.jpg','active','2021-03-16 06:44:46','2021-03-16 06:44:46'),(60,7,'http://65.1.122.8/uploads/uploaded_file-1615443848844.jpg','active','2021-03-16 11:26:44','2021-03-16 11:26:44'),(61,4,'http://65.1.122.8/uploads/uploaded_file-1615012407633.jpg','active','2021-03-16 12:09:09','2021-03-16 12:09:09'),(62,4,'http://65.1.122.8/uploads/uploaded_file-1615019811011.jpg','active','2021-03-16 12:09:09','2021-03-16 12:09:09'),(63,4,'http://65.1.122.8/uploads/uploaded_file-1615019810885.jpg','active','2021-03-16 12:09:09','2021-03-16 12:09:09'),(64,4,'http://65.1.122.8/uploads/uploaded_file-1615019811168.jpg','active','2021-03-16 12:09:09','2021-03-16 12:09:09'),(65,8,'http://65.1.122.8/uploads/uploaded_file-1615443848844.jpg','active','2021-03-17 04:39:25','2021-03-17 04:39:25'),(66,8,'http://65.1.122.8/uploads/uploaded_file-1615443956550.jpg','active','2021-03-17 04:39:25','2021-03-17 04:39:25'),(67,8,'http://65.1.122.8/uploads/uploaded_file-1615443956625.jpg','active','2021-03-17 04:39:25','2021-03-17 04:39:25'),(68,10,'http://65.1.122.8/uploads/uploaded_file-1615449267314.jpg','active','2021-03-17 05:46:04','2021-03-17 05:46:04'),(69,10,'http://65.1.122.8/uploads/uploaded_file-1615449267367.jpg','active','2021-03-17 05:46:04','2021-03-17 05:46:04');
/*!40000 ALTER TABLE `product_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_sub_category`
--

DROP TABLE IF EXISTS `product_sub_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_sub_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `productCategoryId` int(11) NOT NULL,
  `productSubCategoryName` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `arabicName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `productSubCategoryStatus` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `isDelete` int(11) NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `product_sub_category_fk0` (`productCategoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_sub_category`
--

LOCK TABLES `product_sub_category` WRITE;
/*!40000 ALTER TABLE `product_sub_category` DISABLE KEYS */;
INSERT INTO `product_sub_category` VALUES (1,7,'Clothing','ملابس','active',0,'2021-03-12 07:17:16','2021-03-12 07:17:16'),(2,7,'Gadgets','الأدوات','active',0,'2021-03-12 07:17:53','2021-03-12 07:17:53');
/*!40000 ALTER TABLE `product_sub_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rating`
--

DROP TABLE IF EXISTS `rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rating` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `orderId` int(11) NOT NULL,
  `appRating` float(10,1) NOT NULL DEFAULT '0.0',
  `driverRating` float(10,1) NOT NULL DEFAULT '0.0',
  `productRating` float(10,1) NOT NULL DEFAULT '0.0',
  `commemts` varchar(255) NOT NULL DEFAULT '',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `rating_fk0` (`userId`),
  KEY `rating_fk1` (`orderId`),
  CONSTRAINT `rating_fk0` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `rating_fk1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rating`
--

LOCK TABLES `rating` WRITE;
/*!40000 ALTER TABLE `rating` DISABLE KEYS */;
INSERT INTO `rating` VALUES (1,5,9,3.0,3.0,3.0,'Nil','2021-03-08 12:54:20','2021-03-08 12:54:20'),(2,3,10,3.0,3.5,4.5,'wh','2021-03-08 16:30:31','2021-03-08 16:30:31'),(3,4,14,5.0,4.7,4.8,'Vvv','2021-03-09 04:45:53','2021-03-09 04:45:53'),(4,2,17,3.5,4.5,4.0,'bsbz','2021-03-11 09:47:16','2021-03-11 09:47:16'),(5,4,8,4.5,4.0,4.0,'Temp','2021-03-11 10:56:41','2021-03-11 10:56:41'),(6,4,12,3.0,3.0,2.5,'sjzj','2021-03-11 10:56:54','2021-03-11 10:56:54'),(7,5,6,4.0,2.5,3.0,'vbbb','2021-03-11 12:05:07','2021-03-11 12:05:07'),(8,4,19,4.2,2.7,2.2,'Bobs','2021-03-12 04:48:19','2021-03-12 04:48:19'),(9,4,20,2.0,4.1,4.6,'Test ','2021-03-12 04:56:18','2021-03-12 04:56:18'),(10,4,23,3.5,3.0,2.5,'bb','2021-03-16 12:31:39','2021-03-16 12:31:39'),(11,7,30,3.5,3.0,2.5,'ubbb have','2021-03-16 13:10:23','2021-03-16 13:10:23'),(12,7,31,2.5,2.5,3.0,'bbh','2021-03-16 13:51:26','2021-03-16 13:51:26'),(13,7,32,3.5,3.5,3.0,'hh','2021-03-16 13:54:13','2021-03-16 13:54:13'),(14,11,36,1.0,0.5,0.5,'Test','2021-03-17 11:18:59','2021-03-17 11:18:59');
/*!40000 ALTER TABLE `rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `referralDetails`
--

DROP TABLE IF EXISTS `referralDetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `referralDetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `referFrom` int(11) NOT NULL,
  `referTo` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `referralDetails`
--

LOCK TABLES `referralDetails` WRITE;
/*!40000 ALTER TABLE `referralDetails` DISABLE KEYS */;
/*!40000 ALTER TABLE `referralDetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relatedProducts`
--

DROP TABLE IF EXISTS `relatedProducts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `relatedProducts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `productId` int(11) NOT NULL,
  `relatedId` int(11) DEFAULT NULL,
  `relCategory` int(11) NOT NULL,
  `relProCategory` int(11) NOT NULL,
  `relsubCategory` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `relatedProducts_fk0` (`productId`),
  KEY `relatedProducts_fk1` (`relCategory`),
  KEY `relatedProducts_fk2` (`relProCategory`),
  KEY `relatedProducts_fk3` (`relsubCategory`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relatedProducts`
--

LOCK TABLES `relatedProducts` WRITE;
/*!40000 ALTER TABLE `relatedProducts` DISABLE KEYS */;
INSERT INTO `relatedProducts` VALUES (1,4,3,1,1,NULL,'2021-03-06 08:36:51','2021-03-06 08:36:51'),(2,4,2,1,1,NULL,'2021-03-06 08:36:51','2021-03-06 08:36:51'),(3,4,1,1,1,NULL,'2021-03-06 08:36:51','2021-03-06 08:36:51'),(4,4,2,1,1,NULL,'2021-03-07 14:36:07','2021-03-07 14:36:07'),(5,4,3,1,1,NULL,'2021-03-07 14:36:07','2021-03-07 14:36:07'),(6,4,1,1,1,NULL,'2021-03-07 14:36:07','2021-03-07 14:36:07'),(7,4,2,1,1,NULL,'2021-03-12 04:40:40','2021-03-12 04:40:40'),(8,4,1,1,1,NULL,'2021-03-12 04:40:40','2021-03-12 04:40:40'),(9,4,3,1,1,NULL,'2021-03-12 04:40:40','2021-03-12 04:40:40'),(10,4,4,1,1,NULL,'2021-03-12 04:40:40','2021-03-12 04:40:40'),(11,4,5,1,1,NULL,'2021-03-12 04:40:40','2021-03-12 04:40:40'),(12,4,6,1,1,NULL,'2021-03-12 04:40:40','2021-03-12 04:40:40'),(13,4,1,1,1,NULL,'2021-03-12 04:40:53','2021-03-12 04:40:53'),(14,4,2,1,1,NULL,'2021-03-12 04:40:53','2021-03-12 04:40:53'),(15,4,3,1,1,NULL,'2021-03-12 04:40:53','2021-03-12 04:40:53'),(16,4,4,1,1,NULL,'2021-03-12 04:40:53','2021-03-12 04:40:53'),(17,4,5,1,1,NULL,'2021-03-12 04:40:53','2021-03-12 04:40:53'),(18,4,6,1,1,NULL,'2021-03-12 04:40:53','2021-03-12 04:40:53'),(19,4,7,1,1,NULL,'2021-03-12 04:40:53','2021-03-12 04:40:53'),(20,4,8,1,1,NULL,'2021-03-12 04:40:53','2021-03-12 04:40:53'),(21,4,9,1,1,NULL,'2021-03-12 04:40:53','2021-03-12 04:40:53'),(22,4,10,1,1,NULL,'2021-03-12 04:40:53','2021-03-12 04:40:53'),(23,4,11,1,1,NULL,'2021-03-12 04:40:53','2021-03-12 04:40:53'),(24,4,12,1,1,NULL,'2021-03-12 04:40:53','2021-03-12 04:40:53'),(25,14,14,3,7,1,'2021-03-16 06:43:41','2021-03-16 06:43:41'),(26,4,1,1,1,NULL,'2021-03-16 12:09:09','2021-03-16 12:09:09'),(27,4,2,1,1,NULL,'2021-03-16 12:09:09','2021-03-16 12:09:09'),(28,4,3,1,1,NULL,'2021-03-16 12:09:09','2021-03-16 12:09:09'),(29,4,4,1,1,NULL,'2021-03-16 12:09:09','2021-03-16 12:09:09'),(30,4,5,1,1,NULL,'2021-03-16 12:09:09','2021-03-16 12:09:09'),(31,4,6,1,1,NULL,'2021-03-16 12:09:09','2021-03-16 12:09:09'),(32,4,7,1,1,NULL,'2021-03-16 12:09:09','2021-03-16 12:09:09'),(33,4,8,1,1,NULL,'2021-03-16 12:09:09','2021-03-16 12:09:09'),(34,4,9,1,1,NULL,'2021-03-16 12:09:09','2021-03-16 12:09:09'),(35,4,10,1,1,NULL,'2021-03-16 12:09:09','2021-03-16 12:09:09'),(36,4,11,1,1,NULL,'2021-03-16 12:09:09','2021-03-16 12:09:09'),(37,4,12,1,1,NULL,'2021-03-16 12:09:09','2021-03-16 12:09:09'),(38,4,13,1,1,NULL,'2021-03-16 12:09:09','2021-03-16 12:09:09'),(39,4,14,1,1,NULL,'2021-03-16 12:09:09','2021-03-16 12:09:09'),(40,4,15,1,1,NULL,'2021-03-16 12:09:09','2021-03-16 12:09:09'),(41,4,16,1,1,NULL,'2021-03-16 12:09:09','2021-03-16 12:09:09'),(42,4,17,1,1,NULL,'2021-03-16 12:09:09','2021-03-16 12:09:09'),(43,4,18,1,1,NULL,'2021-03-16 12:09:09','2021-03-16 12:09:09'),(44,4,19,1,1,NULL,'2021-03-16 12:09:09','2021-03-16 12:09:09'),(45,4,20,1,1,NULL,'2021-03-16 12:09:09','2021-03-16 12:09:09'),(46,4,21,1,1,NULL,'2021-03-16 12:09:09','2021-03-16 12:09:09'),(47,4,22,1,1,NULL,'2021-03-16 12:09:09','2021-03-16 12:09:09'),(48,4,23,1,1,NULL,'2021-03-16 12:09:09','2021-03-16 12:09:09'),(49,4,24,1,1,NULL,'2021-03-16 12:09:09','2021-03-16 12:09:09'),(50,10,10,3,4,NULL,'2021-03-17 05:46:04','2021-03-17 05:46:04');
/*!40000 ALTER TABLE `relatedProducts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `returnCar`
--

DROP TABLE IF EXISTS `returnCar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `returnCar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `carId` int(11) NOT NULL,
  `driverId` int(11) NOT NULL,
  `carMileage` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `returnCar_fk0` (`carId`),
  KEY `returnCar_fk1` (`driverId`),
  CONSTRAINT `returnCar_fk0` FOREIGN KEY (`carId`) REFERENCES `cars` (`id`),
  CONSTRAINT `returnCar_fk1` FOREIGN KEY (`driverId`) REFERENCES `driver` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `returnCar`
--

LOCK TABLES `returnCar` WRITE;
/*!40000 ALTER TABLE `returnCar` DISABLE KEYS */;
INSERT INTO `returnCar` VALUES (1,3,4,20,'2021-03-06 11:17:33','2021-03-06 11:17:33'),(2,2,3,18,'2021-03-06 11:19:55','2021-03-06 11:19:55'),(3,1,2,50000,'2021-03-08 10:30:53','2021-03-08 10:30:53'),(4,1,1,949,'2021-03-15 09:48:12','2021-03-15 09:48:12');
/*!40000 ALTER TABLE `returnCar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rolePermission`
--

DROP TABLE IF EXISTS `rolePermission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rolePermission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `roleId` int(11) NOT NULL,
  `permissionName` varchar(255) NOT NULL,
  `readOpt` char(50) NOT NULL DEFAULT 'false',
  `writeOpt` char(50) NOT NULL DEFAULT 'false',
  `exportOpt` char(50) NOT NULL DEFAULT 'false',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `rolePermission_fk0` (`roleId`),
  CONSTRAINT `rolePermission_fk0` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rolePermission`
--

LOCK TABLES `rolePermission` WRITE;
/*!40000 ALTER TABLE `rolePermission` DISABLE KEYS */;
INSERT INTO `rolePermission` VALUES (1,1,'Orders','false','true','false','2021-03-07 12:47:39','2021-03-07 13:30:20'),(2,1,'Drivers','false','false','false','2021-03-07 12:47:39','2021-03-07 12:47:39'),(3,1,'Stores','false','false','false','2021-03-07 12:47:39','2021-03-07 12:47:39'),(4,1,'Customer','false','false','false','2021-03-07 12:47:39','2021-03-07 12:47:39'),(5,1,'Support','false','false','false','2021-03-07 12:47:39','2021-03-07 12:47:39'),(6,1,'Offers','false','false','false','2021-03-07 12:47:39','2021-03-07 12:47:39'),(7,1,'Export','false','false','false','2021-03-07 12:47:39','2021-03-07 12:47:39'),(8,1,'Settings','false','false','false','2021-03-07 12:47:39','2021-03-07 12:47:39'),(9,2,'Orders','false','false','false','2021-03-07 07:17:39','2021-03-07 07:17:39'),(10,2,'Drivers','false','false','false','2021-03-07 07:17:39','2021-03-07 07:17:39'),(11,2,'Stores','false','false','false','2021-03-07 07:17:39','2021-03-07 07:17:39'),(12,2,'Customer','false','false','false','2021-03-07 07:17:39','2021-03-07 07:17:39'),(13,2,'Support','false','false','false','2021-03-07 07:17:39','2021-03-07 07:17:39'),(14,2,'Offers','false','false','false','2021-03-07 07:17:39','2021-03-07 07:17:39'),(15,2,'Export','false','false','false','2021-03-07 07:17:39','2021-03-07 07:17:39'),(16,2,'Settings','false','false','false','2021-03-07 07:17:39','2021-03-07 07:17:39'),(17,3,'Orders','false','false','false','2021-03-07 07:17:39','2021-03-07 07:17:39'),(18,3,'Drivers','false','false','false','2021-03-07 07:17:39','2021-03-07 07:17:39'),(19,3,'Stores','false','false','false','2021-03-07 07:17:39','2021-03-07 07:17:39'),(20,3,'Customer','false','false','false','2021-03-07 07:17:39','2021-03-07 07:17:39'),(21,3,'Support','false','false','false','2021-03-07 07:17:39','2021-03-07 07:17:39'),(22,3,'Offers','false','false','false','2021-03-07 07:17:39','2021-03-07 07:17:39'),(23,3,'Export','false','false','false','2021-03-07 07:17:39','2021-03-07 07:17:39'),(24,3,'Settings','false','false','false','2021-03-07 07:17:39','2021-03-07 07:17:39'),(25,4,'Orders','false','false','false','2021-03-07 07:17:39','2021-03-07 07:17:39'),(26,4,'Drivers','false','false','false','2021-03-07 07:17:39','2021-03-07 07:17:39'),(27,4,'Stores','false','false','false','2021-03-07 07:17:39','2021-03-07 07:17:39'),(28,4,'Customer','false','false','false','2021-03-07 07:17:39','2021-03-07 07:17:39'),(29,4,'Support','false','false','false','2021-03-07 07:17:39','2021-03-07 07:17:39'),(30,4,'Offers','false','false','false','2021-03-07 07:17:39','2021-03-07 07:17:39'),(31,4,'Export','false','false','false','2021-03-07 07:17:39','2021-03-07 07:17:39'),(32,4,'Settings','false','false','false','2021-03-07 07:17:39','2021-03-07 07:17:39');
/*!40000 ALTER TABLE `rolePermission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `roleName` varchar(255) NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Level 1','2021-03-07 12:00:51','2021-03-07 12:00:51'),(2,'Level 2','2021-03-07 12:00:51','2021-03-07 12:01:19'),(3,'Level 3','2021-03-07 12:00:51','2021-03-07 12:01:19'),(4,'Super Admin','2021-03-07 12:00:51','2021-03-07 12:01:19');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rules`
--

DROP TABLE IF EXISTS `rules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL DEFAULT '',
  `triggerName` varchar(255) NOT NULL DEFAULT '',
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `status` varchar(50) DEFAULT 'active',
  `isDelete` int(11) NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rules`
--

LOCK TABLES `rules` WRITE;
/*!40000 ALTER TABLE `rules` DISABLE KEYS */;
/*!40000 ALTER TABLE `rules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rulesOptions`
--

DROP TABLE IF EXISTS `rulesOptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rulesOptions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rulesId` int(11) NOT NULL,
  `walletAmount` int(11) NOT NULL DEFAULT '0',
  `points` int(11) DEFAULT '0',
  `type` varchar(191) NOT NULL DEFAULT '',
  `notifyTitle` varchar(255) DEFAULT '',
  `notifyMessage` varchar(255) NOT NULL DEFAULT '',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `rulesOptions_fk0` (`rulesId`),
  CONSTRAINT `rulesOptions_fk0` FOREIGN KEY (`rulesId`) REFERENCES `rules` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rulesOptions`
--

LOCK TABLES `rulesOptions` WRITE;
/*!40000 ALTER TABLE `rulesOptions` DISABLE KEYS */;
/*!40000 ALTER TABLE `rulesOptions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store`
--

DROP TABLE IF EXISTS `store`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `store` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `storeID` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(155) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `mobileNumber` varchar(155) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `storeName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `storeImage` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `storeAddress` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `latitude` decimal(10,5) DEFAULT NULL,
  `longitude` decimal(10,5) DEFAULT NULL,
  `storeRadius` float(10,1) DEFAULT '0.0',
  `dueDay` int(11) DEFAULT '0',
  `managerFname` varchar(155) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `managerLname` varchar(155) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `isStoreDelete` int(11) NOT NULL DEFAULT '0',
  `status` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `isComingSoon` int(5) DEFAULT '0',
  `isSuperMarket` int(5) DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store`
--

LOCK TABLES `store` WRITE;
/*!40000 ALTER TABLE `store` DISABLE KEYS */;
INSERT INTO `store` VALUES (1,'#Sto6682','vijay@a2b.com','9080001020','Saudi border','http://65.1.122.8/uploads/uploaded_file-1615011852224.jpg','Port Salwa',24.74541,50.71330,20.0,15,'Joseph','Vijay',0,'active',0,0,'2021-03-17 10:28:23','2021-03-06 06:24:12'),(2,'#Sto6905','hussainm.alhassan89@gmail.com','8072431669','Atheer','http://65.1.122.8/uploads/uploaded_file-1615011964514.jpg','King Khalid International Airport',24.92247,46.55982,50.0,10,'Hussain','Alhassan',0,'active',0,0,'2021-03-17 05:21:47','2021-03-06 06:26:04'),(3,'#Sto7571','medina@mailinator.com','8939781700','Hotel Medina','http://65.1.122.8/uploads/uploaded_file-1615180387350.jpg','Prince Mohammed Bin Abdulaziz International Airport',24.52506,39.47816,30.0,10,'Medina','Abu Bakr',0,'active',0,0,'2021-03-16 05:18:10','2021-03-08 05:13:07'),(4,'#Sto5732','turaif@mailinator.com','8056225901','Hotel Turaif','http://65.1.122.8/uploads/uploaded_file-1615439671791.jpg','Turaif Domestic Airport مطار طريف المحلي (TUI)',31.70427,38.74846,20.0,10,'Turaif','Khan',0,'active',0,0,'2021-03-17 06:09:45','2021-03-11 05:14:31');
/*!40000 ALTER TABLE `store` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storeProducts`
--

DROP TABLE IF EXISTS `storeProducts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `storeProducts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `storeId` int(11) NOT NULL,
  `categoryIds` int(11) DEFAULT NULL,
  `purchaseDate` date DEFAULT NULL,
  `purchasedUnits` int(10) DEFAULT '0',
  `vendorName` varchar(155) DEFAULT '',
  `productId` int(11) NOT NULL,
  `productPrice` float(10,2) NOT NULL DEFAULT '0.00',
  `storeStock` int(11) NOT NULL DEFAULT '0',
  `storeProductStatus` varchar(45) DEFAULT 'active',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `storeProducts_fk0` (`storeId`),
  KEY `storeProducts_fk1` (`productId`),
  KEY `storeProducts_fk2` (`categoryIds`),
  CONSTRAINT `storeProducts_fk2` FOREIGN KEY (`categoryIds`) REFERENCES `category` (`id`),
  CONSTRAINT `storeProducts_fk3` FOREIGN KEY (`storeId`) REFERENCES `store` (`id`),
  CONSTRAINT `storeProducts_fk4` FOREIGN KEY (`productId`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storeProducts`
--

LOCK TABLES `storeProducts` WRITE;
/*!40000 ALTER TABLE `storeProducts` DISABLE KEYS */;
INSERT INTO `storeProducts` VALUES (1,1,1,NULL,0,'',1,40.00,21,'active','2021-03-06 06:33:27','2021-03-17 06:36:04'),(2,1,1,NULL,0,'',2,50.00,83,'active','2021-03-06 08:34:15','2021-03-17 06:36:04'),(5,1,1,NULL,0,'',3,45.00,84,'active','2021-03-06 11:13:19','2021-03-17 06:36:04'),(8,3,2,NULL,0,'',5,150.00,97,'active','2021-03-08 05:21:42','2021-03-17 09:34:17'),(9,3,2,NULL,0,'',6,180.00,3,'active','2021-03-08 05:55:05','2021-03-17 09:58:25'),(10,1,2,NULL,0,'',6,230.00,23,'active','2021-03-08 08:35:30','2021-03-17 06:36:04'),(29,4,3,NULL,0,'',12,2799.00,0,'active','2021-03-16 06:43:08','2021-03-16 06:43:08'),(30,4,3,NULL,0,'',11,1999.00,11,'active','2021-03-16 06:43:19','2021-03-16 12:19:55'),(31,4,3,NULL,0,'',14,1200.00,0,'active','2021-03-16 06:43:41','2021-03-16 06:43:41'),(32,4,3,NULL,0,'',13,799.00,8,'active','2021-03-16 06:43:51','2021-03-17 11:19:50'),(35,4,3,NULL,0,'',9,50.00,24,'active','2021-03-16 06:44:46','2021-03-17 11:20:23'),(37,4,3,NULL,0,'',7,100.00,0,'active','2021-03-16 11:26:44','2021-03-18 05:48:34'),(38,1,1,NULL,0,'',4,80.00,48,'active','2021-03-16 12:09:09','2021-03-17 06:36:04'),(39,2,1,NULL,0,'',4,80.00,49,'active','2021-03-16 12:09:09','2021-03-16 12:19:55'),(40,4,3,NULL,0,'',8,120.00,0,'active','2021-03-17 04:39:25','2021-03-17 04:39:25'),(41,1,3,NULL,0,'',7,70.00,40,'active','2021-03-17 05:14:37','2021-03-17 11:50:30'),(42,4,3,NULL,0,'',10,100.00,0,'active','2021-03-17 05:46:04','2021-03-17 05:46:04');
/*!40000 ALTER TABLE `storeProducts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storemanager`
--

DROP TABLE IF EXISTS `storemanager`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `storemanager` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `storeId` int(11) DEFAULT NULL,
  `countryCode` int(5) DEFAULT NULL,
  `mobileNumber` varchar(20) NOT NULL,
  `post` varchar(50) DEFAULT '',
  `dob` date DEFAULT NULL,
  `gender` varchar(20) DEFAULT '',
  `fcmToken` varchar(20000) DEFAULT NULL,
  `os` varchar(45) DEFAULT NULL,
  `status` varchar(15) NOT NULL DEFAULT 'active',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mobileNumber` (`mobileNumber`),
  UNIQUE KEY `email` (`email`),
  KEY `storemanager_fk0` (`storeId`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storemanager`
--

LOCK TABLES `storemanager` WRITE;
/*!40000 ALTER TABLE `storemanager` DISABLE KEYS */;
INSERT INTO `storemanager` VALUES (1,'Karthick','B','karthick95babu@gmail.com',1,91,'9629613763','Store Manager','1995-11-20','female','fK6DtkToSYCFXsKJoxCmAC:APA91bF0Bm04-tcwvBa5E4G6QzqlSFzqWmjGkGbJlVXxam0p-I3mz06LDSsX6lIAty0KT_HaBlj6dmFZliJGpZ0ziv1mlWARdsY3h0Esn-M18CwOPsSfAWFIQT5--t-1CQx73rq4np_d','android','active','2021-03-15 11:35:24','2021-03-06 06:24:34'),(2,'Karthick','New',NULL,1,NULL,'9080001021','Store Manager',NULL,'','fK6DtkToSYCFXsKJoxCmAC:APA91bF0Bm04-tcwvBa5E4G6QzqlSFzqWmjGkGbJlVXxam0p-I3mz06LDSsX6lIAty0KT_HaBlj6dmFZliJGpZ0ziv1mlWARdsY3h0Esn-M18CwOPsSfAWFIQT5--t-1CQx73rq4np_d','android','inactive','2021-03-07 11:18:57','2021-03-06 11:32:08'),(3,'Abu','Bakr',NULL,3,NULL,'8939781712','Store Manager',NULL,'','e7gOV3xvTVStYSlH5uNUie:APA91bHXL3ViWxofcC1W_vXbCCa1NxPKTDh5TipgxgihzNcPTwBnVA0ZPqHP86ay1itBV92jX6ojFICwsVrWzClsOnUftO1JgSPLoWzug-dYXDARpPXdD09QH-I-6oB1kf1JchA0YV8W','android','active','2021-03-16 05:00:11','2021-03-08 05:13:48'),(4,'Dammam','Store',NULL,2,NULL,'8072431669','Store Manager',NULL,'','edynahXUQ_KqaLfS-GSoq-:APA91bH4GRaZn2yY30NEXLq0OswAiNOQVXKHs0ojmXx5vS2as47WIYNA3eY1ENXbLQWBgZYWUQyAeUvZCimFvcDaceesgXm2uJoMRiIRQTrkNQ5YnDp9aQd6ktyyflGKqMXdmXYYSi1-','android','active','2021-03-16 12:18:14','2021-03-08 05:22:57'),(5,'Bhuvanesh','Bhuvi',NULL,4,NULL,'8056225901','Store Manager',NULL,'','e7gOV3xvTVStYSlH5uNUie:APA91bHXL3ViWxofcC1W_vXbCCa1NxPKTDh5TipgxgihzNcPTwBnVA0ZPqHP86ay1itBV92jX6ojFICwsVrWzClsOnUftO1JgSPLoWzug-dYXDARpPXdD09QH-I-6oB1kf1JchA0YV8W','android','active','2021-03-16 06:37:29','2021-03-11 05:22:14'),(6,'Ila','Maaran',NULL,1,NULL,'9080001020','Store Manager',NULL,'',NULL,NULL,'active','2021-03-16 05:16:11','2021-03-16 05:16:11'),(7,'Soona','Paana',NULL,2,NULL,'7904273334','Store Manager',NULL,'',NULL,NULL,'active','2021-03-16 05:29:36','2021-03-16 05:29:36'),(8,'Test','One',NULL,1,NULL,'1234567890','Store Manager',NULL,'','dHgbmPs8TXOA0Uce8juwd_:APA91bHDl5_LEwkEt3OUeKQcZXHdCnyx_db2wNdnGKJKj5eALvXRv_LK1Zp0DP5uEVpy9BxqR4kxVMoW2Qx7NCjYziotRLZh5qXezdjFxGfnCPViqNopm33JeJgraw76Lag_5-5-rDgX','android','inactive','2021-03-16 14:20:06','2021-03-16 09:17:31'),(9,'Mohammed','Irfan',NULL,1,NULL,'907856456','Store Manager',NULL,'','cHa-6s_ORJS_EJY0mz6Kkg:APA91bGn1RqUk8nusGL7CZGj07F-NWrzwmRXuosuGvgjS5Is9FfMsdd6KumYb_2ug33nBiKeRKYPI4cT2r2ETcF0tczsq-_SPMG2J74R3GWaCnlCJoLFWhvrGyJSMFQjUhkMOa_039Sp','android','active','2021-03-17 10:42:10','2021-03-16 09:55:39'),(10,'England','One',NULL,2,NULL,'123457890','Store Manager',NULL,'','e7gOV3xvTVStYSlH5uNUie:APA91bHXL3ViWxofcC1W_vXbCCa1NxPKTDh5TipgxgihzNcPTwBnVA0ZPqHP86ay1itBV92jX6ojFICwsVrWzClsOnUftO1JgSPLoWzug-dYXDARpPXdD09QH-I-6oB1kf1JchA0YV8W','android','active','2021-03-16 14:13:04','2021-03-16 14:12:30'),(11,'Afghan','Ashgar',NULL,3,NULL,'123123123','Store Manager',NULL,'','dHgbmPs8TXOA0Uce8juwd_:APA91bHDl5_LEwkEt3OUeKQcZXHdCnyx_db2wNdnGKJKj5eALvXRv_LK1Zp0DP5uEVpy9BxqR4kxVMoW2Qx7NCjYziotRLZh5qXezdjFxGfnCPViqNopm33JeJgraw76Lag_5-5-rDgX','android','active','2021-03-16 14:15:05','2021-03-16 14:14:17'),(12,'Smith','Austria',NULL,4,NULL,'123456789','Store Manager',NULL,'','fn2JpuXJQ_yC7vZgaGI5In:APA91bG7KAKTd5Ncr7f7S-VwKCOJTWjMEwPBrNqL-TJN5fuTnpoGSjnkGCalVfXrzDIpz3hyL_mLKgePovB0r0m46K8POc5fFBfuSZfzwcaGX8q0NoRXOU72XyNaT2yPzJmB8F8VC2xk','android','active','2021-03-17 06:59:04','2021-03-16 14:18:39'),(13,'PaK','One',NULL,1,NULL,'1234567891','Store Manager',NULL,'',NULL,NULL,'active','2021-03-16 14:22:06','2021-03-16 14:22:06');
/*!40000 ALTER TABLE `storemanager` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `support`
--

DROP TABLE IF EXISTS `support`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `support` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `supportID` char(50) NOT NULL,
  `orderId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `status` char(50) NOT NULL,
  `notes` varchar(255) NOT NULL DEFAULT '',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `support_fk0` (`orderId`),
  KEY `support_fk1` (`userId`),
  CONSTRAINT `support_fk0` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`),
  CONSTRAINT `support_fk1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `support`
--

LOCK TABLES `support` WRITE;
/*!40000 ALTER TABLE `support` DISABLE KEYS */;
INSERT INTO `support` VALUES (1,'#ID8350',1,1,'PROGRESS','test','2021-03-08 12:45:16','2021-03-08 12:45:16');
/*!40000 ALTER TABLE `support` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `timeSlot`
--

DROP TABLE IF EXISTS `timeSlot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `timeSlot` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `day` int(11) DEFAULT NULL,
  `fromTime` time DEFAULT NULL,
  `toTime` time DEFAULT NULL,
  `maxOrder` int(11) NOT NULL DEFAULT '0',
  `slotStatus` int(11) NOT NULL DEFAULT '1',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `timeSlot_fk0` (`day`),
  CONSTRAINT `timeSlot_fk0` FOREIGN KEY (`day`) REFERENCES `days` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `timeSlot`
--

LOCK TABLES `timeSlot` WRITE;
/*!40000 ALTER TABLE `timeSlot` DISABLE KEYS */;
/*!40000 ALTER TABLE `timeSlot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unavailableProduct`
--

DROP TABLE IF EXISTS `unavailableProduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `unavailableProduct` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `latitude` float(10,5) NOT NULL,
  `longitude` float(10,5) NOT NULL,
  `address` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `unavailableProduct_fk0` (`userId`),
  CONSTRAINT `unavailableProduct_fk0` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=416 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unavailableProduct`
--

LOCK TABLES `unavailableProduct` WRITE;
/*!40000 ALTER TABLE `unavailableProduct` DISABLE KEYS */;
INSERT INTO `unavailableProduct` VALUES (1,1,13.00670,80.22060,'Jeddah, Sharifhah Dist','2021-03-06 12:37:40','2021-03-06 12:37:40'),(2,1,13.00670,80.22060,'Race Course Interior Road, Chennai - 600032, Chennai - India','2021-03-06 13:07:36','2021-03-06 13:07:36'),(3,1,13.00670,80.22060,'Race Course Interior Road, Chennai - 600032, Chennai - India','2021-03-06 13:16:49','2021-03-06 13:16:49'),(4,1,13.00670,80.22060,'Race Course Interior Road, Chennai - 600032, Chennai - India','2021-03-06 13:18:44','2021-03-06 13:18:44'),(5,1,13.00670,80.22060,'Race Course Interior Road, Chennai - 600032, Chennai - India','2021-03-06 13:22:29','2021-03-06 13:22:29'),(6,1,24.50072,43.81466,'17211, Saudi Arabia','2021-03-06 13:23:27','2021-03-06 13:23:27'),(7,1,24.50072,43.81466,'17211, Saudi Arabia','2021-03-06 13:25:35','2021-03-06 13:25:35'),(8,1,24.50072,43.81466,'17211, Saudi Arabia','2021-03-06 13:31:48','2021-03-06 13:31:48'),(9,1,24.50072,43.81466,'17211, Saudi Arabia','2021-03-06 13:32:43','2021-03-06 13:32:43'),(10,1,13.00670,80.22060,'Race Course Interior Road, Chennai - 600032, Chennai - India','2021-03-07 02:26:47','2021-03-07 02:26:47'),(11,1,24.50072,43.81466,'17211, Saudi Arabia','2021-03-07 02:26:57','2021-03-07 02:26:57'),(12,1,13.00670,80.22060,'Race Course Interior Road, Chennai - 600032, Chennai - India','2021-03-07 02:27:01','2021-03-07 02:27:01'),(13,1,10.50499,77.75826,'Oddanchatram Outer Bypass Road,Dindigul','2021-03-07 05:23:58','2021-03-07 05:23:58'),(14,1,13.04399,80.21764,'34/15,Doctor Ambedkar Road','2021-03-07 05:25:00','2021-03-07 05:25:00'),(15,1,11.01377,76.96773,'34/15,Doctor Ambedkar Road','2021-03-07 05:25:03','2021-03-07 05:25:03'),(16,2,11.01560,76.96701,'7-9,Nehru Street','2021-03-07 05:32:56','2021-03-07 05:32:56'),(17,2,11.01560,76.96701,'7-9,Nehru Street','2021-03-07 05:33:37','2021-03-07 05:33:37'),(18,2,11.01560,76.96701,'7-9,Nehru Street','2021-03-07 05:34:09','2021-03-07 05:34:09'),(19,2,11.01560,76.96701,'7-9,Nehru Street','2021-03-07 05:37:29','2021-03-07 05:37:29'),(20,2,11.01560,76.96701,'7-9,Nehru Street','2021-03-07 05:49:19','2021-03-07 05:49:19'),(21,2,11.01437,76.96557,'Gandhipuram Central Busstand,Sathyamurthy Road','2021-03-07 05:49:29','2021-03-07 05:49:29'),(22,2,11.01437,76.96557,'11/224,Sathyamurthy Road','2021-03-07 05:50:45','2021-03-07 05:50:45'),(23,2,11.01437,76.96557,'11/224,Sathyamurthy Road','2021-03-07 05:52:21','2021-03-07 05:52:21'),(24,2,11.01531,76.96649,'503,Ranganathapuram','2021-03-07 05:53:05','2021-03-07 05:53:05'),(25,2,11.01555,76.96708,'7-9,Nehru Street','2021-03-07 05:53:19','2021-03-07 05:53:19'),(26,2,11.01555,76.96708,'7-9,Nehru Street','2021-03-07 06:01:31','2021-03-07 06:01:31'),(27,2,11.01547,76.96673,'45,Senthil Kumaran Theatre','2021-03-07 06:02:12','2021-03-07 06:02:12'),(28,2,11.01546,76.96688,'Ram Nagar,Near senthil Kumaran theater/Mangala International Hote','2021-03-07 06:02:48','2021-03-07 06:02:48'),(29,2,11.01578,76.96690,'Ram Nagar,Near senthil Kumaran theater/Mangala International Hote','2021-03-07 06:06:57','2021-03-07 06:06:57'),(32,4,13.27584,80.25835,'74,Bakthavatchalam Street','2021-03-07 11:29:00','2021-03-07 11:29:00'),(33,4,13.27584,80.25835,'74,Bakthavatchalam Street','2021-03-07 11:32:15','2021-03-07 11:32:15'),(34,4,13.27584,80.25835,'74,Bakthavatchalam Street','2021-03-07 11:32:17','2021-03-07 11:32:17'),(35,4,13.27584,80.25835,'74,Bakthavatchalam Street','2021-03-07 11:32:20','2021-03-07 11:32:20'),(36,4,13.27584,80.25835,'74,Bakthavatchalam Street','2021-03-07 11:32:24','2021-03-07 11:32:24'),(37,4,13.27584,80.25835,'74,Bakthavatchalam Street','2021-03-07 11:32:25','2021-03-07 11:32:25'),(38,4,13.27584,80.25835,'74,Bakthavatchalam Street','2021-03-07 11:32:32','2021-03-07 11:32:32'),(39,4,13.27584,80.25835,'74,Bakthavatchalam Street','2021-03-07 11:35:39','2021-03-07 11:35:39'),(40,4,13.27584,80.25835,'74,Bakthavatchalam Street','2021-03-07 11:35:41','2021-03-07 11:35:41'),(41,4,13.27584,80.25835,'74,Bakthavatchalam Street','2021-03-07 11:35:44','2021-03-07 11:35:44'),(42,4,13.27584,80.25835,'74,Bakthavatchalam Street','2021-03-07 11:36:22','2021-03-07 11:36:22'),(43,4,13.27584,80.25835,'74,Bakthavatchalam Street','2021-03-07 11:36:53','2021-03-07 11:36:53'),(44,4,13.27584,80.25835,'74,Bakthavatchalam Street','2021-03-07 11:38:05','2021-03-07 11:38:05'),(45,4,13.27584,80.25835,'74,Bakthavatchalam Street','2021-03-07 11:38:11','2021-03-07 11:38:11'),(46,4,13.27584,80.25835,'74,Bakthavatchalam Street','2021-03-07 11:38:21','2021-03-07 11:38:21'),(47,4,13.27584,80.25835,'74,Bakthavatchalam Street','2021-03-07 11:38:25','2021-03-07 11:38:25'),(48,4,13.27584,80.25835,'74,Bakthavatchalam Street','2021-03-07 11:39:52','2021-03-07 11:39:52'),(49,4,13.27584,80.25835,'74,Bakthavatchalam Street','2021-03-07 11:39:55','2021-03-07 11:39:55'),(50,4,13.27584,80.25835,'74,Bakthavatchalam Street','2021-03-07 11:39:59','2021-03-07 11:39:59'),(51,3,13.18508,80.30777,'22/A,Balaji Nagar Road','2021-03-07 11:45:26','2021-03-07 11:45:26'),(52,4,13.27584,80.25835,'74,Bakthavatchalam Street','2021-03-07 11:46:39','2021-03-07 11:46:39'),(53,3,13.18453,80.30726,'28,Balaji Nagar','2021-03-07 11:49:09','2021-03-07 11:49:09'),(54,3,13.18453,80.30726,'28,Balaji Nagar','2021-03-07 11:49:13','2021-03-07 11:49:13'),(55,4,13.27584,80.25835,'74,Bakthavatchalam Street','2021-03-07 11:49:15','2021-03-07 11:49:15'),(56,3,13.18453,80.30726,'28,Balaji Nagar','2021-03-07 11:49:16','2021-03-07 11:49:16'),(57,3,13.18452,80.30726,'28,Balaji Nagar','2021-03-07 11:49:22','2021-03-07 11:49:22'),(58,3,13.18452,80.30726,'28,Balaji Nagar','2021-03-07 11:49:25','2021-03-07 11:49:25'),(59,4,13.27584,80.25835,'74,Bakthavatchalam Street','2021-03-07 11:50:51','2021-03-07 11:50:51'),(60,3,13.18453,80.30726,'28,Balaji Nagar','2021-03-07 11:51:10','2021-03-07 11:51:10'),(61,3,13.18453,80.30726,'28,Balaji Nagar','2021-03-07 11:51:15','2021-03-07 11:51:15'),(62,4,13.27584,80.25835,'74,Bakthavatchalam Street','2021-03-07 11:51:20','2021-03-07 11:51:20'),(63,4,13.27584,80.25835,'74,Bakthavatchalam Street','2021-03-07 11:52:10','2021-03-07 11:52:10'),(64,4,13.27584,80.25835,'74,Bakthavatchalam Street','2021-03-07 11:52:14','2021-03-07 11:52:14'),(65,3,13.18453,80.30726,'28,Balaji Nagar','2021-03-07 11:52:28','2021-03-07 11:52:28'),(66,3,13.18452,80.30725,'28,Balaji Nagar','2021-03-07 11:52:30','2021-03-07 11:52:30'),(67,3,13.18452,80.30725,'28,Balaji Nagar','2021-03-07 11:52:32','2021-03-07 11:52:32'),(68,3,13.18452,80.30725,'28,Balaji Nagar','2021-03-07 11:52:34','2021-03-07 11:52:34'),(69,3,13.18452,80.30725,'28,Balaji Nagar','2021-03-07 11:54:04','2021-03-07 11:54:04'),(70,5,13.27716,80.25879,'74,Bakthavatchalam Street','2021-03-07 11:54:45','2021-03-07 11:54:45'),(71,5,13.27610,80.25914,'Dr.BHUVANESHWARI MBBS,65/A','2021-03-07 11:57:06','2021-03-07 11:57:06'),(72,5,13.27610,80.25914,'Dr.BHUVANESHWARI MBBS,65/A','2021-03-07 11:57:09','2021-03-07 11:57:09'),(73,5,13.27751,80.25879,'Bakthavatchalam Street,Minjur','2021-03-07 11:57:37','2021-03-07 11:57:37'),(74,5,13.27751,80.25879,'Bakthavatchalam Street,Minjur','2021-03-07 12:10:56','2021-03-07 12:10:56'),(75,5,13.27602,80.25705,'Surya Nagar,Minjur','2021-03-07 12:11:01','2021-03-07 12:11:01'),(76,5,13.27602,80.25705,'Surya Nagar,Minjur','2021-03-07 12:23:26','2021-03-07 12:23:26'),(77,5,13.27602,80.25705,'Surya Nagar,Minjur','2021-03-07 12:23:30','2021-03-07 12:23:30'),(78,5,13.27602,80.25705,'Surya Nagar,Minjur','2021-03-07 12:28:51','2021-03-07 12:28:51'),(79,4,13.27584,80.25835,'74,Bakthavatchalam Street','2021-03-07 12:38:40','2021-03-07 12:38:40'),(80,4,13.27584,80.25835,'74,Bakthavatchalam Street','2021-03-07 12:39:47','2021-03-07 12:39:47'),(81,4,13.27584,80.25835,'74,Bakthavatchalam Street','2021-03-07 12:39:51','2021-03-07 12:39:51'),(82,4,13.27584,80.25835,'74,Bakthavatchalam Street','2021-03-07 12:39:59','2021-03-07 12:39:59'),(83,5,13.27602,80.25705,'Surya Nagar,Minjur','2021-03-07 14:16:56','2021-03-07 14:16:56'),(84,5,13.27328,80.11596,'Manjankaranai Main Road,Koorambakkam','2021-03-07 14:17:00','2021-03-07 14:17:00'),(85,5,13.27328,80.11596,'Manjankaranai Main Road,Koorambakkam','2021-03-07 14:17:03','2021-03-07 14:17:03'),(86,5,13.27328,80.11596,'Manjankaranai Main Road,Koorambakkam','2021-03-07 14:17:06','2021-03-07 14:17:06'),(87,5,13.27328,80.11596,'Manjankaranai Main Road,Koorambakkam','2021-03-07 14:17:10','2021-03-07 14:17:10'),(88,5,13.27328,80.11596,'Manjankaranai Main Road,Koorambakkam','2021-03-07 14:30:39','2021-03-07 14:30:39'),(89,5,13.27328,80.11596,'Manjankaranai Main Road,Koorambakkam','2021-03-07 14:31:20','2021-03-07 14:31:20'),(90,5,13.27328,80.11596,'Manjankaranai Main Road,Koorambakkam','2021-03-07 14:31:22','2021-03-07 14:31:22'),(91,5,13.27328,80.11596,'Manjankaranai Main Road,Koorambakkam','2021-03-07 14:31:25','2021-03-07 14:31:25'),(92,5,13.27328,80.11596,'Manjankaranai Main Road,Koorambakkam','2021-03-07 14:31:28','2021-03-07 14:31:28'),(93,5,13.27328,80.11596,'Manjankaranai Main Road,Koorambakkam','2021-03-07 14:32:06','2021-03-07 14:32:06'),(94,NULL,24.51919,39.66608,'Jeddah, Sharifhah Dist','2021-03-07 15:41:39','2021-03-07 15:41:39'),(95,NULL,24.51919,39.66608,'Jeddah, Sharifhah Dist','2021-03-07 15:41:43','2021-03-07 15:41:43'),(96,NULL,24.51919,39.66608,'Jeddah, Sharifhah Dist','2021-03-07 15:41:45','2021-03-07 15:41:45'),(97,NULL,24.51919,39.66608,'Jeddah, Sharifhah Dist','2021-03-07 15:41:50','2021-03-07 15:41:50'),(98,NULL,24.51919,39.66608,'Jeddah, Sharifhah Dist','2021-03-07 15:41:51','2021-03-07 15:41:51'),(99,NULL,24.51919,39.66608,'Jeddah, Sharifhah Dist','2021-03-07 15:41:55','2021-03-07 15:41:55'),(100,NULL,24.51919,39.66608,'Jeddah, Sharifhah Dist','2021-03-07 15:42:01','2021-03-07 15:42:01'),(101,NULL,24.51919,39.66608,'Jeddah, Sharifhah Dist','2021-03-07 15:42:03','2021-03-07 15:42:03'),(102,NULL,24.51919,39.66608,'Jeddah, Sharifhah Dist','2021-03-07 15:42:06','2021-03-07 15:42:06'),(103,NULL,24.51919,39.66608,'Jeddah, Sharifhah Dist','2021-03-07 15:42:09','2021-03-07 15:42:09'),(104,NULL,24.51919,39.66608,'Jeddah, Sharifhah Dist','2021-03-07 15:42:26','2021-03-07 15:42:26'),(105,1,24.51919,39.66608,'Jeddah, Sharifhah Dist','2021-03-07 15:50:15','2021-03-07 15:50:15'),(106,1,24.72248,46.68387,'Sousa Street, 3673, Riyadh - 12252, Saudi Arabia','2021-03-07 15:51:32','2021-03-07 15:51:32'),(107,1,24.72248,46.68387,'Sousa Street, 3673, Riyadh - 12252, Saudi Arabia','2021-03-07 15:53:55','2021-03-07 15:53:55'),(108,1,24.72248,46.68387,'Sousa Street, 3673, Riyadh - 12252, Saudi Arabia','2021-03-07 15:53:58','2021-03-07 15:53:58'),(109,NULL,24.51919,39.66608,'Jeddah, Sharifhah Dist','2021-03-07 15:55:18','2021-03-07 15:55:18'),(110,NULL,24.51919,39.66608,'Jeddah, Sharifhah Dist','2021-03-07 15:56:18','2021-03-07 15:56:18'),(111,NULL,24.51919,39.66608,'Jeddah, Sharifhah Dist','2021-03-07 15:56:21','2021-03-07 15:56:21'),(112,NULL,24.51919,39.66608,'Jeddah, Sharifhah Dist','2021-03-07 15:57:49','2021-03-07 15:57:49'),(113,NULL,24.51919,39.66608,'Jeddah, Sharifhah Dist','2021-03-07 15:57:50','2021-03-07 15:57:50'),(114,NULL,24.51919,39.66608,'Jeddah, Sharifhah Dist','2021-03-07 15:57:52','2021-03-07 15:57:52'),(115,NULL,24.51919,39.66608,'Jeddah, Sharifhah Dist','2021-03-07 15:57:59','2021-03-07 15:57:59'),(116,5,13.27328,80.11596,'Manjankaranai Main Road,Koorambakkam','2021-03-08 04:29:42','2021-03-08 04:29:42'),(117,5,13.18452,80.30725,'28,Balaji Nagar','2021-03-08 04:29:47','2021-03-08 04:29:47'),(118,5,13.18452,80.30725,'28,Balaji Nagar','2021-03-08 04:29:50','2021-03-08 04:29:50'),(119,5,13.18452,80.30725,'28,Balaji Nagar','2021-03-08 04:29:52','2021-03-08 04:29:52'),(120,5,13.18452,80.30725,'28,Balaji Nagar','2021-03-08 04:29:55','2021-03-08 04:29:55'),(121,4,13.18446,80.30723,'28,Balaji Nagar','2021-03-08 04:31:09','2021-03-08 04:31:09'),(122,4,13.18453,80.30726,'28,Balaji Nagar','2021-03-08 04:32:27','2021-03-08 04:32:27'),(123,NULL,13.18440,80.30732,'Jeddah, Sharifhah Dist','2021-03-08 04:34:10','2021-03-08 04:34:10'),(124,NULL,13.18440,80.30732,'Jeddah, Sharifhah Dist','2021-03-08 04:34:11','2021-03-08 04:34:11'),(125,NULL,13.18440,80.30732,'Balaji Nagar Main Road, 22/29, Chennai - 600057, Thiruvallur - India','2021-03-08 04:34:16','2021-03-08 04:34:16'),(126,NULL,13.18440,80.30732,'Balaji Nagar Main Road, 22/29, Chennai - 600057, Thiruvallur - India','2021-03-08 04:34:17','2021-03-08 04:34:17'),(127,NULL,13.18440,80.30732,'Balaji Nagar Main Road, 22/29, Chennai - 600057, Thiruvallur - India','2021-03-08 04:34:21','2021-03-08 04:34:21'),(128,NULL,13.18440,80.30732,'Balaji Nagar Main Road, 22/29, Chennai - 600057, Thiruvallur - India','2021-03-08 04:34:26','2021-03-08 04:34:26'),(129,NULL,13.18440,80.30732,'Balaji Nagar Main Road, 22/29, Chennai - 600057, Thiruvallur - India','2021-03-08 04:34:30','2021-03-08 04:34:30'),(130,NULL,13.18440,80.30732,'Balaji Nagar Main Road, 22/29, Chennai - 600057, Thiruvallur - India','2021-03-08 04:34:37','2021-03-08 04:34:37'),(131,5,13.18452,80.30725,'28,Balaji Nagar','2021-03-08 04:34:41','2021-03-08 04:34:41'),(132,5,13.18452,80.30725,'28,Balaji Nagar','2021-03-08 04:35:04','2021-03-08 04:35:04'),(133,5,13.18451,80.30725,'28,Balaji Nagar','2021-03-08 04:36:11','2021-03-08 04:36:11'),(134,5,13.18451,80.30725,'28,Balaji Nagar','2021-03-08 04:36:14','2021-03-08 04:36:14'),(135,5,13.18451,80.30725,'28,Balaji Nagar','2021-03-08 04:36:16','2021-03-08 04:36:16'),(136,5,13.18451,80.30725,'28,Balaji Nagar','2021-03-08 04:36:18','2021-03-08 04:36:18'),(137,4,13.18451,80.30726,'28,Balaji Nagar','2021-03-08 04:36:26','2021-03-08 04:36:26'),(138,4,13.18447,80.30724,'28,Balaji Nagar','2021-03-08 04:38:01','2021-03-08 04:38:01'),(139,NULL,13.18440,80.30732,'Balaji Nagar Main Road, 22/29, Chennai - 600057, Thiruvallur - India','2021-03-08 04:38:06','2021-03-08 04:38:06'),(140,5,13.18451,80.30725,'28,Balaji Nagar','2021-03-08 04:40:14','2021-03-08 04:40:14'),(141,5,13.18450,80.30725,'28,Balaji Nagar','2021-03-08 04:40:19','2021-03-08 04:40:19'),(142,5,13.18450,80.30724,'28,Balaji Nagar','2021-03-08 04:40:40','2021-03-08 04:40:40'),(143,2,13.03554,80.24546,'Chennai,Little Mount','2021-03-08 04:49:59','2021-03-08 04:49:59'),(144,2,13.03554,80.24546,'626,Anna Salai','2021-03-08 04:50:03','2021-03-08 04:50:03'),(145,2,13.03554,80.24546,'626,Anna Salai','2021-03-08 04:50:47','2021-03-08 04:50:47'),(146,2,13.03554,80.24546,'626,Anna Salai','2021-03-08 05:00:46','2021-03-08 05:00:46'),(147,2,13.03555,80.24546,'626,Anna Salai','2021-03-08 05:01:29','2021-03-08 05:01:29'),(148,2,13.03555,80.24546,'626,Anna Salai','2021-03-08 05:01:35','2021-03-08 05:01:35'),(149,2,13.03555,80.24546,'626,Anna Salai','2021-03-08 05:01:54','2021-03-08 05:01:54'),(150,2,13.03555,80.24546,'626,Anna Salai','2021-03-08 05:04:10','2021-03-08 05:04:10'),(151,2,13.03555,80.24546,'626,Anna Salai','2021-03-08 05:04:12','2021-03-08 05:04:12'),(152,2,13.03555,80.24546,'626,Anna Salai','2021-03-08 05:04:13','2021-03-08 05:04:13'),(153,2,13.03555,80.24546,'626,Anna Salai','2021-03-08 05:04:14','2021-03-08 05:04:14'),(154,2,13.03555,80.24546,'626,Anna Salai','2021-03-08 05:04:14','2021-03-08 05:04:14'),(155,2,13.03555,80.24546,'626,Anna Salai','2021-03-08 05:04:15','2021-03-08 05:04:15'),(156,2,13.03555,80.24546,'626,Anna Salai','2021-03-08 05:04:15','2021-03-08 05:04:15'),(157,2,13.03555,80.24546,'626,Anna Salai','2021-03-08 05:04:20','2021-03-08 05:04:20'),(158,2,13.03555,80.24546,'626,Anna Salai','2021-03-08 05:04:26','2021-03-08 05:04:26'),(159,2,13.03554,80.24546,'501,Anna Salai','2021-03-08 05:05:20','2021-03-08 05:05:20'),(160,2,13.03554,80.24546,'501,Anna Salai','2021-03-08 05:05:28','2021-03-08 05:05:28'),(161,2,13.03554,80.24546,'501,Anna Salai','2021-03-08 05:05:41','2021-03-08 05:05:41'),(162,4,13.18448,80.30725,'28,Balaji Nagar','2021-03-08 05:08:30','2021-03-08 05:08:30'),(163,4,13.18447,80.30726,'28,Balaji Nagar','2021-03-08 05:09:00','2021-03-08 05:09:00'),(164,4,13.18447,80.30726,'28,Balaji Nagar','2021-03-08 05:09:06','2021-03-08 05:09:06'),(165,4,13.18447,80.30726,'28,Balaji Nagar','2021-03-08 05:18:11','2021-03-08 05:18:11'),(166,4,13.18447,80.30726,'28,Balaji Nagar','2021-03-08 05:18:14','2021-03-08 05:18:14'),(167,4,13.18447,80.30726,'28,Balaji Nagar','2021-03-08 05:18:18','2021-03-08 05:18:18'),(168,4,13.18447,80.30726,'28,Balaji Nagar','2021-03-08 05:18:20','2021-03-08 05:18:20'),(169,4,13.18450,80.30725,'28,Balaji Nagar','2021-03-08 05:19:15','2021-03-08 05:19:15'),(170,4,13.18452,80.30725,'28,Balaji Nagar','2021-03-08 05:21:06','2021-03-08 05:21:06'),(171,2,13.03554,80.24546,'501,Anna Salai','2021-03-08 05:27:08','2021-03-08 05:27:08'),(172,2,13.03555,80.24546,'501,Anna Salai','2021-03-08 05:27:25','2021-03-08 05:27:25'),(173,2,13.03555,80.24546,'501,Anna Salai','2021-03-08 05:27:30','2021-03-08 05:27:30'),(174,2,13.03555,80.24546,'501,Anna Salai','2021-03-08 05:27:35','2021-03-08 05:27:35'),(175,2,13.03555,80.24546,'501,Anna Salai','2021-03-08 05:27:38','2021-03-08 05:27:38'),(176,2,13.03555,80.24546,'501,Anna Salai','2021-03-08 05:27:42','2021-03-08 05:27:42'),(177,2,13.03555,80.24546,'501,Anna Salai','2021-03-08 05:27:42','2021-03-08 05:27:42'),(178,5,13.18452,80.30725,'28,Balaji Nagar','2021-03-08 05:27:44','2021-03-08 05:27:44'),(179,5,13.18452,80.30725,'28,Balaji Nagar','2021-03-08 05:27:46','2021-03-08 05:27:46'),(180,2,13.03555,80.24546,'501,Anna Salai','2021-03-08 05:28:24','2021-03-08 05:28:24'),(181,2,13.03555,80.24546,'501,Anna Salai','2021-03-08 05:28:32','2021-03-08 05:28:32'),(182,2,13.03555,80.24546,'501,Anna Salai','2021-03-08 05:28:58','2021-03-08 05:28:58'),(183,2,13.03555,80.24546,'501,Anna Salai','2021-03-08 05:42:37','2021-03-08 05:42:37'),(184,2,13.03555,80.24546,'501,Anna Salai','2021-03-08 05:45:22','2021-03-08 05:45:22'),(185,2,13.03554,80.24546,'501,Anna Salai','2021-03-08 05:45:35','2021-03-08 05:45:35'),(186,2,13.03554,80.24546,'501,Anna Salai','2021-03-08 05:45:39','2021-03-08 05:45:39'),(187,2,13.03554,80.24546,'501,Anna Salai','2021-03-08 05:45:45','2021-03-08 05:45:45'),(188,2,13.03554,80.24546,'501,Anna Salai','2021-03-08 05:45:49','2021-03-08 05:45:49'),(189,2,13.03554,80.24546,'501,Anna Salai','2021-03-08 05:45:52','2021-03-08 05:45:52'),(190,2,13.03554,80.24546,'501,Anna Salai','2021-03-08 05:45:54','2021-03-08 05:45:54'),(191,2,13.03554,80.24546,'501,Anna Salai','2021-03-08 05:45:56','2021-03-08 05:45:56'),(192,2,13.03554,80.24546,'501,Anna Salai','2021-03-08 05:46:05','2021-03-08 05:46:05'),(193,2,13.03554,80.24546,'501,Anna Salai','2021-03-08 05:46:05','2021-03-08 05:46:05'),(194,6,13.18453,80.30725,'28,Balaji Nagar','2021-03-08 05:59:35','2021-03-08 05:59:35'),(195,2,13.03554,80.24546,'501,Anna Salai','2021-03-08 05:59:53','2021-03-08 05:59:53'),(196,2,13.03554,80.24546,'501,Anna Salai','2021-03-08 06:00:08','2021-03-08 06:00:08'),(197,6,13.18451,80.30725,'28,Balaji Nagar','2021-03-08 06:00:13','2021-03-08 06:00:13'),(198,2,13.03554,80.24546,'501,Anna Salai','2021-03-08 06:02:06','2021-03-08 06:02:06'),(199,2,13.03554,80.24546,'501,Anna Salai','2021-03-08 06:06:48','2021-03-08 06:06:48'),(200,3,13.18447,80.30724,'28,Balaji Nagar','2021-03-08 06:19:08','2021-03-08 06:19:08'),(201,5,13.18452,80.30724,'28,Balaji Nagar','2021-03-08 06:30:06','2021-03-08 06:30:06'),(202,5,13.18452,80.30724,'28,Balaji Nagar','2021-03-08 06:30:36','2021-03-08 06:30:36'),(203,4,13.18431,80.30735,'1st Street, 12, Chennai - 600057, Thiruvallur - India','2021-03-08 06:55:14','2021-03-08 06:55:14'),(204,5,13.18452,80.30725,'28,Balaji Nagar','2021-03-08 07:59:53','2021-03-08 07:59:53'),(205,5,13.18452,80.30726,'28,Balaji Nagar','2021-03-08 08:00:41','2021-03-08 08:00:41'),(206,NULL,13.18452,80.30726,'28,Balaji Nagar','2021-03-08 08:03:16','2021-03-08 08:03:16'),(207,5,13.18452,80.30726,'28,Balaji Nagar','2021-03-08 08:04:54','2021-03-08 08:04:54'),(208,5,13.18452,80.30726,'28,Balaji Nagar','2021-03-08 08:05:06','2021-03-08 08:05:06'),(209,5,13.18453,80.30726,'28,Balaji Nagar','2021-03-08 11:30:03','2021-03-08 11:30:03'),(210,5,13.18452,80.30725,'28,Balaji Nagar','2021-03-08 11:30:35','2021-03-08 11:30:35'),(211,5,13.18452,80.30725,'28,Balaji Nagar','2021-03-08 11:30:35','2021-03-08 11:30:35'),(212,5,13.18444,80.30722,'28,Balaji Nagar','2021-03-08 11:31:32','2021-03-08 11:31:32'),(213,5,13.18444,80.30722,'28,Balaji Nagar','2021-03-08 11:31:32','2021-03-08 11:31:32'),(214,5,13.18445,80.30722,'28,Balaji Nagar','2021-03-08 11:31:46','2021-03-08 11:31:46'),(215,5,13.18445,80.30722,'28,Balaji Nagar','2021-03-08 11:31:47','2021-03-08 11:31:47'),(216,5,13.18445,80.30722,'28,Balaji Nagar','2021-03-08 11:31:48','2021-03-08 11:31:48'),(217,5,13.18445,80.30722,'28,Balaji Nagar','2021-03-08 11:31:48','2021-03-08 11:31:48'),(218,5,13.18446,80.30723,'28,Balaji Nagar','2021-03-08 11:33:01','2021-03-08 11:33:01'),(219,5,13.18446,80.30723,'28,Balaji Nagar','2021-03-08 11:33:02','2021-03-08 11:33:02'),(220,5,13.18446,80.30723,'28,Balaji Nagar','2021-03-08 11:35:18','2021-03-08 11:35:18'),(221,5,13.18446,80.30723,'28,Balaji Nagar','2021-03-08 11:35:19','2021-03-08 11:35:19'),(222,5,13.18446,80.30723,'28,Balaji Nagar','2021-03-08 11:35:47','2021-03-08 11:35:47'),(223,5,13.18446,80.30723,'28,Balaji Nagar','2021-03-08 11:35:47','2021-03-08 11:35:47'),(224,5,13.18446,80.30723,'28,Balaji Nagar','2021-03-08 12:52:48','2021-03-08 12:52:48'),(225,3,13.18452,80.30725,'28,Balaji Nagar','2021-03-08 15:48:46','2021-03-08 15:48:46'),(226,3,13.18452,80.30725,'28,Balaji Nagar','2021-03-08 15:48:57','2021-03-08 15:48:57'),(227,3,13.18452,80.30725,'28,Balaji Nagar','2021-03-08 15:50:29','2021-03-08 15:50:29'),(228,3,13.18452,80.30725,'28,Balaji Nagar','2021-03-08 15:50:29','2021-03-08 15:50:29'),(229,3,13.18452,80.30725,'28,Balaji Nagar','2021-03-08 15:51:10','2021-03-08 15:51:10'),(230,3,13.18452,80.30725,'28,Balaji Nagar','2021-03-08 15:51:10','2021-03-08 15:51:10'),(231,4,13.18452,80.30725,'28,Balaji Nagar','2021-03-08 19:49:36','2021-03-08 19:49:36'),(232,4,13.18452,80.30725,'28,Balaji Nagar','2021-03-08 19:49:40','2021-03-08 19:49:40'),(233,4,13.18448,80.30723,'28,Balaji Nagar','2021-03-08 19:49:46','2021-03-08 19:49:46'),(234,4,13.18448,80.30723,'28,Balaji Nagar','2021-03-08 19:49:57','2021-03-08 19:49:57'),(235,4,13.18452,80.30725,'28,Balaji Nagar','2021-03-08 19:50:13','2021-03-08 19:50:13'),(236,4,13.18452,80.30725,'28,Balaji Nagar','2021-03-08 19:50:53','2021-03-08 19:50:53'),(237,4,13.18452,80.30725,'28,Balaji Nagar','2021-03-08 19:51:33','2021-03-08 19:51:33'),(238,4,13.18453,80.30726,'28,Balaji Nagar','2021-03-08 19:51:53','2021-03-08 19:51:53'),(239,4,13.18453,80.30726,'28,Balaji Nagar','2021-03-09 05:29:01','2021-03-09 05:29:01'),(240,4,13.18447,80.30726,'28,Balaji Nagar','2021-03-09 08:02:34','2021-03-09 08:02:34'),(241,4,13.18449,80.30728,'28,Balaji Nagar','2021-03-09 08:02:39','2021-03-09 08:02:39'),(242,4,13.18449,80.30728,'28,Balaji Nagar','2021-03-09 08:02:45','2021-03-09 08:02:45'),(243,4,13.18446,80.30727,'28,Balaji Nagar','2021-03-09 10:32:26','2021-03-09 10:32:26'),(244,4,13.18446,80.30727,'28,Balaji Nagar','2021-03-09 10:32:34','2021-03-09 10:32:34'),(246,1,13.00670,80.22060,'Race Course Interior Road, Chennai - 600032, Chennai - India','2021-03-10 14:35:40','2021-03-10 14:35:40'),(247,NULL,13.00670,80.22060,'Race Course Interior Road, Chennai - 600032, Chennai - India','2021-03-10 14:36:11','2021-03-10 14:36:11'),(248,NULL,13.00670,80.22060,'Race Course Interior Road, Chennai - 600032, Chennai - India','2021-03-10 14:36:17','2021-03-10 14:36:17'),(249,NULL,13.00670,80.22060,'Race Course Interior Road, Chennai - 600032, Chennai - India','2021-03-10 14:36:19','2021-03-10 14:36:19'),(250,NULL,13.00670,80.22060,'Race Course Interior Road, Chennai - 600032, Chennai - India','2021-03-10 14:36:21','2021-03-10 14:36:21'),(251,NULL,13.00670,80.22060,'Race Course Interior Road, Chennai - 600032, Chennai - India','2021-03-10 14:36:44','2021-03-10 14:36:44'),(252,NULL,13.00670,80.22060,'Jeddah, Sharifhah Dist','2021-03-10 15:07:40','2021-03-10 15:07:40'),(253,NULL,13.00670,80.22060,'Race Course Interior Road, Chennai - 600032, Chennai - India','2021-03-10 15:07:48','2021-03-10 15:07:48'),(254,NULL,13.00670,80.22060,'Race Course Interior Road, Chennai - 600032, Chennai - India','2021-03-10 15:07:54','2021-03-10 15:07:54'),(255,NULL,13.00670,80.22060,'Race Course Interior Road, Chennai - 600032, Chennai - India','2021-03-10 15:07:58','2021-03-10 15:07:58'),(256,NULL,13.00670,80.22060,'Race Course Interior Road, Chennai - 600032, Chennai - India','2021-03-10 15:08:08','2021-03-10 15:08:08'),(257,NULL,13.00670,80.22060,'Race Course Interior Road, Chennai - 600032, Chennai - India','2021-03-10 15:09:45','2021-03-10 15:09:45'),(258,NULL,13.00670,80.22060,'Race Course Interior Road, Chennai - 600032, Chennai - India','2021-03-10 15:09:52','2021-03-10 15:09:52'),(259,NULL,13.00670,80.22060,'Race Course Interior Road, Chennai - 600032, Chennai - India','2021-03-10 15:09:55','2021-03-10 15:09:55'),(260,NULL,13.00670,80.22060,'Race Course Interior Road, Chennai - 600032, Chennai - India','2021-03-10 15:10:04','2021-03-10 15:10:04'),(261,NULL,13.00670,80.22060,'Race Course Interior Road, Chennai - 600032, Chennai - India','2021-03-10 15:10:18','2021-03-10 15:10:18'),(262,NULL,13.00670,80.22060,'Race Course Interior Road, Chennai - 600032, Chennai - India','2021-03-10 15:10:22','2021-03-10 15:10:22'),(263,NULL,13.00670,80.22060,'Race Course Interior Road, Chennai - 600032, Chennai - India','2021-03-10 15:14:23','2021-03-10 15:14:23'),(264,NULL,13.00670,80.22060,'Race Course Interior Road, Chennai - 600032, Chennai - India','2021-03-10 15:14:29','2021-03-10 15:14:29'),(265,NULL,13.00670,80.22060,'Race Course Interior Road, Chennai - 600032, Chennai - India','2021-03-10 15:14:33','2021-03-10 15:14:33'),(266,NULL,13.00670,80.22060,'Race Course Interior Road, Chennai - 600032, Chennai - India','2021-03-10 15:14:34','2021-03-10 15:14:34'),(267,NULL,13.00670,80.22060,'Race Course Interior Road, Chennai - 600032, Chennai - India','2021-03-10 15:14:37','2021-03-10 15:14:37'),(268,NULL,13.00670,80.22060,'Race Course Interior Road, Chennai - 600032, Chennai - India','2021-03-10 15:14:38','2021-03-10 15:14:38'),(269,NULL,13.00670,80.22060,'Race Course Interior Road, Chennai - 600032, Chennai - India','2021-03-10 15:14:41','2021-03-10 15:14:41'),(270,8,17.53705,44.25652,'8041,Najran','2021-03-11 00:54:09','2021-03-11 00:54:09'),(271,2,13.03400,80.24485,'320,Anna Salai','2021-03-11 04:06:47','2021-03-11 04:06:47'),(272,4,13.18449,80.30728,'28,Balaji Nagar','2021-03-11 11:07:40','2021-03-11 11:07:40'),(273,4,13.18449,80.30728,'28,Balaji Nagar','2021-03-11 11:07:43','2021-03-11 11:07:43'),(274,4,13.18449,80.30728,'28,Balaji Nagar','2021-03-11 11:07:59','2021-03-11 11:07:59'),(275,4,13.18449,80.30728,'28,Balaji Nagar','2021-03-11 11:08:39','2021-03-11 11:08:39'),(276,4,13.18449,80.30728,'28,Balaji Nagar','2021-03-11 11:08:59','2021-03-11 11:08:59'),(277,5,13.18444,80.30725,'28,Balaji Nagar','2021-03-11 12:04:24','2021-03-11 12:04:24'),(278,5,13.18444,80.30725,'28,Balaji Nagar','2021-03-11 12:04:35','2021-03-11 12:04:35'),(279,5,13.18444,80.30725,'28,Balaji Nagar','2021-03-11 12:05:00','2021-03-11 12:05:00'),(280,5,13.18448,80.30727,'28,Balaji Nagar','2021-03-11 12:06:16','2021-03-11 12:06:16'),(281,4,13.18385,80.30825,'16,2nd Street','2021-03-12 05:47:24','2021-03-12 05:47:24'),(282,4,13.18385,80.30825,'16,2nd Street','2021-03-12 05:47:28','2021-03-12 05:47:28'),(283,4,13.18443,80.30727,'16,2nd Street','2021-03-12 05:47:53','2021-03-12 05:47:53'),(284,NULL,41.83690,-87.68470,'3111,South Western Avenue','2021-03-13 04:56:55','2021-03-13 04:56:55'),(285,NULL,41.83690,-87.68470,'3111,South Western Avenue','2021-03-13 04:57:05','2021-03-13 04:57:05'),(286,NULL,41.83690,-87.68470,'3111,South Western Avenue','2021-03-13 04:57:19','2021-03-13 04:57:19'),(287,NULL,41.83690,-87.68470,'3111,South Western Avenue','2021-03-13 04:57:22','2021-03-13 04:57:22'),(288,NULL,41.83690,-87.68470,'3111,South Western Avenue','2021-03-13 04:57:31','2021-03-13 04:57:31'),(289,NULL,41.83690,-87.68470,'3111,South Western Avenue','2021-03-13 04:57:54','2021-03-13 04:57:54'),(290,NULL,41.83690,-87.68470,'3111,South Western Avenue','2021-03-13 04:58:31','2021-03-13 04:58:31'),(291,NULL,41.83690,-87.68470,'3111,South Western Avenue','2021-03-13 04:58:37','2021-03-13 04:58:37'),(292,NULL,41.83690,-87.68470,'3111,South Western Avenue','2021-03-13 04:58:50','2021-03-13 04:58:50'),(293,2,13.00988,80.22172,'106/89,Velachery Road','2021-03-13 15:02:37','2021-03-13 15:02:37'),(294,2,13.00993,80.22168,'Chennai,Little Mount','2021-03-13 15:02:39','2021-03-13 15:02:39'),(295,2,13.00993,80.22168,'Chennai,Little Mount','2021-03-13 15:02:42','2021-03-13 15:02:42'),(296,2,13.00993,80.22168,'Chennai,Little Mount','2021-03-13 15:02:44','2021-03-13 15:02:44'),(297,2,13.00993,80.22168,'Chennai,Little Mount','2021-03-13 15:11:15','2021-03-13 15:11:15'),(298,2,13.00946,80.22162,'110/99A,Sudhanson Garden Road','2021-03-15 04:06:47','2021-03-15 04:06:47'),(299,2,13.03554,80.24546,'501,Anna Salai','2021-03-15 04:06:51','2021-03-15 04:06:51'),(300,4,13.18449,80.30728,'28,Balaji Nagar','2021-03-15 08:25:49','2021-03-15 08:25:49'),(301,4,13.18449,80.30728,'28,Balaji Nagar','2021-03-15 08:25:59','2021-03-15 08:25:59'),(302,4,13.18449,80.30728,'28,Balaji Nagar','2021-03-15 08:26:01','2021-03-15 08:26:01'),(303,4,13.18448,80.30732,'28,Balaji Nagar','2021-03-16 05:03:00','2021-03-16 05:03:00'),(304,4,13.18449,80.30732,'28,Balaji Nagar','2021-03-16 05:03:06','2021-03-16 05:03:06'),(305,4,13.18449,80.30732,'28,Balaji Nagar','2021-03-16 05:03:10','2021-03-16 05:03:10'),(306,4,13.18449,80.30732,'28,Balaji Nagar','2021-03-16 05:03:14','2021-03-16 05:03:14'),(307,4,13.18449,80.30732,'28,Balaji Nagar','2021-03-16 05:03:20','2021-03-16 05:03:20'),(308,4,13.18448,80.30732,'28,Balaji Nagar','2021-03-16 05:03:48','2021-03-16 05:03:48'),(309,4,13.18448,80.30732,'28,Balaji Nagar','2021-03-16 05:03:50','2021-03-16 05:03:50'),(310,4,13.18448,80.30732,'28,Balaji Nagar','2021-03-16 05:03:52','2021-03-16 05:03:52'),(311,4,13.18448,80.30732,'28,Balaji Nagar','2021-03-16 05:13:32','2021-03-16 05:13:32'),(312,4,13.18446,80.30734,'28,Balaji Nagar','2021-03-16 05:21:38','2021-03-16 05:21:38'),(313,4,13.18446,80.30734,'28,Balaji Nagar','2021-03-16 05:21:45','2021-03-16 05:21:45'),(314,4,13.18445,80.30734,'28,Balaji Nagar','2021-03-16 05:21:50','2021-03-16 05:21:50'),(315,4,13.18445,80.30734,'28,Balaji Nagar','2021-03-16 05:21:51','2021-03-16 05:21:51'),(316,4,13.18445,80.30734,'28,Balaji Nagar','2021-03-16 05:21:51','2021-03-16 05:21:51'),(317,4,13.18445,80.30734,'28,Balaji Nagar','2021-03-16 05:21:51','2021-03-16 05:21:51'),(318,4,13.18447,80.30733,'28,Balaji Nagar','2021-03-16 05:22:26','2021-03-16 05:22:26'),(319,4,13.18447,80.30733,'28,Balaji Nagar','2021-03-16 05:22:27','2021-03-16 05:22:27'),(320,4,13.18446,80.30734,'28,Balaji Nagar','2021-03-16 05:22:27','2021-03-16 05:22:27'),(321,4,13.18446,80.30734,'28,Balaji Nagar','2021-03-16 05:22:27','2021-03-16 05:22:27'),(322,4,13.18446,80.30734,'28,Balaji Nagar','2021-03-16 05:22:31','2021-03-16 05:22:31'),(323,4,13.18446,80.30734,'28,Balaji Nagar','2021-03-16 05:22:33','2021-03-16 05:22:33'),(324,NULL,13.18447,80.30732,'28,Balaji Nagar','2021-03-16 05:33:38','2021-03-16 05:33:38'),(325,NULL,13.18445,80.30734,'28,Balaji Nagar','2021-03-16 05:34:39','2021-03-16 05:34:39'),(326,NULL,13.18445,80.30734,'28,Balaji Nagar','2021-03-16 05:35:14','2021-03-16 05:35:14'),(327,NULL,13.18448,80.30732,'28,Balaji Nagar','2021-03-16 05:36:27','2021-03-16 05:36:27'),(328,NULL,13.18448,80.30732,'28,Balaji Nagar','2021-03-16 05:38:20','2021-03-16 05:38:20'),(329,7,13.18450,80.30731,'28,Balaji Nagar','2021-03-16 09:25:52','2021-03-16 09:25:52'),(330,7,13.18450,80.30731,'28,Balaji Nagar','2021-03-16 09:25:56','2021-03-16 09:25:56'),(331,7,13.18450,80.30731,'28,Balaji Nagar','2021-03-16 09:26:08','2021-03-16 09:26:08'),(332,7,13.18450,80.30731,'28,Balaji Nagar','2021-03-16 09:26:10','2021-03-16 09:26:10'),(333,7,13.18450,80.30732,'28,Balaji Nagar','2021-03-16 09:26:23','2021-03-16 09:26:23'),(334,7,13.18449,80.30727,'28,Balaji Nagar','2021-03-16 09:26:56','2021-03-16 09:26:56'),(335,7,13.18450,80.30731,'28,Balaji Nagar','2021-03-16 11:20:17','2021-03-16 11:20:17'),(336,7,13.18450,80.30732,'28,Balaji Nagar','2021-03-16 11:20:46','2021-03-16 11:20:46'),(337,7,13.18450,80.30732,'28,Balaji Nagar','2021-03-16 11:41:21','2021-03-16 11:41:21'),(338,7,13.18450,80.30732,'28,Balaji Nagar','2021-03-16 11:41:44','2021-03-16 11:41:44'),(339,7,13.18450,80.30732,'28,Balaji Nagar','2021-03-16 11:46:06','2021-03-16 11:46:06'),(340,7,13.18448,80.30732,'28,Balaji Nagar','2021-03-16 12:05:21','2021-03-16 12:05:21'),(341,7,13.18448,80.30732,'28,Balaji Nagar','2021-03-16 12:05:24','2021-03-16 12:05:24'),(342,7,13.18448,80.30732,'28,Balaji Nagar','2021-03-16 12:05:28','2021-03-16 12:05:28'),(343,7,13.18448,80.30732,'28,Balaji Nagar','2021-03-16 12:05:33','2021-03-16 12:05:33'),(344,4,13.18448,80.30732,'28,Balaji Nagar','2021-03-16 12:31:20','2021-03-16 12:31:20'),(345,9,13.18448,80.30732,'28,Balaji Nagar','2021-03-16 13:14:07','2021-03-16 13:14:07'),(346,9,13.18448,80.30732,'28,Balaji Nagar','2021-03-16 13:14:40','2021-03-16 13:14:40'),(347,7,13.18448,80.30732,'28,Balaji Nagar','2021-03-16 13:47:50','2021-03-16 13:47:50'),(348,7,13.18448,80.30732,'28,Balaji Nagar','2021-03-16 13:47:53','2021-03-16 13:47:53'),(349,7,13.18448,80.30732,'28,Balaji Nagar','2021-03-16 13:47:59','2021-03-16 13:47:59'),(350,7,13.18448,80.30732,'28,Balaji Nagar','2021-03-16 13:48:23','2021-03-16 13:48:23'),(351,11,13.06087,80.22480,'Bajanai Koil Street, 22/43, Chennai - 600094, Chennai - India','2021-03-17 03:46:28','2021-03-17 03:46:28'),(352,1,13.06077,80.22493,'Bajanai Koil Street, 41/21, Chennai - 600094, Chennai - India','2021-03-17 03:47:33','2021-03-17 03:47:33'),(353,1,24.72248,46.68387,'Sousa Street, 3673, Riyadh - 12252, Saudi Arabia','2021-03-17 03:47:38','2021-03-17 03:47:38'),(354,1,13.00670,80.22060,'Race Course Interior Road, Chennai - 600032, Chennai - India','2021-03-17 03:47:40','2021-03-17 03:47:40'),(355,1,24.50072,43.81466,'17211, Saudi Arabia','2021-03-17 03:47:44','2021-03-17 03:47:44'),(356,1,24.72248,46.68387,'Sousa Street, 3673, Riyadh - 12252, Saudi Arabia','2021-03-17 03:47:47','2021-03-17 03:47:47'),(357,1,24.72248,46.68387,'Sousa Street, 3673, Riyadh - 12252, Saudi Arabia','2021-03-17 03:47:51','2021-03-17 03:47:51'),(358,1,24.72248,46.68387,'Sousa Street, 3673, Riyadh - 12252, Saudi Arabia','2021-03-17 03:47:54','2021-03-17 03:47:54'),(359,1,24.72248,46.68387,'Sousa Street, 3673, Riyadh - 12252, Saudi Arabia','2021-03-17 03:48:01','2021-03-17 03:48:01'),(360,1,24.72248,46.68387,'Sousa Street, 3673, Riyadh - 12252, Saudi Arabia','2021-03-17 03:48:04','2021-03-17 03:48:04'),(361,11,13.18448,80.30732,'28,Balaji Nagar','2021-03-17 04:20:45','2021-03-17 04:20:45'),(362,11,13.18449,80.30732,'28,Balaji Nagar','2021-03-17 04:20:50','2021-03-17 04:20:50'),(363,11,13.18447,80.30732,'28,Balaji Nagar','2021-03-17 04:20:53','2021-03-17 04:20:53'),(364,11,13.18448,80.30732,'28,Balaji Nagar','2021-03-17 04:21:17','2021-03-17 04:21:17'),(365,10,13.18459,80.30725,'26/A,Balaji Nagar Road','2021-03-17 05:59:57','2021-03-17 05:59:57'),(366,10,13.18459,80.30725,'26/A,Balaji Nagar Road','2021-03-17 05:59:59','2021-03-17 05:59:59'),(367,10,13.18450,80.30731,'28,Balaji Nagar','2021-03-17 06:00:03','2021-03-17 06:00:03'),(368,10,13.18448,80.30733,'28,Balaji Nagar','2021-03-17 06:00:49','2021-03-17 06:00:49'),(369,10,13.18437,80.30737,'27/A,Balaji Nagar Road','2021-03-17 06:12:43','2021-03-17 06:12:43'),(370,10,13.18445,80.30734,'28,Balaji Nagar','2021-03-17 06:12:50','2021-03-17 06:12:50'),(371,10,13.18449,80.30732,'28,Balaji Nagar','2021-03-17 06:13:31','2021-03-17 06:13:31'),(372,10,13.18449,80.30732,'28,Balaji Nagar','2021-03-17 06:13:33','2021-03-17 06:13:33'),(373,10,13.18449,80.30732,'28,Balaji Nagar','2021-03-17 06:13:33','2021-03-17 06:13:33'),(374,10,13.18403,80.30784,'28,Balaji Nagar','2021-03-17 06:16:01','2021-03-17 06:16:01'),(375,10,13.18403,80.30784,'11,Ambedkar Nagar 3rd Street','2021-03-17 06:16:01','2021-03-17 06:16:01'),(376,10,13.18403,80.30784,'11,Ambedkar Nagar 3rd Street','2021-03-17 06:16:03','2021-03-17 06:16:03'),(377,9,13.18448,80.30732,'28,Balaji Nagar','2021-03-17 09:19:00','2021-03-17 09:19:00'),(378,9,13.18448,80.30732,'28,Balaji Nagar','2021-03-17 09:19:47','2021-03-17 09:19:47'),(379,9,13.18448,80.30732,'28,Balaji Nagar','2021-03-17 09:20:54','2021-03-17 09:20:54'),(380,9,13.18448,80.30732,'28,Balaji Nagar','2021-03-17 09:20:56','2021-03-17 09:20:56'),(381,9,13.18448,80.30732,'28,Balaji Nagar','2021-03-17 09:20:59','2021-03-17 09:20:59'),(382,9,13.18448,80.30732,'28,Balaji Nagar','2021-03-17 09:21:02','2021-03-17 09:21:02'),(383,9,13.18448,80.30732,'28,Balaji Nagar','2021-03-17 09:21:38','2021-03-17 09:21:38'),(384,9,13.18448,80.30732,'28,Balaji Nagar','2021-03-17 09:21:41','2021-03-17 09:21:41'),(385,9,13.18450,80.30732,'28,Balaji Nagar','2021-03-17 09:30:59','2021-03-17 09:30:59'),(386,9,13.18450,80.30731,'28,Balaji Nagar','2021-03-17 09:31:03','2021-03-17 09:31:03'),(387,9,13.18450,80.30731,'28,Balaji Nagar','2021-03-17 09:31:04','2021-03-17 09:31:04'),(388,9,13.18450,80.30731,'28,Balaji Nagar','2021-03-17 09:31:26','2021-03-17 09:31:26'),(389,9,13.18450,80.30731,'28,Balaji Nagar','2021-03-17 09:31:26','2021-03-17 09:31:26'),(390,9,13.18450,80.30731,'28,Balaji Nagar','2021-03-17 09:31:38','2021-03-17 09:31:38'),(391,9,13.18450,80.30731,'28,Balaji Nagar','2021-03-17 09:31:38','2021-03-17 09:31:38'),(392,9,13.18450,80.30732,'28,Balaji Nagar','2021-03-17 09:32:34','2021-03-17 09:32:34'),(393,9,13.18450,80.30732,'28,Balaji Nagar','2021-03-17 09:32:41','2021-03-17 09:32:41'),(394,9,13.18450,80.30732,'28,Balaji Nagar','2021-03-17 09:32:46','2021-03-17 09:32:46'),(395,9,13.18450,80.30731,'28,Balaji Nagar','2021-03-17 09:33:42','2021-03-17 09:33:42'),(396,9,13.18450,80.30731,'28,Balaji Nagar','2021-03-17 09:33:45','2021-03-17 09:33:45'),(397,9,13.18449,80.30739,'28,Balaji Nagar','2021-03-17 09:34:20','2021-03-17 09:34:20'),(398,9,13.18450,80.30731,'28,Balaji Nagar','2021-03-17 09:35:21','2021-03-17 09:35:21'),(399,9,13.18450,80.30731,'28,Balaji Nagar','2021-03-17 09:35:37','2021-03-17 09:35:37'),(400,3,13.18450,80.30731,'28,Balaji Nagar','2021-03-18 05:42:19','2021-03-18 05:42:19'),(401,NULL,3.03174,101.45989,'34,Lorong Demang 5c','2021-03-18 08:37:28','2021-03-18 08:37:28'),(402,NULL,3.03174,101.45989,'34,Lorong Demang 5c','2021-03-18 08:39:30','2021-03-18 08:39:30'),(403,NULL,3.03174,101.45989,'34,Lorong Demang 5c','2021-03-18 08:39:38','2021-03-18 08:39:38'),(404,3,13.18450,80.30731,'28,Balaji Nagar','2021-03-18 10:07:41','2021-03-18 10:07:41'),(405,3,13.18450,80.30731,'28,Balaji Nagar','2021-03-18 10:10:20','2021-03-18 10:10:20'),(406,9,13.18450,80.30731,'28,Balaji Nagar','2021-03-18 10:10:21','2021-03-18 10:10:21'),(407,9,13.18448,80.30732,'28,Balaji Nagar','2021-03-18 10:13:14','2021-03-18 10:13:14'),(408,9,13.18448,80.30732,'28,Balaji Nagar','2021-03-18 10:13:18','2021-03-18 10:13:18'),(409,9,13.18448,80.30732,'28,Balaji Nagar','2021-03-18 10:13:23','2021-03-18 10:13:23'),(410,1,23.70424,46.42683,'Hareeq - 16397, Saudi Arabia','2021-03-18 10:23:31','2021-03-18 10:23:31'),(411,1,13.00670,80.22060,'Race Course Interior Road, Chennai - 600032, Chennai - India','2021-03-18 10:23:38','2021-03-18 10:23:38'),(412,1,24.50072,43.81466,'17211, Saudi Arabia','2021-03-18 10:23:45','2021-03-18 10:23:45'),(413,1,13.00670,80.22060,'Race Course Interior Road, Chennai - 600032, Chennai - India','2021-03-18 10:23:48','2021-03-18 10:23:48'),(414,1,24.50072,43.81466,'17211, Saudi Arabia','2021-03-18 10:23:53','2021-03-18 10:23:53'),(415,1,23.70424,46.42683,'Hareeq - 16397, Saudi Arabia','2021-03-18 10:23:56','2021-03-18 10:23:56');
/*!40000 ALTER TABLE `unavailableProduct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userCouponCode`
--

DROP TABLE IF EXISTS `userCouponCode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userCouponCode` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `couponId` int(11) NOT NULL,
  `orderId` int(11) DEFAULT NULL,
  `discountValue` float(10,2) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userCouponCode_fk0` (`userId`),
  KEY `userCouponCode_fk1` (`couponId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userCouponCode`
--

LOCK TABLES `userCouponCode` WRITE;
/*!40000 ALTER TABLE `userCouponCode` DISABLE KEYS */;
/*!40000 ALTER TABLE `userCouponCode` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userSearch`
--

DROP TABLE IF EXISTS `userSearch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userSearch` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `type` varchar(50) NOT NULL,
  `lat` float(10,5) DEFAULT NULL,
  `lng` float(10,5) DEFAULT NULL,
  `searchText` varchar(512) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userSearch_fk0` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userSearch`
--

LOCK TABLES `userSearch` WRITE;
/*!40000 ALTER TABLE `userSearch` DISABLE KEYS */;
INSERT INTO `userSearch` VALUES (1,4,'product',26.46896,49.80188,'ghggg','2021-03-07 11:51:10','2021-03-07 11:51:10'),(2,4,'product',26.46896,49.80188,'tigg','2021-03-07 12:39:02','2021-03-07 12:39:02'),(3,4,'product',26.46896,49.80188,'ff','2021-03-07 12:39:42','2021-03-07 12:39:42'),(4,5,'maincategory',26.47847,49.79725,'gsgsh','2021-03-08 08:07:21','2021-03-08 08:07:21'),(5,5,'maincategory',26.47847,49.79725,'Parotta','2021-03-08 12:53:15','2021-03-08 12:53:15'),(6,NULL,'maincategory',41.83690,-87.68470,'text','2021-03-13 04:57:52','2021-03-13 04:57:52'),(7,7,'maincategory',31.66092,38.68539,'chocolates','2021-03-16 11:34:41','2021-03-16 11:34:41'),(8,7,'product',31.66092,38.68539,'denim','2021-03-16 12:49:40','2021-03-16 12:49:40');
/*!40000 ALTER TABLE `userSearch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customerID` varchar(45) DEFAULT '',
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `countryCode` int(5) NOT NULL,
  `mobileNumber` varchar(20) NOT NULL,
  `os` varchar(10) DEFAULT NULL,
  `profilePic` varchar(255) DEFAULT NULL,
  `fcmToken` varchar(255) DEFAULT NULL,
  `voipToken` varchar(255) DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `otp` int(6) NOT NULL DEFAULT '0',
  `gender` varchar(20) DEFAULT '',
  `latitude` float(10,6) DEFAULT NULL,
  `longitude` float(10,6) DEFAULT NULL,
  `walletAmount` float(10,2) NOT NULL DEFAULT '0.00',
  `socketID` varchar(255) DEFAULT NULL,
  `referralCode` varchar(100) DEFAULT 'NOT AVAILABLE',
  `lastOrder` date DEFAULT NULL,
  `packageValue` float(10,2) DEFAULT '0.00',
  `trustUser` char(45) DEFAULT 'false',
  `userStatus` varchar(45) DEFAULT 'active',
  `offersNotify` char(45) DEFAULT 'true',
  `ordersNotify` char(45) DEFAULT 'true',
  `announcementNotify` char(45) DEFAULT 'true',
  `othersNotify` char(45) DEFAULT 'true',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mobileNumber` (`mobileNumber`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'#Cu_ID3693','mm','mm',NULL,91,'1234567890','iOS',NULL,'fA4DraZPXUuqkJR7GkWoEa:APA91bGF1Lm8R5F3t2PAlG-nyRulQg44eP62WaWWSlDzRdheu01YjjXWhMcjZCrr8hr0F8BtR3LfWslqq7LkSowWJxKdFoo8vDt3fqhVNqZ0knN7NxNVGKwxcxblqH9Ly5bBzaKbeuuK',NULL,NULL,0,'male',NULL,NULL,0.00,NULL,'duso0f0d','2021-03-06',1000.00,'true','active','true','true','true','true','2021-03-18 10:11:31','2021-03-06 12:37:39'),(2,'#Cu_ID6941','vishnu','kuppz','vishnushan@gmail.com',91,'9988776655','android',NULL,'ftKFcEM2QNi_a1QYl2Dm0Z:APA91bG786H6fO41_iob11uVZHwcXPHZyl5ldI2caO4yC7QRJTJTGI0KzdT1LXCPmSSj0F9NgQJmer3eoYUlTw0caoAtv_7npbEm2oBkDdUrxt0TrxPSupp4VHBjz_R9zdQwZbb07IXs',NULL,'1996-12-12',0,'MALE',NULL,NULL,0.00,NULL,'a6co85d','2021-03-15',0.00,'true','active','true','true','true','true','2021-03-15 04:07:22','2021-03-07 05:31:55'),(3,'#Cu_ID3383','sasi','sid',NULL,91,'9042663799','android',NULL,'eI8wFRxmRsmM_c-YSQiDLc:APA91bEI6EtIISbsLIhC8HomraNqWQiokdapCcu1tZSpB2HASgW8yNph8DMgQkmutNS7TMBaPetcDjnQ9bBaCJfW569Pv6kuR-KGAR3GeUVlUxZtCdcuVaR2sNKUrt6TMZEJRAKi104g',NULL,NULL,0,'male',NULL,NULL,0.00,NULL,'87i4kdb6','2021-03-08',0.00,'true','active','true','true','true','true','2021-03-12 12:58:32','2021-03-07 10:47:01'),(4,'#Cu_ID3100','Karthick','B','karthick95babu@gmail.com',91,'9080001020','iOS',NULL,'e1Oc6bk2dkH-i3KrtfIzXa:APA91bFNQhsfse07GRAikEPS1HgVw79x9I42vlZXpQbGmIiSdd0aV_Ky9drG-HstI-DgO8qF1e9WiPPoZx6y3AmeOg48kaDHavCwRmY3WLl3GuO23Dwb-0auQCZPxJtRIAvt6uw8UVh1',NULL,'1995-11-20',0,'MALE',NULL,NULL,0.00,NULL,'qjow73j','2021-03-12',0.00,'true','active','true','false','true','false','2021-03-18 07:33:00','2021-03-07 11:27:03'),(5,'#Cu_ID7773','Karthi','Kathir',NULL,91,'8939781712','android',NULL,'fYKJMfW7R2W2ByB3P9RJCx:APA91bGGoFtkHkABB_8-z0y-L4EnuaCmqDJiTfZBv90lksd1e46xa_h6QN2hYXgHcvJicZDW86Vsy4CBfyWtFvmY6HwfALoDHvDQpuTtOTsmc5scR3dhtkl-ViQswHqol80hZlGjyVZB',NULL,NULL,0,'male',NULL,NULL,0.00,NULL,'bfhit9nv','2021-03-11',0.00,'false','active','false','false','false','false','2021-03-11 12:51:39','2021-03-07 11:54:38'),(6,'#Cu_ID3036','Deva','New',NULL,91,'6383159335','android',NULL,'c4g9FMZUSu6iR6r9-WWAUC:APA91bGFxnqL7QYWNFhwkzhp9IKIhrTO0R7DSRj7ZmGCXJZu5HtFzBowcJ8RUmQ7wbBZi277QcMKxJv6EN6bbB9jBUMQfrcPDkwqfJ-Vx9G3QhHeg_GcPcXlKKPPKbPxdYaBDdHVXvgY',NULL,NULL,0,'male',NULL,NULL,0.00,NULL,'gob8bgt4',NULL,10.00,'true','active','true','true','true','true','2021-03-08 12:35:47','2021-03-08 05:59:29'),(7,'#Cu_ID7744','Hussain','Alhassan','haasan@gmail.com',966,'123456789','android',NULL,'e2eMAEHzT9SZ_aWO8N0bEj:APA91bHGtz8ccr3KHaUULIXod3Z0gUDZcstRKD1TgkTahNsGoBz3gS5U33zObnKdig7fUMU_8kd0h8Y5TsETKuGchyJJWYY6AJiIV1fkf0aaSK4OB77-xNPKR6JIuozveOEqMyq4-dkN',NULL,'2012-12-18',0,'FEMALE',NULL,NULL,0.00,NULL,'vvb7f24ci','2021-03-16',0.00,'true','active','true','true','true','true','2021-03-16 13:37:30','2021-03-10 18:22:25'),(8,'#Cu_ID7084','Hussain','Aldawhan',NULL,966,'508520665','android',NULL,'clbfl0q0QMS1usvbDq5Io1:APA91bH3uaTCExKabNas7FKRjgBLFIOZGrdE7bzImwNCSeW95xgjo-750HEElTbeciLhrxwaMAqe4Vf-cn0xQD_zNQFypFbXAs9bEET6PYbwtvQgm9_N-ui8l8Se5-yv_QOXBZ8hRoTd',NULL,NULL,0,'male',NULL,NULL,0.00,NULL,'2y5dgu9j','2021-03-11',0.00,'true','active','true','true','true','true','2021-03-12 12:57:22','2021-03-11 00:53:08'),(9,'#Cu_ID1482','Test','Two',NULL,966,'907856456','android',NULL,'egZPjARDTFqHc3wBKEev8L:APA91bFTrmu5E0ovd5t1xtNSH-j0qND6aUIgwqexcVYA_Sj5qf7ZrMlWUUJO4yPZyC1azdFeE6TxEhv4MTmMo4Wyhsfm6NR9SRXoMJxd_XazgeQs4tIehswoErY5zdhFROT3ZwdoqPd0',NULL,NULL,0,'male',NULL,NULL,0.00,NULL,'zhz1cf6z','2021-03-17',0.00,'false','active','true','true','true','true','2021-03-17 09:34:17','2021-03-16 13:14:06'),(10,'#Cu_ID7602','Rashid','One',NULL,966,'123457890','android',NULL,'egZPjARDTFqHc3wBKEev8L:APA91bFTrmu5E0ovd5t1xtNSH-j0qND6aUIgwqexcVYA_Sj5qf7ZrMlWUUJO4yPZyC1azdFeE6TxEhv4MTmMo4Wyhsfm6NR9SRXoMJxd_XazgeQs4tIehswoErY5zdhFROT3ZwdoqPd0',NULL,NULL,0,'male',NULL,NULL,0.00,NULL,'2vu23bd','2021-03-17',0.00,'true','active','true','true','true','true','2021-03-17 07:45:01','2021-03-16 14:11:07'),(11,'#Cu_ID2211','Eoin','Morgan',NULL,966,'123123123','android',NULL,'cQiHyOrPSG2r8Yp8gKaOYV:APA91bFy1iRgx3Cy-xwHISTj3qQv0YDffQAlCmOOxI3hBBQ3u2DLTIK6Vt6DdIurmOgwsnWdiOSMsAC2CrPxihmvEGg4PIxO-Zas57Jk08qi3xQC45vMu1sZxivYJ2Fki3hIVVnZIXdp',NULL,NULL,0,'male',NULL,NULL,0.00,NULL,'uilotso','2021-03-17',0.00,'false','active','true','true','true','true','2021-03-17 06:58:06','2021-03-16 14:11:38'),(12,'#Cu_ID9940','test','bhuvanesh',NULL,91,'88389425155',NULL,NULL,NULL,NULL,NULL,0,'male',NULL,NULL,0.00,NULL,'chae575',NULL,0.00,'false','active','true','true','true','true','2021-03-17 11:16:39','2021-03-17 11:16:39');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_address`
--

DROP TABLE IF EXISTS `users_address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_address` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `addressType` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `addressPinDetails` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `landmark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `instruction` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `latitude` decimal(9,6) NOT NULL,
  `longitude` decimal(9,6) NOT NULL,
  `buildingName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT 'ADDRESS',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleteAdd` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `users_address_fk0` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_address`
--

LOCK TABLES `users_address` WRITE;
/*!40000 ALTER TABLE `users_address` DISABLE KEYS */;
INSERT INTO `users_address` VALUES (1,1,'Home','17211, Saudi Arabia',' ',' ',24.500724,43.814662,'My Home','ADDRESS','2021-03-06 13:23:25','2021-03-06 13:23:25',1),(2,1,'Office','Race Course Interior Road, Chennai - 600032, Chennai - India',' ',' ',13.006700,80.220600,'name','ADDRESS','2021-03-06 13:32:57','2021-03-06 13:32:57',1),(3,2,'Home','501, Anna Salai, Satya Murthy Nagar, Teynampet, Chennai, Tamil Nadu 600018, India',' ',' ',13.035553,80.245568,'chh','ADDRESS','2021-03-07 05:32:55','2021-03-07 05:32:55',1),(4,4,'Dammam','Unnamed Road, Ar Rayyan, Dammam 32256, Saudi Arabia',' ',' ',26.405620,50.088999,'10','ADDRESS','2021-03-08 13:34:38','2021-03-08 13:34:38',0),(5,4,'Home','Parking Airport, King Fahd International Airport, Dammam 32552, Saudi Arabia',' ',' ',26.468960,49.801876,'Airport','ADDRESS','2021-03-11 06:51:47','2021-03-11 06:51:47',0),(6,3,'Office','6233 3, Ghirnatah, Dammam 32243 2479, Saudi Arabia',' ',' ',26.420946,50.086578,'23','ADDRESS','2021-03-07 11:49:08','2021-03-07 11:49:08',1),(7,3,'test','2894, King Fahd Suburb, Dammam 32511 7465, Saudi Arabia',' ',' ',26.424818,49.996228,'34','ADDRESS','2021-03-07 11:51:00','2021-03-07 11:51:00',1),(8,5,'Office','King Fahd Road, King Fahd International Airport, Dammam 32552, Saudi Arabia',' ',' ',26.478474,49.797248,'Soudgu','ADDRESS','2021-03-07 11:57:04','2021-03-07 11:57:04',1),(9,1,'مقرنا','Sousa Street, 3673, Riyadh - 12252, Saudi Arabia',' ',' ',24.722484,46.683867,' ','ADDRESS','2021-03-07 15:51:29','2021-03-07 15:51:29',1),(10,4,'Office','4868 King Faisal Rd, حي العاصمة، Ad Diriyah 13713, Saudi Arabia',' ',' ',24.757855,46.571351,'10','ADDRESS','2021-03-08 13:34:36','2021-03-08 13:34:36',0),(11,5,'Soudhi','3898 Hawtat Bani Tamim St, Al Olaya, Riyadh 12333, Saudi Arabia',' ',' ',24.706965,46.672135,'3898','ADDRESS','2021-03-08 06:30:14','2021-03-08 06:30:14',0),(12,2,'hsjs','14654, Saudi Arabia',' ',' ',24.734411,47.239783,'hdjsjs','ADDRESS','2021-03-08 05:05:15','2021-03-08 05:05:15',1),(13,4,'arabic 1','2686-2650 Omar Bin Al Khattab Rd, Jable Jammah and Ghurabah, Medina 42371, Saudi Arabia',' ',' ',24.437517,39.556276,'Ueh','ADDRESS','2021-03-08 13:34:34','2021-03-08 13:34:34',0),(14,4,'Temp','Cornish Rd, Al-Hamra\'a, Dammam 32421, Saudi Arabia',' ',' ',26.483022,50.075683,'12','ADDRESS','2021-03-11 06:51:46','2021-03-11 06:51:46',0),(15,2,'Office','76536, Saudi Arabia',' ',' ',29.059016,43.499598,'bdhs','ADDRESS','2021-03-08 05:27:25','2021-03-08 05:27:25',1),(16,6,'Medina','7153, Az Zahrah, Medina 42335 3431, Saudi Arabia',' ',' ',24.529615,39.572771,'-','ADDRESS','2021-03-08 06:00:13','2021-03-08 06:00:13',1),(17,4,'Airport','Dammam Airport parking, مطار الملك فهد الدولي، Unnamed Road, الدمام 32552, Saudi Arabia',' ',' ',26.472930,49.797360,'186','ADDRESS','2021-03-16 05:21:49','2021-03-16 05:21:49',0),(18,4,'Medina','3548, Az Zahrah, Medina 42335 7336, Saudi Arabia',' ',' ',24.532334,39.572840,'-','ADDRESS','2021-03-16 05:21:48','2021-03-16 05:21:48',0),(19,4,'Saudi','19333, Saudi Arabia',' ',' ',23.835073,44.729886,'Saudi','ADDRESS','2021-03-11 06:51:44','2021-03-11 06:51:44',0),(20,8,'مقرنا','Airport Rd, King Fahd International Airport, Dammam 32552, Saudi Arabia',' ',' ',26.495894,49.803447,' ','ADDRESS','2021-03-11 00:54:08','2021-03-11 00:54:08',1),(21,2,'currentAddress','626,Anna Salai',' ',' ',13.035520,80.245450,' ','CURRENT','2021-03-11 04:09:11','2021-03-11 04:09:11',1),(22,4,'Office','Naif bin Abdulaziz St, Turayf 75312, Saudi Arabia',' ',' ',31.671863,38.662810,'Turaif  Airport','ADDRESS','2021-03-11 07:01:14','2021-03-11 07:01:14',0),(23,4,'Turaif Airport','Airport Road، Turayf 75253, Saudi Arabia',' ',' ',31.693509,38.733654,'10','ADDRESS','2021-03-16 05:21:47','2021-03-16 05:21:47',0),(24,4,'currentAddress','28,Balaji Nagar',' ',' ',13.184495,80.307285,' ','CURRENT','2021-03-11 11:20:17','2021-03-11 11:20:17',1),(25,5,'Domestic Airport','Airport Road، Turayf 75253, Saudi Arabia',' ',' ',31.696312,38.732469,'17','ADDRESS','2021-03-11 12:06:15','2021-03-11 12:06:15',1),(26,4,'Dammam','Unnamed Road, Safwa 32913, Saudi Arabia',' ',' ',26.665742,49.869925,'62','ADDRESS','2021-03-16 05:21:47','2021-03-16 05:21:47',0),(27,7,'Office','Dhahran Jubail Branch Rd, Ar Rimal, Ank 32465, Saudi Arabia',' ',' ',26.497304,49.987933,'vvv','ADDRESS','2021-03-16 13:03:09','2021-03-16 13:03:09',0),(28,4,'Dammam','Unnamed Road Saudi Arabia',' ',' ',26.613171,49.781466,'34','ADDRESS','2021-03-16 05:21:41','2021-03-16 05:21:41',0),(29,4,'Medina','43892, Saudi Arabia',' ',' ',25.036281,39.511033,'45','ADDRESS','2021-03-16 05:21:35','2021-03-16 05:21:35',0),(30,4,'King Khalid Airport','مطار الملك خالد الدولي،، King Khalid International Airport, Riyadh 11564, Saudi Arabia',' ',' ',24.969396,46.700114,'66','ADDRESS','2021-03-18 07:33:28','2021-03-18 07:33:28',0),(31,4,'Turaif Airport','مطار طري، Turayf 75252،, Saudi Arabia',' ',' ',31.691230,38.734727,'627','ADDRESS','2021-03-16 06:39:08','2021-03-16 06:39:08',1),(32,7,'Riyadth Airport','Muhammad Ibn Farj, King Khalid International Airport, Riyadh 13443, Saudi Arabia',' ',' ',24.926516,46.703922,'727','ADDRESS','2021-03-16 13:03:11','2021-03-16 13:03:11',0),(33,7,'Turaif','طريق عثمان بن عفان، Al Wurud, Turayf 75311, Saudi Arabia',' ',' ',31.660923,38.685394,'619','ADDRESS','2021-03-16 11:20:46','2021-03-16 11:20:46',1),(34,7,'currentAddress','28,Balaji Nagar',' ',' ',13.184500,80.307316,' ','CURRENT','2021-03-16 11:43:12','2021-03-16 11:43:12',1),(35,9,'Home','King Fahd Road, King Fahd International Airport, Dammam 32552, Saudi Arabia',' ',' ',26.416165,49.822341,'627','ADDRESS','2021-03-16 13:14:39','2021-03-16 13:14:39',1),(36,7,'Home','Saudi Arabia',' ',' ',26.500831,50.081780,'67','ADDRESS','2021-03-16 13:48:00','2021-03-16 13:48:00',0),(37,7,'Home','32753, Saudi Arabia',' ',' ',26.516074,49.831875,'62920','ADDRESS','2021-03-16 13:48:23','2021-03-16 13:48:23',1),(38,11,'Home','75235, Saudi Arabia',' ',' ',31.788892,38.646155,'22','ADDRESS','2021-03-17 04:21:16','2021-03-17 04:21:16',1),(39,10,'Home','King Fahd Road, King Fahd International Airport, Dammam 32552, Saudi Arabia',' ',' ',26.417919,49.823994,'6729','ADDRESS','2021-03-17 06:12:51','2021-03-17 06:12:51',0),(40,10,'Home','Salwa Rd, Salwa 36621, Saudi Arabia',' ',' ',24.725296,50.763673,'6292','ADDRESS','2021-03-17 06:16:00','2021-03-17 06:16:00',1),(41,9,'Office','العوالى النازل، Al Barakah, Medina 42333, Saudi Arabia',' ',' ',24.525668,39.573129,'77','ADDRESS','2021-03-17 09:21:37','2021-03-17 09:21:37',1),(42,9,'ffg','39721, Saudi Arabia',' ',' ',27.449989,45.567261,'sssmj','ADDRESS','2021-03-17 09:33:41','2021-03-17 09:33:41',1),(43,1,'demo ','Hareeq - 16397, Saudi Arabia',' ',' ',23.704239,46.426826,' ','ADDRESS','2021-03-18 10:23:29','2021-03-18 10:23:29',1);
/*!40000 ALTER TABLE `users_address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendor`
--

DROP TABLE IF EXISTS `vendor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vendor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `storeId` int(11) NOT NULL,
  `vendorName` varchar(255) NOT NULL,
  `activeStatus` int(11) NOT NULL DEFAULT '1',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `vendor_fk0` (`storeId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendor`
--

LOCK TABLES `vendor` WRITE;
/*!40000 ALTER TABLE `vendor` DISABLE KEYS */;
INSERT INTO `vendor` VALUES (1,2,'a3nab',1,'2021-03-06 06:47:31','2021-03-06 06:47:31'),(2,1,'Zomato',1,'2021-03-06 08:37:59','2021-03-06 08:37:59'),(3,3,'Swiggy',1,'2021-03-08 07:01:52','2021-03-08 07:01:52'),(4,4,'Manjai',1,'2021-03-11 07:57:53','2021-03-11 07:57:53'),(5,4,'Uber',1,'2021-03-12 04:44:46','2021-03-12 04:44:46');
/*!40000 ALTER TABLE `vendor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendorProducts`
--

DROP TABLE IF EXISTS `vendorProducts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vendorProducts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vendorId` int(11) NOT NULL,
  `managerId` int(11) DEFAULT NULL,
  `storeId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `stockType` char(50) NOT NULL,
  `units` int(11) NOT NULL,
  `expiryDate` date DEFAULT NULL,
  `StockReason` varchar(255) NOT NULL DEFAULT '',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `vendorProducts_fk0` (`vendorId`),
  KEY `vendorProducts_fk1` (`productId`),
  KEY `vendorProducts_fk2` (`storeId`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendorProducts`
--

LOCK TABLES `vendorProducts` WRITE;
/*!40000 ALTER TABLE `vendorProducts` DISABLE KEYS */;
INSERT INTO `vendorProducts` VALUES (1,2,1,1,4,'ADD',50,'2021-03-06','','2021-03-06 11:51:56','2021-03-06 11:51:56'),(2,2,1,1,2,'ADD',100,'2021-03-07','','2021-03-06 12:02:00','2021-03-06 12:02:00'),(3,2,1,1,1,'ADD',38,'2021-03-07','','2021-03-06 12:12:21','2021-03-06 12:12:21'),(4,2,2,1,4,'ADD',57,'2021-03-25','','2021-03-07 09:06:16','2021-03-07 09:06:16'),(5,2,2,1,4,'Subtract or discount',50,'2021-03-04','','2021-03-07 10:39:57','2021-03-07 10:39:57'),(6,2,2,1,4,'ADD',150,'2021-03-17','','2021-03-07 10:41:37','2021-03-07 10:41:37'),(7,2,2,1,3,'ADD',100,'2021-03-25','','2021-03-07 10:48:16','2021-03-07 10:48:16'),(8,1,4,2,4,'ADD',50,'2021-03-09','','2021-03-08 05:24:12','2021-03-08 05:24:12'),(9,2,NULL,1,4,'ADD',30,'2021-03-16','Stock Updation','2021-03-08 07:00:18','2021-03-08 07:00:18'),(10,3,NULL,3,5,'ADD',100,'2021-03-24','Nil','2021-03-08 07:02:39','2021-03-08 07:02:39'),(11,3,NULL,3,6,'ADD',90,'2021-03-22','Post','2021-03-08 07:02:56','2021-03-08 07:02:56'),(12,2,1,1,6,'ADD',23,'2021-03-08','','2021-03-08 08:36:50','2021-03-08 08:36:50'),(13,3,NULL,3,6,'SUBTRACT',84,'2021-03-30','s','2021-03-09 08:56:56','2021-03-09 08:56:56'),(14,2,NULL,1,6,'SUBTRACT',16,'2021-03-22','dd','2021-03-09 09:00:24','2021-03-09 09:00:24'),(15,4,5,4,9,'ADD',50,'2021-03-31','','2021-03-11 10:51:49','2021-03-11 10:51:49'),(16,4,5,4,10,'ADD',80,'2021-03-31','','2021-03-11 10:52:07','2021-03-11 10:52:07'),(17,4,5,4,7,'ADD',100,'2021-03-24','','2021-03-11 10:52:25','2021-03-11 10:52:25'),(18,2,1,1,4,'ADD',50,'2021-03-24','','2021-03-12 05:03:13','2021-03-12 05:03:13'),(19,4,5,4,11,'ADD',10,'2021-03-30','','2021-03-12 13:15:17','2021-03-12 13:15:17'),(20,4,5,4,7,'ADD',25,'2021-04-01','','2021-03-16 06:51:20','2021-03-16 06:51:20'),(21,5,5,4,13,'ADD',10,'2021-03-18','','2021-03-16 06:51:57','2021-03-16 06:51:57'),(22,5,5,4,9,'ADD',30,'2021-03-23','','2021-03-16 06:52:33','2021-03-16 06:52:33'),(23,4,5,4,11,'ADD',12,'2021-03-21','','2021-03-16 06:57:52','2021-03-16 06:57:52'),(24,2,9,1,6,'ADD',50,'2021-03-16','','2021-03-16 10:06:27','2021-03-16 10:06:27'),(25,2,NULL,1,6,'ADD',30,'2021-03-21','Nil','2021-03-16 10:14:10','2021-03-16 10:14:10'),(26,5,5,4,7,'ADD',10,'2021-03-17','','2021-03-16 11:28:11','2021-03-16 11:28:11'),(27,5,5,4,7,'Subtract or discount',5,'2021-03-17','','2021-03-16 11:29:00','2021-03-16 11:29:00'),(28,1,NULL,2,4,'ADD',50,'2021-04-12','Stock','2021-03-16 12:09:45','2021-03-16 12:09:45'),(29,2,9,1,7,'ADD',25,'2021-03-24','','2021-03-17 05:18:38','2021-03-17 05:18:38'),(30,2,9,1,7,'ADD',50,'2021-03-24','','2021-03-17 05:19:06','2021-03-17 05:19:06'),(31,2,9,1,7,'Subtract or discount',75,'2021-03-18','','2021-03-17 05:23:50','2021-03-17 05:23:50'),(32,2,9,1,4,'ADD',50,'2021-03-17','','2021-03-17 05:25:16','2021-03-17 05:25:16'),(33,2,9,1,7,'ADD',50,'2021-03-17','','2021-03-17 05:25:48','2021-03-17 05:25:48'),(34,4,NULL,4,7,'ADD',9,'2021-03-17','hfhfg','2021-03-17 06:57:41','2021-03-17 06:57:41'),(35,3,NULL,3,6,'ADD',2,'2021-03-17','dddddf','2021-03-17 09:30:40','2021-03-17 09:30:40'),(36,3,NULL,3,6,'ADD',3,'2021-03-16','jg','2021-03-17 09:58:25','2021-03-17 09:58:25'),(37,5,NULL,4,7,'SUBTRACT',6,'2021-03-23','er','2021-03-18 05:48:34','2021-03-18 05:48:34');
/*!40000 ALTER TABLE `vendorProducts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `walletTransaction`
--

DROP TABLE IF EXISTS `walletTransaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `walletTransaction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `orderId` int(11) DEFAULT NULL,
  `amount` float(10,2) NOT NULL,
  `transactionType` varchar(70) DEFAULT '',
  `typeOfTrans` varchar(45) DEFAULT '',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `walletTransaction_fk0` (`userId`),
  KEY `walletTransaction_fk1` (`orderId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `walletTransaction`
--

LOCK TABLES `walletTransaction` WRITE;
/*!40000 ALTER TABLE `walletTransaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `walletTransaction` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-18 16:51:47
