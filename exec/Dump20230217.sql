CREATE DATABASE  IF NOT EXISTS `calmwave` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `calmwave`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: i8a105.p.ssafy.io    Database: calmwave
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hibernate_sequence`
--

LOCK TABLES `hibernate_sequence` WRITE;
/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
INSERT INTO `hibernate_sequence` VALUES (1);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `memo`
--

DROP TABLE IF EXISTS `memo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `memo` (
  `memo_id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`memo_id`),
  KEY `FKj9dhd2726xu5txp0rr49k9vik` (`user_id`),
  CONSTRAINT `FKj9dhd2726xu5txp0rr49k9vik` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `memo`
--

LOCK TABLES `memo` WRITE;
/*!40000 ALTER TABLE `memo` DISABLE KEYS */;
/*!40000 ALTER TABLE `memo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `past_work`
--

DROP TABLE IF EXISTS `past_work`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `past_work` (
  `past_work_id` bigint NOT NULL AUTO_INCREMENT,
  `date_aimed` datetime(6) DEFAULT NULL,
  `date_created` datetime(6) DEFAULT NULL,
  `date_finished` datetime(6) DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `time_aimed` bigint DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `work_order` int DEFAULT NULL,
  `user_id` bigint NOT NULL,
  `work_cate_id` bigint NOT NULL,
  PRIMARY KEY (`past_work_id`),
  KEY `FKb01eg268pslfax4o8ycovwr65` (`user_id`),
  KEY `FKocwkcdeclpxt4y5rhb9pfxmji` (`work_cate_id`),
  CONSTRAINT `FKb01eg268pslfax4o8ycovwr65` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `FKocwkcdeclpxt4y5rhb9pfxmji` FOREIGN KEY (`work_cate_id`) REFERENCES `work_category` (`work_cate_id`)
) ENGINE=InnoDB AUTO_INCREMENT=157 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `past_work`
--

LOCK TABLES `past_work` WRITE;
/*!40000 ALTER TABLE `past_work` DISABLE KEYS */;
INSERT INTO `past_work` VALUES (6,'2023-02-18 18:00:00.000000','2023-02-14 09:43:54.725947','2023-02-14 19:54:09.150608','1번 밭','DONE',3600,'당근',0,4,6),(7,NULL,'2023-02-14 09:44:45.986819','2023-02-14 19:54:11.345062','2번 밭','DONE',3600,'고구마',0,4,6),(13,NULL,'2023-02-14 09:46:59.781054','2023-02-14 19:54:25.964344','아자 아자!','DONE',3600,'감자!',0,4,6),(16,'2023-02-17 18:00:00.000000','2023-02-14 10:28:03.808333','2023-02-14 17:59:57.666897','화이탱','DONE',38880000,'리덕수 공부하기',0,5,16),(19,'2023-02-18 18:00:00.000000','2023-02-14 10:59:40.142009','2023-02-14 15:50:40.812593','tree ','DONE',3600,'Leetcode 1002. Medium. Find Longest Tree',0,6,20),(33,'2023-02-15 18:00:00.000000','2023-02-14 16:12:45.620396','2023-02-14 20:24:50.133990','프런트 3명, 백엔드 3명','DONE',0,'팀빌딩',0,1,33),(34,NULL,'2023-02-14 16:50:24.774497','2023-02-16 15:25:08.943612','','DONE',14400,'감자 심기',0,4,6),(41,'2023-02-17 18:00:00.000000','2023-02-15 09:56:20.471847','2023-02-15 15:55:24.897748','디자인 돌려깎기','DONE',7200,'css',0,5,16),(42,'2023-02-17 18:00:00.000000','2023-02-15 09:56:36.233883','2023-02-15 15:56:14.367178','찍어야지ㅇㅇㅇㅇㅇ','DONE',7200,'UCC 영상',0,5,16),(43,'2023-02-17 18:00:00.000000','2023-02-15 09:56:54.752226','2023-02-15 17:27:33.992175','하','DONE',7200,'팀 구하기',0,5,17),(44,'2023-02-20 18:00:00.000000','2023-02-15 09:57:18.724571','2023-02-15 17:30:51.404205','제발..','DONE',7200,'자율까진 안하고싶어',0,5,18),(48,'2023-02-17 18:00:00.000000','2023-02-15 17:33:36.786125','2023-02-15 17:36:40.863142','하이하이','DONE',7200,'ucc',0,21,52),(49,'2023-02-17 18:00:00.000000','2023-02-15 17:33:57.417891','2023-02-15 17:38:30.129102','술','DONE',7200,'술',0,21,53),(56,'2023-02-17 18:00:00.000000','2023-02-09 10:08:01.620044','2023-02-16 12:16:00.945732','하기시렁','DONE',7200,'흐규규',0,5,17),(58,'2023-02-21 18:00:00.000000','2023-02-08 10:23:33.666445','2023-02-16 15:47:07.022696','발표 울렁증 극복하기\n사장님이 보고계셔','DONE',7200,'프로젝트 기획 발표',0,23,59),(73,'2023-02-28 18:00:00.000000','2023-02-25 10:42:36.926128','2023-02-16 15:54:06.690291','오픽, 정보처리기사 공부','DONE',3600,'자격증 공부',0,23,60),(74,'2023-02-18 18:00:00.000000','2023-02-16 10:44:36.722281','2023-02-16 12:14:47.042210','오잉잉','DONE',10800,'집가기',0,5,18),(78,'2023-02-18 18:00:00.000000','2023-02-16 12:15:15.960484','2023-02-16 12:17:08.510397','아자자','DONE',10800,'마이페이지',0,5,16),(79,'2023-01-16 19:00:00.000000','2023-01-16 10:00:00.000000','2023-01-16 11:00:00.000000','팀 전원 진행현황, 앞으로의 계획 공유 ','DONE',3600,'임원회의',0,23,59),(80,'2023-01-17 19:00:00.000000','2023-01-17 10:00:00.000000','2023-01-17 11:00:00.000000','모닝커피와 함께하는 아침회의 ','DONE',3600,'업무보고',NULL,23,59),(81,'2023-01-18 19:00:00.000000','2023-01-18 10:00:00.000000','2023-01-18 11:00:00.000000','팀 전원 진행현황, 앞으로의 계획 공유 ','DONE',3600,'조간회의',NULL,23,59),(82,'2023-01-19 19:00:00.000000','2023-01-19 10:00:00.000000','2023-01-19 11:00:00.000000','모닝커피와 함께하는 아침회의 ','DONE',3600,'업무보고',NULL,23,59),(83,'2023-01-20 19:00:00.000000','2023-01-20 10:00:00.000000','2023-01-20 11:00:00.000000','팀 전원 진행현황, 앞으로의 계획 공유 ','DONE',3600,'스트레칭 데이',NULL,23,59),(84,'2023-01-23 19:00:00.000000','2023-01-23 10:00:00.000000','2023-01-23 11:00:00.000000','모닝커피와 함께하는 아침회의 ','DONE',3600,'업무보고',NULL,23,59),(85,'2023-01-24 19:00:00.000000','2023-01-24 10:00:00.000000','2023-01-24 11:00:00.000000','팀 전원 진행현황, 앞으로의 계획 공유 ','DONE',3600,'조간회의',NULL,23,59),(86,'2023-01-25 19:00:00.000000','2023-01-25 10:00:00.000000','2023-01-25 11:00:00.000000','모닝커피와 함께하는 아침회의 ','DONE',3600,'임원회의',NULL,23,59),(87,'2023-01-26 19:00:00.000000','2023-01-26 10:00:00.000000','2023-01-26 11:00:00.000000','팀 전원 진행현황, 앞으로의 계획 공유 ','DONE',3600,'업무보고',NULL,23,59),(88,'2023-01-27 19:00:00.000000','2023-01-27 10:00:00.000000','2023-01-27 11:00:00.000000','모닝커피와 함께하는 아침회의 ','DONE',3600,'스트레칭 데이',NULL,23,59),(89,'2023-01-30 19:00:00.000000','2023-01-30 10:00:00.000000','2023-01-30 11:00:00.000000','팀 전원 진행현황, 앞으로의 계획 공유 ','DONE',3600,'업무보고',NULL,23,59),(90,'2023-01-31 19:00:00.000000','2023-01-31 10:00:00.000000','2023-01-31 11:00:00.000000','모닝커피와 함께하는 아침회의 ','DONE',3600,'조간회의',NULL,23,59),(91,'2023-02-01 19:00:00.000000','2023-02-01 10:00:00.000000','2023-02-01 11:00:00.000000','팀 전원 진행현황, 앞으로의 계획 공유 ','DONE',3600,'임원회의',NULL,23,59),(92,'2023-02-02 19:00:00.000000','2023-02-02 10:00:00.000000','2023-02-02 11:00:00.000000','모닝커피와 함께하는 아침회의 ','DONE',3600,'조간회의',NULL,23,59),(93,'2023-02-03 19:00:00.000000','2023-02-03 10:00:00.000000','2023-02-03 11:00:00.000000','팀 전원 진행현황, 앞으로의 계획 공유 ','DONE',3600,'스트레칭 데이',NULL,23,59),(94,'2023-02-06 19:00:00.000000','2023-02-06 10:00:00.000000','2023-02-06 11:00:00.000000','모닝커피와 함께하는 아침회의 ','DONE',3600,'임원회의',NULL,23,59),(95,'2023-02-07 19:00:00.000000','2023-02-07 10:00:00.000000','2023-02-07 11:00:00.000000','팀 전원 진행현황, 앞으로의 계획 공유 ','DONE',3600,'업무보고',NULL,23,59),(96,'2023-02-08 19:00:00.000000','2023-02-08 10:00:00.000000','2023-02-08 11:00:00.000000','모닝커피와 함께하는 아침회의 ','DONE',3600,'조간회의',NULL,23,59),(97,'2023-02-09 19:00:00.000000','2023-02-09 10:00:00.000000','2023-02-09 11:00:00.000000','팀 전원 진행현황, 앞으로의 계획 공유 ','DONE',3600,'업무보고',NULL,23,59),(98,'2023-02-10 19:00:00.000000','2023-02-10 10:00:00.000000','2023-02-10 11:00:00.000000','모닝커피와 함께하는 아침회의 ','DONE',3600,'업무보고',NULL,23,59),(99,'2023-02-13 19:00:00.000000','2023-02-13 10:00:00.000000','2023-02-13 11:00:00.000000','팀 전원 진행현황, 앞으로의 계획 공유 ','DONE',3600,'스트레칭 데이',NULL,23,59),(100,'2023-02-14 19:00:00.000000','2023-02-14 10:00:00.000000','2023-02-14 11:00:00.000000','모닝커피와 함께하는 아침회의 ','DONE',3600,'업무보고',NULL,23,59),(101,'2023-02-15 19:00:00.000000','2023-02-15 10:00:00.000000','2023-02-15 11:00:00.000000','팀 전원 진행현황, 앞으로의 계획 공유 ','DONE',3600,'조간회의',NULL,23,59),(102,'2023-02-16 19:00:00.000000','2023-02-16 10:00:00.000000','2023-02-16 17:45:19.861738','모닝커피와 함께하는 아침회의 ','DONE',3600,'임원회의',0,23,59),(103,'2023-02-18 18:00:00.000000','2023-02-16 13:06:57.897791','2023-02-16 13:07:43.027804','111','DONE',10800,'111',0,5,16),(104,'2023-02-18 18:00:00.000000','2023-02-16 13:07:07.000176','2023-02-16 13:08:04.789694','222','DONE',10800,'222',0,5,17),(106,'2023-02-18 18:00:00.000000','2023-02-16 13:07:25.457683','2023-02-16 13:08:18.710914','444','DONE',7200,'444',0,5,17),(111,'2023-01-16 18:30:00.196000','2023-01-16 08:36:54.000000','2023-01-16 18:30:00.196000','1강 녹화,편집','DONE',10800,'1강 녹화,편집',0,23,61),(114,'2023-01-15 20:30:00.000000','2023-01-15 09:30:00.000000','2023-01-15 20:30:00.000000','강의 목차 만들고, 전체적인 커리큘럼 기획하기','DONE',10800,'강의 기획하기',0,23,61),(115,'2023-01-17 13:36:54.000000','2023-01-17 13:36:54.000000','2023-01-17 13:36:54.000000','2강 녹화,편집','DONE',10800,'2강 녹화,편집',NULL,23,61),(116,'2023-01-18 13:36:54.000000','2023-01-18 13:36:54.000000','2023-01-18 13:36:54.000000','3강 녹화,편집','DONE',10800,'3강 녹화,편집',NULL,23,61),(117,'2023-01-19 13:36:54.000000','2023-01-19 13:36:54.000000','2023-01-19 13:36:54.000000','4강 녹화,편집','DONE',10800,'4강 녹화,편집',NULL,23,61),(118,'2023-01-23 13:36:54.000000','2023-01-23 13:36:54.000000','2023-01-23 13:36:54.000000','질문글에 답 달기','DONE',10800,'질문글에 답 달기',NULL,23,61),(119,'2023-01-24 13:36:54.000000','2023-01-24 13:36:54.000000','2023-01-25 13:36:54.000000','5강 녹화,편집','DONE',10800,'5강 녹화,편집',NULL,23,61),(120,'2023-01-25 13:36:54.000000','2023-01-25 13:36:54.000000','2023-01-25 13:36:54.000000','6강 녹화,편집','DONE',10800,'6강 녹화,편집',NULL,23,61),(121,'2023-01-26 13:36:54.000000','2023-01-26 13:36:54.000000','2023-01-26 13:36:54.000000','7강 녹화,편집','DONE',10800,'7강 녹화,편집',NULL,23,61),(122,'2023-01-27 13:36:54.000000','2023-01-27 13:36:54.000000','2023-01-26 13:36:54.000000','8강 녹화,편집','DONE',10800,'8강 녹화,편집',NULL,23,61),(123,'2023-01-31 13:36:54.000000','2023-01-31 13:36:54.000000','2023-02-01 13:36:54.000000','질문글에 답 달기','DONE',10800,'질문글에 답 달기',NULL,23,61),(124,'2023-02-01 13:36:54.000000','2023-02-01 13:36:54.000000','2023-02-01 13:36:54.000000','9강 녹화,편집','DONE',10800,'9강 녹화,편집',NULL,23,61),(125,'2023-02-02 13:36:54.000000','2023-02-02 13:36:54.000000','2023-02-03 13:36:54.000000','10강 녹화,편집','DONE',10800,'10강 녹화,편집',NULL,23,61),(126,'2023-02-07 13:36:54.000000','2023-02-07 13:36:54.000000','2023-02-07 13:36:54.000000','11강 녹화,편집','DONE',10800,'11강 녹화,편집',NULL,23,61),(127,'2023-02-08 13:36:54.000000','2023-02-08 13:36:54.000000','2023-02-08 13:36:54.000000','12강 녹화,편집','DONE',10800,'12강 녹화,편집',NULL,23,61),(128,'2023-02-09 13:36:54.000000','2023-02-09 13:36:54.000000','2023-02-09 13:36:54.000000','질문글에 답 달기','DONE',10800,'질문글에 답 달기',NULL,23,61),(129,'2023-02-13 13:36:54.000000','2023-02-13 13:36:54.000000','2023-02-13 13:36:54.000000','11강 보충 내용 녹화,편집','DONE',10800,'11강 보충 내용 녹화,편집',NULL,23,61),(130,'2023-02-14 13:36:54.000000','2023-02-14 13:36:54.000000','2023-02-14 13:36:54.000000','13강 녹화,편집','DONE',10800,'13강 녹화,편집',NULL,23,61),(131,'2023-02-15 13:36:54.000000','2023-02-15 13:36:54.000000','2023-02-15 13:36:54.000000','14강 녹화,편집','DONE',10800,'14강 녹화,편집',NULL,23,61),(132,'2023-01-02 22:00:00.000000','2023-01-02 08:32:00.000000','2023-01-02 21:48:00.000000','퇴근 후 자전거로 3건 배달하기','DONE',3600,'배민커넥트 알바하기',0,23,62),(133,'2023-01-03 22:00:00.000000','2023-01-03 08:32:00.000000','2023-01-03 21:53:00.000000','퇴근 후 자전거로 3건 배달하기','DONE',3600,'배민커넥트 알바하기',0,23,62),(134,'2023-01-04 22:00:00.000000','2023-01-04 08:32:00.000000','2023-01-04 21:23:00.000000','퇴근 후 자전거로 3건 배달하기','DONE',3600,'배민커넥트 알바하기',0,23,62),(135,'2023-01-09 22:00:00.000000','2023-01-09 08:32:00.000000','2023-01-09 21:56:00.000000','퇴근 후 자전거로 3건 배달하기','DONE',3600,'배민커넥트 알바하기',0,23,62),(136,'2023-01-11 22:00:00.000000','2023-01-11 08:32:00.000000','2023-01-11 21:23:00.000000','퇴근 후 자전거로 3건 배달하기','DONE',3600,'배민커넥트 알바하기',0,23,62),(137,'2023-01-13 22:00:00.000000','2023-01-13 08:32:00.000000','2023-01-13 21:55:00.000000','퇴근 후 자전거로 3건 배달하기','DONE',3600,'배민커넥트 알바하기',0,23,62),(138,'2023-01-16 22:00:00.000000','2023-01-16 08:29:00.000000','2023-01-16 21:47:00.000000','퇴근 후 자전거로 3건 배달하기','DONE',3600,'배민커넥트 알바하기',0,23,62),(139,'2023-01-18 22:00:00.000000','2023-01-18 08:23:00.000000','2023-01-18 21:43:00.000000','퇴근 후 자전거로 3건 배달하기','DONE',3600,'배민커넥트 알바하기',0,23,62),(140,'2023-01-20 22:00:00.000000','2023-01-20 08:29:00.000000','2023-01-20 21:40:00.000000','퇴근 후 자전거로 3건 배달하기','DONE',3600,'배민커넥트 알바하기',0,23,62),(141,'2023-01-23 22:00:00.000000','2023-01-23 08:29:00.000000','2023-01-23 21:47:00.000000','퇴근 후 자전거로 3건 배달하기','DONE',3600,'배민커넥트 알바하기',0,23,62),(142,'2023-01-25 22:00:00.000000','2023-01-25 08:29:00.000000','2023-01-25 21:40:00.000000','퇴근 후 자전거로 3건 배달하기','DONE',3600,'배민커넥트 알바하기',0,23,62),(143,'2023-01-27 22:00:00.000000','2023-01-27 08:29:00.000000','2023-01-27 21:51:00.000000','퇴근 후 자전거로 3건 배달하기','DONE',3600,'배민커넥트 알바하기',0,23,62),(146,'2023-02-16 17:45:10.133741','2023-02-16 16:46:33.526427','2023-02-16 17:45:10.133741','강의 수익 정산','DONE',0,'정산받기',0,23,61),(149,'2023-01-30 22:00:00.000000','2023-01-30 08:29:00.000000','2023-01-30 21:51:00.000000','퇴근 후 자전거로 3건 배달하기','DONE',3600,'배민커넥트 알바하기',0,23,62),(150,'2023-02-01 22:00:00.000000','2023-02-01 08:29:00.000000','2023-02-01 21:51:00.000000','퇴근 후 자전거로 3건 배달하기','DONE',3600,'배민커넥트 알바하기',0,23,62),(151,'2023-02-03 22:00:00.000000','2023-02-03 08:29:00.000000','2023-02-03 21:51:00.000000','퇴근 후 자전거로 3건 배달하기','DONE',3600,'배민커넥트 알바하기',0,23,62),(152,'2023-02-06 22:00:00.000000','2023-02-06 08:29:00.000000','2023-02-06 21:51:00.000000','퇴근 후 자전거로 3건 배달하기','DONE',3600,'배민커넥트 알바하기',0,23,62),(153,'2023-02-08 22:00:00.000000','2023-02-08 08:29:00.000000','2023-02-08 21:51:00.000000','퇴근 후 자전거로 3건 배달하기','DONE',3600,'배민커넥트 알바하기',0,23,62),(154,'2023-02-10 22:00:00.000000','2023-02-10 08:29:00.000000','2023-02-10 21:51:00.000000','퇴근 후 자전거로 3건 배달하기','DONE',3600,'배민커넥트 알바하기',0,23,62),(155,'2023-02-13 22:00:00.000000','2023-02-13 08:29:00.000000','2023-02-13 21:51:00.000000','퇴근 후 자전거로 3건 배달하기','DONE',3600,'배민커넥트 알바하기',0,23,62),(156,'2023-02-15 22:00:00.000000','2023-02-15 08:29:00.000000','2023-02-15 21:51:00.000000','퇴근 후 자전거로 3건 배달하기','DONE',3600,'배민커넥트 알바하기',0,23,62);
/*!40000 ALTER TABLE `past_work` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posture`
--

DROP TABLE IF EXISTS `posture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posture` (
  `posture_id` bigint NOT NULL AUTO_INCREMENT,
  `c_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_created` datetime(6) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`posture_id`),
  KEY `FKo07l9qbn7kcif9sf4wo6qs5ov` (`user_id`),
  CONSTRAINT `FKo07l9qbn7kcif9sf4wo6qs5ov` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posture`
--

LOCK TABLES `posture` WRITE;
/*!40000 ALTER TABLE `posture` DISABLE KEYS */;
INSERT INTO `posture` VALUES (1,'tilted','2023-02-14 11:18:13.475245',3),(2,'tilted','2023-02-14 12:37:52.121716',3),(3,'tilted','2023-02-14 12:42:06.081014',3),(4,'tilted','2023-02-14 12:42:19.770494',3),(5,'tilted','2023-02-14 12:42:43.247029',3),(6,'tilted','2023-02-14 12:42:57.309167',3),(7,'tilted','2023-02-14 12:43:12.577718',3),(8,'tilted','2023-02-14 12:44:18.026714',3),(9,'turtle','2023-02-14 12:51:45.254701',3),(10,'turtle','2023-02-14 12:52:43.202992',3),(11,'turtle','2023-02-14 12:53:32.580525',3),(12,'tilted','2023-02-14 13:03:24.851008',3),(13,'tilted','2023-02-14 13:03:36.241499',3),(14,'tilted','2023-02-14 13:03:47.850233',3),(15,'tilted','2023-02-14 13:04:20.677778',3),(16,'tilted','2023-02-14 13:04:31.674034',3),(17,'tilted','2023-02-14 13:04:42.990499',3),(18,'tilted','2023-02-14 13:04:54.555596',3),(19,'tilted','2023-02-14 13:05:07.598097',3),(20,'tilted','2023-02-14 13:05:19.757547',3),(21,'tilted','2023-02-14 13:05:32.251151',3),(22,'tilted','2023-02-14 13:05:46.645190',3),(23,'tilted','2023-02-14 21:15:45.646200',5),(24,'tilted','2023-02-15 09:35:33.789317',5),(25,'tilted','2023-02-15 09:38:22.667111',5),(26,'tilted','2023-02-15 17:16:29.119867',3),(27,'tilted','2023-02-15 17:18:46.978201',3),(28,'tilted','2023-02-15 17:21:08.886816',3),(29,'tilted','2023-02-17 08:46:19.269487',23),(30,'tilted','2023-02-17 08:55:45.375048',23),(31,'tilted','2023-02-17 09:05:55.301620',23);
/*!40000 ALTER TABLE `posture` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refresh_token`
--

DROP TABLE IF EXISTS `refresh_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refresh_token` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `refresh_token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refresh_token`
--

LOCK TABLES `refresh_token` WRITE;
/*!40000 ALTER TABLE `refresh_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `refresh_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stretch`
--

DROP TABLE IF EXISTS `stretch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stretch` (
  `stretch_id` bigint NOT NULL AUTO_INCREMENT,
  `date_created` datetime(6) NOT NULL,
  `is_finished` tinyint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`stretch_id`),
  KEY `FK4ky0miw2t6mb2ikxyyfes1l1n` (`user_id`),
  CONSTRAINT `FK4ky0miw2t6mb2ikxyyfes1l1n` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stretch`
--

LOCK TABLES `stretch` WRITE;
/*!40000 ALTER TABLE `stretch` DISABLE KEYS */;
/*!40000 ALTER TABLE `stretch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `date_registered` datetime(6) DEFAULT NULL,
  `deleted` tinyint NOT NULL,
  `nickname` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `provider` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `roles` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stretching_interval_min` int NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'2023-02-14 09:24:42.046954',0,'Irang Nam','$2a$10$MUSgPELjf8nQROxmLsV87eni4Uslbg19mfduXobB8N2NLBBaII1l6','google','ROLE_USER',50,'rangmeanswave@gmail.com'),(2,'2023-02-14 09:27:55.367220',0,'test','$2a$10$ZFDijBbo.VhPR0RCi1Ej6O8d4x7Bq5zmmKasGG50htN5Cy0gmv0/i',NULL,'ROLE_USER',50,'test@test.com'),(3,'2023-02-14 09:39:12.633139',0,'어무해','$2a$10$GfidbbcvCwsV5Fhujx2Zau9SE/SAu/zQOfm44ar..pohajboDMNNe',NULL,'ROLE_USER',50,'django@django.py'),(4,'2023-02-14 09:39:28.083808',0,'감자기야','$2a$10$FyQyHFiLsPZRBaa9tjLPounf3Rj0O1KYIeGu0LcNEfUxLt8aD1W6.',NULL,'ROLE_USER',50,'gamja@gamja.com'),(5,'2023-02-14 10:19:59.007638',0,'조하니','$2a$10$U4erESz5JpsNpjOBzGrLI.8144J4ekfW7QlvjQoGGma153etg1yiK',NULL,'ROLE_USER',50,'haandeng@naver.com'),(6,'2023-02-14 10:57:25.619675',0,'고구마','$2a$10$sQQ5ALrro2u69OVZz0r2I.i4oQupn7b0fwIP7p9p5iBcetmsaSnZy',NULL,'ROLE_USER',50,'sweetpotato@naver.com'),(7,'2023-02-14 13:29:26.031175',0,'Simon','$2a$10$QnCCXCJpQh12pLgvWMksHufUMg5kkcRHT/54xr4ArW5aZBzB3fQBu',NULL,'ROLE_USER',50,'mstkang@gmail.com'),(8,'2023-02-14 14:52:22.911374',0,'신슬기','$2a$10$CxPHwXMf5zqTrKrVkPXTk.PTEtUV5c88kTOId6UufqUgfOcavVrma','google','ROLE_USER',50,'newseul34@gmail.com'),(9,'2023-02-14 15:59:10.948098',0,'[서울_2반_조한이]','$2a$10$2sMQthlyAvSJ8I28PNRzlu3QXYRYp4c/NW04UBjRjnt3HUMM.Sybi','google','ROLE_USER',50,'haandeng@gmail.com'),(10,'2023-02-14 16:07:12.239785',0,'dja','$2a$10$8ib8LZ8xtKxauNVa3lWfGexpruTH73ojpXtEnLVLj2ktARAYbx0RO',NULL,'ROLE_USER',50,'django@django.pya'),(11,'2023-02-14 16:25:02.194922',0,'한기현','$2a$10$L.VFN1IsIExim7nJz4cd9uLszV/0FMwE2WcJHhxteTIEgmCKeGB0K','google','ROLE_USER',50,'hgh21233@gmail.com'),(12,'2023-02-14 16:47:00.111309',0,'asdf1','$2a$10$zur7nEWKPZCbquUscnGiRujphJdA9G930VH0MbFfnK3zHZaP3YskG',NULL,'ROLE_USER',50,'asdf1234@asd.com'),(13,'2023-02-14 16:47:32.675349',0,'asdf','$2a$10$G1/oRnPCK5044/LDsOC5He279kRQ5RWG0eq718X0SsbPMdq/vWTX2',NULL,'ROLE_USER',50,'dj@asf.co'),(14,'2023-02-14 16:47:58.458940',0,'asdf','$2a$10$rYPFBbyzrzh/x2xp6z8W..Q7af6J02gGYABl.z.hX8hN6e0lkqlz6',NULL,'ROLE_USER',50,'asdf1@asdf.com'),(15,'2023-02-14 16:58:26.434629',0,'asdf','$2a$10$p4ynrC0dJlBVG97yn4pgBu25d6QL9ePFbncwSRxJc14eSFleYtlfe',NULL,'ROLE_USER',50,'asd@asd.co'),(16,'2023-02-14 16:59:09.752220',0,'asdf123','$2a$10$4ZL2N/tH5t.XAMT0aPg2se5/AfCxm0ELWXxU.uOjHHd8PP7seWYL2',NULL,'ROLE_USER',50,'asdf1@asdf.co'),(17,'2023-02-14 17:04:50.646914',0,'조라니','$2a$10$sc4DE2hLzW1oZQU6zkK.Putxw/0mrWygKAPgGR.yLlkrW1.WJNQVm',NULL,'ROLE_USER',50,'haaandeng@naver.com'),(18,'2023-02-14 17:07:50.046198',0,'as','$2a$10$./e5KroafwMEGzb2ePBbveLLx/aaA1bGkbCPTNNX13oD/cvkRIHUm',NULL,'ROLE_USER',50,'asdf@asdgas.co'),(19,'2023-02-14 17:44:16.358130',0,'나양준모이올시다','$2a$10$PhB47rko.TqTPDj6ySEpX.JlqONeImVHIS6N6iD2b09FYOkc8HdV.',NULL,'ROLE_USER',50,'yangjunmo@gmail.com'),(20,'2023-02-15 12:40:45.993996',0,'[실습코치] 황승주','$2a$10$3DVAAqoODaBKoPQBbZUZv.MeE/qEhD2VUJzrLCA3Kn5iPBJhggsOy','google','ROLE_USER',50,'platinadark@gmail.com'),(21,'2023-02-15 17:32:25.965767',0,'테스트','$2a$10$/SWhHbXlhjnXo9fa8zzQ1O1ooYdPsz1nJsOz1m8iKRbJBNzooA5t6',NULL,'ROLE_USER',50,'test@naver.com'),(22,'2023-02-15 20:18:46.091232',0,'Junmo Yang','$2a$10$3UHYnjAYq24fkIuS2WWfAOrFpDGU.D3UlmrqJW5yDlOqzQ5JM3Xia','google','ROLE_USER',50,'devjunmo@gmail.com'),(23,'2023-02-16 10:18:18.926642',0,'한기현','$2a$10$a.OP5xzuc.dIUN79M8/sC.EKmo0mR16uVwGo6H2GMvnJLYFvN/fHG','google','ROLE_USER',50,'bongpalpark981@gmail.com'),(24,'2023-02-16 13:07:13.410801',0,'deletedUser','$2a$10$EMMapd66s4.vz2U5W.eIe.OrAE0rJgP1y5nXbMq3G5n0gTUXH2BhO',NULL,'ROLE_USER',50,'ajkdlfjwjerljfdlkjflajw;oiejfodjfwh'),(25,'2023-02-16 13:12:23.515656',0,'내가진짜양준모','$2a$10$cs7.i6OJJgPonFMuorFATemgFyFncBCOBlLEZsNZc1DUyViv9Zd42',NULL,'ROLE_USER',50,'devjunmo@ruu.kr'),(26,'2023-02-16 13:48:04.138068',0,'양준모','$2a$10$XZtQ22GtsHo.wKcGwuutoeoopOYiGbt4z.uth/KaOjSozOzqLS9Fm',NULL,'ROLE_USER',50,'cxzlkjhgfdsa@naver.com'),(27,'2023-02-16 14:01:01.162225',0,'강윤주[서울_7반_A701]팀원','$2a$10$sDTwNl13b9k95dD7ZymmJeEkc0tPh1xehWCQmYE4/vn.3SHsqiEWe','google','ROLE_USER',50,'jjjoody799@gmail.com'),(28,'2023-02-16 15:30:51.622479',0,'juyeon','$2a$10$8KFbB9PFh82tmKNhnoCnjurAN9E0BHDD99qtiCPpU.RDz/pR7.tm2',NULL,'ROLE_USER',50,'juyeon@gmail.com'),(29,'2023-02-16 17:07:26.979466',0,'abcde','$2a$10$OsqSBYHKlLj15C/FQSkJ0OsZqDzIP60jAAVS8PcpC4Pv3P/cYoxiO',NULL,'ROLE_USER',50,'aa@dfdf.com'),(30,'2023-02-16 17:55:07.257023',0,'Hs S','$2a$10$yOcLYXzQThxe3T1VHvBwvuZOpe1AMx9CcTYTisKfq20MfJf8V0WGi','google','ROLE_USER',50,'test202110071402@gmail.com'),(31,'2023-02-17 08:50:48.389124',0,'아놔 이자식아','$2a$10$pITlxLQIeA8CkRnZtPLLuuO/QU5xy3X9qTtE4ZR7B5eOAML1ZqV9q',NULL,'ROLE_USER',50,'fucking2rang@naver.com'),(32,'2023-02-17 09:20:08.274599',0,'윤서용[서울_2반_A105]','$2a$10$XWI6XSfsSO5c9jA5wwvmTu/67uWRWGtRQ7RXM2au2312rzy3HLqwm','google','ROLE_USER',50,'swqq31@gmail.com');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `work`
--

DROP TABLE IF EXISTS `work`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `work` (
  `work_id` bigint NOT NULL AUTO_INCREMENT,
  `date_aimed` datetime(6) DEFAULT NULL,
  `date_created` datetime(6) DEFAULT NULL,
  `date_finished` datetime(6) DEFAULT NULL,
  `description` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `time_aimed` bigint DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `work_order` int DEFAULT NULL,
  `user_id` bigint NOT NULL,
  `work_cate_id` bigint NOT NULL,
  PRIMARY KEY (`work_id`),
  KEY `FKdvq5s0o0fqpnbyeffg1nf9831` (`user_id`),
  KEY `FKry16jwgs0sg86087qnb5gkxh7` (`work_cate_id`),
  CONSTRAINT `FKdvq5s0o0fqpnbyeffg1nf9831` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `FKry16jwgs0sg86087qnb5gkxh7` FOREIGN KEY (`work_cate_id`) REFERENCES `work_category` (`work_cate_id`)
) ENGINE=InnoDB AUTO_INCREMENT=173 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work`
--

LOCK TABLES `work` WRITE;
/*!40000 ALTER TABLE `work` DISABLE KEYS */;
INSERT INTO `work` VALUES (3,'2023-02-16 18:00:00.000000','2023-02-14 09:43:14.058592',NULL,'할 일 입ㄴ디ㅏ.','TODO',43200,'PPT 제작 1',0,3,9),(4,'2023-02-16 18:00:00.000000','2023-02-14 09:43:31.724404',NULL,'진짜 좋음','TODO',43200,'PPT는 좋은 틀입니다.',0,3,9),(5,'2023-02-15 18:00:00.000000','2023-02-14 09:43:53.913138',NULL,'자료 정리는 힘들어요','TODO',43200,'PPT 자료 정리',0,3,9),(8,'2023-02-21 18:00:00.000000','2023-02-14 09:44:57.248323',NULL,'진짜임','TODO',3600,'토이는 가수다.',0,3,10),(9,'2023-03-09 18:00:00.000000','2023-02-14 09:45:17.496779',NULL,'외우는게 싫다.','TODO',442800,'CS는 어렵다.',0,3,11),(10,'2023-03-10 18:00:00.000000','2023-02-14 09:45:28.212158',NULL,'난 외우는게 제일 싫어','TODO',442800,'단어 암기',0,3,12),(11,'2023-02-25 18:00:00.000000','2023-02-14 09:45:50.565052',NULL,'안그러면 쓰러져','TODO',442800,'토요일은 쉬자',0,3,13),(12,'2023-02-28 18:00:00.000000','2023-02-14 09:46:13.625523',NULL,'고양이보러 친구집 가야지','TODO',1155600,'월간 고양이',0,3,14),(20,'2023-02-18 18:00:00.000000','2023-02-14 11:03:09.765137',NULL,'Given a string containing digits from 2Given a string containing digits from 2-9 inclusive, return all possible letter -9 inclusive, return all possible letter Given a string containing digits from 2-9 inclusive, return all possible letter ','TODO',3600,'17. Letter Combinations of a Phone Number',0,6,20),(23,NULL,'2023-02-14 14:31:01.487918',NULL,'','TODO',0,'',0,7,26),(24,NULL,'2023-02-14 14:31:03.813287',NULL,'','TODO',0,'',0,7,24),(26,NULL,'2023-02-14 14:33:28.987585',NULL,'','TODO',0,'',0,7,24),(27,NULL,'2023-02-14 14:33:34.116143',NULL,'','TODO',0,'',0,7,24),(28,NULL,'2023-02-14 14:33:54.082340',NULL,'','TODO',0,'제목',0,7,24),(29,NULL,'2023-02-14 14:34:05.134551',NULL,'상세','TODO',0,'제목',0,7,24),(30,'2023-02-18 18:00:00.000000','2023-02-14 14:34:17.268527',NULL,'상세','TODO',36000,'제목',0,7,25),(31,NULL,'2023-02-14 14:34:48.027573',NULL,'상세','TODO',0,'제목',0,7,26),(32,'2023-02-24 18:00:00.000000','2023-02-14 14:36:11.494491',NULL,'상세','TODO',0,'제목',0,7,24),(35,NULL,'2023-02-14 16:53:46.899940',NULL,'','TODO',7200,'오징어 사냥',0,4,15),(37,NULL,'2023-02-14 20:07:24.494719',NULL,'발표때 쓸 영상 - <br/> ','TODO',0,'영상 만들기',0,6,47),(45,'2023-02-15 18:00:00.000000','2023-02-15 12:41:40.884620',NULL,'','TODO',14400,'응원하기',0,20,49),(47,NULL,'2023-02-15 13:43:40.121378',NULL,'먹고싶다','TODO',7200,'광어 ',0,4,42),(52,NULL,'2023-02-15 20:25:36.600692',NULL,'대지기싫으면','TODO',0,'여기 회원탈퇴 만들어라',0,22,57),(107,'2023-02-17 18:00:00.000000','2023-02-16 13:09:42.977786',NULL,'씨에쓰에쓰 조아요','TODO',28800,'css styling',0,3,9),(108,'2023-02-17 18:00:00.000000','2023-02-16 13:10:10.164227',NULL,'BOJ 1927','TODO',3600,'BOJ 1927',0,3,51),(109,'2023-02-17 18:00:00.000000','2023-02-16 13:10:23.530599',NULL,'BOJ 3102','TODO',3600,'BOJ 3102',0,3,51),(110,NULL,'2023-02-16 14:01:42.060639',NULL,'sadf','TODO',0,'aa',0,27,69),(145,'2023-02-17 18:00:00.000000','2023-02-16 15:46:42.611926',NULL,'공통 프로젝트 라이브 시연','TODO',14400,'공통 프로젝트 시연회',0,3,72),(148,'2023-02-18 18:00:00.000000','2023-02-16 17:03:09.410679',NULL,'ㄱㄱ','TODO',7200,'ㄱㄱ1',0,5,18),(157,'2023-02-17 18:00:00.000000','2023-02-16 17:53:04.245566','2023-02-17 09:32:27.276926','피피티는 재밌어\n피피티는 행복해\n피피티는 즐거워\n피피티는 ...','DONE',14400,'PPT 제작 1',0,23,71),(158,'2023-02-17 18:00:00.000000','2023-02-16 17:53:20.672438',NULL,'피피티 즐거웡','TODO',18000,'PPT 제작 2',0,23,71),(159,'2023-02-17 18:00:00.000000','2023-02-16 17:53:48.308619',NULL,'산본동 최고\n멀지만 살기 좋아요\n5시에 일어나서 지하철을 타면 앉아갈 수 있어요','TODO',7200,'따릉이 7 to 9',0,23,62),(160,'2023-02-18 18:00:00.000000','2023-02-16 17:55:11.119245',NULL,'새벽 오전 하차\n열심히 일해서 서울에 집 사야지!!!\n티끌모아 태산','TODO',18000,'택배 상하차',0,23,59),(161,'2023-02-17 18:00:00.000000','2023-02-16 17:55:33.645912','2023-02-17 09:32:43.429813','컨설턴트님 사랑해요 ★\n서울 1반 여러분 진짜 너무너무 고생하셨어요\n끝까지 공통프로젝트 잘 마무리하고 유종의 미를 거둡시다!!\n','DONE',7200,'배포 홈 페이지 테스트',0,23,76),(162,'2023-02-17 18:00:00.000000','2023-02-16 17:56:04.045510',NULL,'백준 골드 이상\n거의 다 됐다!!!!!!!\n순조부, DFS/BFS 더 연습하기','TODO',7200,'일일 알고리즘',0,23,77),(163,'2023-02-25 18:00:00.000000','2023-02-16 17:56:55.191813',NULL,'강남역 토즈 2호점 취업 스터디\n숙제 : 면접 질문 10개 뽑아가기, 질문에 대한 답 준비해가기, 면접 정장 준비하기, 다른분들 피드백 해드리기\n','TODO',28800,'면접 스터디',0,23,60),(164,'2023-02-26 18:00:00.000000','2023-02-16 17:57:25.191789','2023-02-17 09:40:02.788219','땡땡 기업 자소서 스터디\n숙제 : 목표기업 자소서 질문 10개 뽑아가기, 질문에 대한 답 준비해가기, 자소서 수정하기, 다른분들 피드백 해드리기','DONE',21600,'자소서 스터디',0,23,60),(165,'2023-03-11 18:00:00.000000','2023-02-16 17:58:20.881849',NULL,'토익 / 토스 / 오픽 취득\n더이상 오픽 NotHuman은 없다!!! IH로 거듭날 나!!!!','TODO',28800,'영어 성적 취득',0,23,60),(166,'2023-02-17 18:00:00.000000','2023-02-16 17:58:49.785357',NULL,'열심히 준비해서 코치님께 피드백 받기,\n피드백 내용 기반으로 수정하고 다시 짜기','TODO',21600,'발표 준비 1',0,23,71),(167,'2023-02-17 18:00:00.000000','2023-02-16 17:59:09.558520',NULL,'열심히 피드백 받기 2,\n1에서 받은 피드백으로 수정해서 다시 피드백받기\n그렇게해서 받은 피드백으로 진짜 최종 발표로 가자!!','TODO',18000,'발표 준비 2',0,23,71),(168,'2023-02-17 18:00:00.000000','2023-02-16 17:59:46.996762',NULL,'API가 잘 갑니다!! \n이정도면 처음 구상한 것보다 잘 나왔네요\n우리모두 고생했다!!!','TODO',3600,'배포 백 테스트',0,23,76),(169,'2023-02-19 18:00:00.000000','2023-02-16 18:00:02.975925',NULL,'플래티넘 이상\n언젠간 갈 수 있겠지?\n더 높이 가줄게~ 내가 바랐던 세계 제일 위에~ 떨어져도 돼~~ I\'m antifragile antifragile','TODO',14400,'주간 알고리즘',0,23,78),(170,'2023-02-28 18:00:00.000000','2023-02-16 18:00:17.394676',NULL,'다이아 이상\n백준 다이아 이하 채팅 금지란다... 채팅하려면 다이아 따야겠다...','TODO',43200,'월간 알고리즘',0,23,79),(171,'2023-12-31 18:00:00.000000','2023-02-16 18:00:34.941823',NULL,'백준 사이트에서\n루비 이상으로 올라가기\n가보자!!!\n이거 루비까지 올라가면 위에 등급 더 없나? ㅎㅎ','TODO',36000,'연간 알고리즘',0,23,80),(172,NULL,'2023-02-17 08:51:50.790437','2023-02-17 08:52:43.523306','가만히있기','DONE',14400,'날먹',0,31,84);
/*!40000 ALTER TABLE `work` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `work_category`
--

DROP TABLE IF EXISTS `work_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `work_category` (
  `work_cate_id` bigint NOT NULL AUTO_INCREMENT,
  `cate_color` int NOT NULL,
  `cate_icon` int NOT NULL,
  `cate_name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cate_order` int NOT NULL,
  `work_cate_status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`work_cate_id`),
  KEY `FKdysham7dhm4e1j134sbm5m5wv` (`user_id`),
  CONSTRAINT `FKdysham7dhm4e1j134sbm5m5wv` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work_category`
--

LOCK TABLES `work_category` WRITE;
/*!40000 ALTER TABLE `work_category` DISABLE KEYS */;
INSERT INTO `work_category` VALUES (1,0,0,'기본',0,'VALID',1),(2,3,8,'공통',0,'VALID',1),(3,5,10,'건강',0,'VALID',1),(4,0,0,'기본',0,'VALID',2),(5,0,0,'기본',0,'DELETED',3),(6,5,8,'구황 작물',0,'VALID',4),(7,3,9,'asdf',0,'DELETED',3),(8,6,6,'12asd',0,'DELETED',3),(9,1,4,'공통 프로젝트',0,'VALID',3),(10,2,1,'토이 프로젝트',0,'VALID',3),(11,3,3,'스터디 관련',0,'VALID',3),(12,4,10,'영어 공부',0,'VALID',3),(13,5,6,'주간 업무',0,'VALID',3),(14,6,8,'월간 업무',0,'VALID',3),(15,4,5,'오징어',0,'VALID',4),(16,4,9,'공통프로젝트',0,'VALID',5),(17,6,8,'특화프로젝트',0,'VALID',5),(18,3,9,'자율프로젝트',0,'VALID',5),(19,0,0,'기본',0,'VALID',6),(20,4,9,'알고리즘',0,'VALID',6),(21,0,0,'기본',0,'DELETED',7),(22,3,1,'교육생관리',0,'DELETED',7),(23,5,4,'카테고리생성',0,'DELETED',7),(24,6,4,'타이틀테스트',0,'VALID',7),(25,6,3,'프로젝트 QA',0,'VALID',7),(26,6,3,'타이틀테스트',0,'VALID',7),(27,3,6,'프로젝트 테스트-5팀',0,'VALID',7),(28,1,10,'ㅇ',0,'DELETED',5),(29,3,8,'ㅇㅇㅇ',0,'DELETED',5),(30,0,7,'기본',0,'VALID',8),(31,0,0,'기본',0,'VALID',9),(32,0,0,'기본',0,'VALID',10),(33,4,6,'특화',0,'VALID',1),(34,0,0,'기본',0,'VALID',11),(35,0,0,'test',0,'DELETED',4),(36,0,0,'기본',0,'VALID',12),(37,0,0,'기본',0,'VALID',13),(38,0,0,'기본',0,'VALID',14),(39,0,0,'기본',0,'VALID',15),(40,0,0,'기본',0,'VALID',16),(41,0,0,'기본',0,'VALID',17),(42,1,4,'생선',0,'VALID',4),(43,0,0,'기본',0,'VALID',18),(44,0,0,'테스트',0,'DELETED',4),(45,6,0,'딸기',0,'DELETED',4),(46,0,0,'기본',0,'VALID',19),(47,5,6,'공통',0,'VALID',6),(48,0,0,'기본',0,'VALID',20),(49,6,0,'5팀 화이팅',0,'VALID',20),(50,5,10,'연간 업무',0,'VALID',3),(51,4,9,'알고리즘',0,'VALID',3),(52,1,9,'플젝',0,'VALID',21),(53,6,8,'놀기',0,'VALID',21),(54,0,0,'기본',0,'VALID',22),(55,0,10,'ㅇㅅㅇ',0,'VALID',22),(56,0,10,'ㅇㅂㅇ 하위',0,'DELETED',22),(57,0,1,'공지',0,'VALID',22),(58,0,0,'기본',0,'DELETED',23),(59,1,2,'Work',0,'VALID',23),(60,2,4,'이직준비',0,'VALID',23),(61,3,1,'부수입-강의',0,'VALID',23),(62,4,3,'부수입-배민라이더',0,'VALID',23),(63,0,0,'기본',0,'VALID',24),(64,0,0,'기본',0,'VALID',25),(65,1,0,'미라클모닝',0,'VALID',25),(66,0,0,'기본',0,'VALID',26),(67,2,6,'존버',0,'VALID',26),(68,0,0,'기본',0,'VALID',27),(69,3,7,'xdvx',0,'VALID',27),(70,0,0,'기본',0,'VALID',28),(71,5,9,'공통 프로젝트',0,'VALID',23),(72,4,4,'공통 프로젝트 시연',0,'VALID',3),(73,0,8,'취업준비',0,'VALID',5),(74,1,4,'ㅇㅇ',0,'VALID',5),(75,0,0,'기본',0,'VALID',29),(76,6,8,'공통 프로젝트 시연',0,'VALID',23),(77,5,6,'일간 업무',0,'VALID',23),(78,4,4,'주간 업무',0,'VALID',23),(79,3,5,'월간 업무',0,'VALID',23),(80,2,1,'연간 업무',0,'VALID',23),(81,0,0,'기본',0,'VALID',30),(82,3,6,'?',0,'VALID',30),(83,0,0,'기본',0,'VALID',31),(84,4,6,'공통프로젝트',0,'VALID',31),(85,0,0,'기본',0,'VALID',32);
/*!40000 ALTER TABLE `work_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `work_period`
--

DROP TABLE IF EXISTS `work_period`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `work_period` (
  `work_period_id` bigint NOT NULL AUTO_INCREMENT,
  `end_time` datetime(6) NOT NULL,
  `start_time` datetime(6) NOT NULL,
  `past_work_id` bigint DEFAULT NULL,
  `user_id` bigint NOT NULL,
  `work_id` bigint DEFAULT NULL,
  PRIMARY KEY (`work_period_id`),
  KEY `FKjjjm01amsk9568sqes6tc1k3n` (`past_work_id`),
  KEY `FKa40i5yo6f8gr0o1sfx79j4n1y` (`user_id`),
  KEY `FKdlxgaxysoxicbatd7jbwea19l` (`work_id`),
  CONSTRAINT `FKa40i5yo6f8gr0o1sfx79j4n1y` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `FKdlxgaxysoxicbatd7jbwea19l` FOREIGN KEY (`work_id`) REFERENCES `work` (`work_id`) ON DELETE CASCADE,
  CONSTRAINT `FKjjjm01amsk9568sqes6tc1k3n` FOREIGN KEY (`past_work_id`) REFERENCES `past_work` (`past_work_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=323 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work_period`
--

LOCK TABLES `work_period` WRITE;
/*!40000 ALTER TABLE `work_period` DISABLE KEYS */;
INSERT INTO `work_period` VALUES (4,'2023-02-14 11:00:23.044000','2023-02-14 10:59:45.819000',19,6,NULL),(5,'2023-02-14 11:00:29.021000','2023-02-14 11:00:25.256000',19,6,NULL),(6,'2023-02-14 11:00:51.097000','2023-02-14 11:00:33.111000',19,6,NULL),(7,'2023-02-14 11:03:15.339000','2023-02-14 11:00:52.657000',19,6,NULL),(8,'2023-02-14 11:03:18.253000','2023-02-14 11:03:16.497000',19,6,NULL),(9,'2023-02-14 11:03:48.076000','2023-02-14 11:03:19.423000',NULL,6,20),(10,'2023-02-14 11:04:07.390000','2023-02-14 11:04:04.543000',NULL,6,20),(11,'2023-02-14 11:04:17.718000','2023-02-14 11:04:12.066000',NULL,6,20),(12,'2023-02-14 11:04:42.883000','2023-02-14 11:04:23.739000',NULL,6,20),(13,'2023-02-14 11:17:40.743000','2023-02-14 11:17:27.400000',NULL,6,20),(14,'2023-02-14 12:36:52.160000','2023-02-14 12:36:40.117000',NULL,3,3),(15,'2023-02-14 12:37:05.228000','2023-02-14 12:36:58.046000',NULL,3,5),(16,'2023-02-14 12:37:20.754000','2023-02-14 12:37:16.679000',NULL,3,5),(17,'2023-02-14 12:37:53.770000','2023-02-14 12:37:24.097000',NULL,3,5),(18,'2023-02-14 13:55:13.446000','2023-02-14 13:55:05.645000',13,4,NULL),(19,'2023-02-14 13:55:15.169000','2023-02-14 13:55:14.566000',13,4,NULL),(20,'2023-02-14 13:55:56.562000','2023-02-14 13:55:52.657000',13,4,NULL),(21,'2023-02-14 13:55:58.024000','2023-02-14 13:55:57.189000',6,4,NULL),(22,'2023-02-14 13:56:02.061000','2023-02-14 13:55:58.774000',7,4,NULL),(23,'2023-02-14 14:03:04.806000','2023-02-14 14:03:03.149000',7,4,NULL),(24,'2023-02-14 14:03:08.042000','2023-02-14 14:03:06.408000',13,4,NULL),(25,'2023-02-14 14:03:12.101000','2023-02-14 14:03:11.593000',13,4,NULL),(26,'2023-02-14 14:29:12.542000','2023-02-14 14:28:57.382000',7,4,NULL),(27,'2023-02-14 14:29:22.912000','2023-02-14 14:29:13.652000',13,4,NULL),(28,'2023-02-14 14:30:40.821000','2023-02-14 14:30:31.810000',13,4,NULL),(29,'2023-02-14 14:35:46.904000','2023-02-14 14:33:45.746000',6,4,NULL),(30,'2023-02-14 15:30:00.980000','2023-02-14 15:29:56.829000',6,4,NULL),(31,'2023-02-14 15:31:00.308000','2023-02-14 15:30:57.972000',13,4,NULL),(32,'2023-02-14 15:39:03.605000','2023-02-14 15:38:59.189000',13,4,NULL),(33,'2023-02-14 15:39:21.688000','2023-02-14 15:39:20.306000',13,4,NULL),(34,'2023-02-14 15:49:28.219000','2023-02-14 15:48:45.436000',6,4,NULL),(35,'2023-02-14 15:49:39.179000','2023-02-14 15:49:29.007000',13,4,NULL),(36,'2023-02-14 15:50:40.085000','2023-02-14 11:17:42.705000',19,6,NULL),(37,'2023-02-14 15:50:55.870000','2023-02-14 15:50:42.475000',NULL,6,20),(38,'2023-02-14 15:58:11.446000','2023-02-14 15:58:10.368000',13,4,NULL),(39,'2023-02-14 16:00:22.973000','2023-02-14 16:00:17.549000',13,4,NULL),(40,'2023-02-14 16:10:11.554000','2023-02-14 15:51:03.026000',NULL,6,20),(41,'2023-02-14 16:13:32.768000','2023-02-14 16:13:29.958000',33,1,NULL),(45,'2023-02-14 17:59:56.746000','2023-02-14 17:59:50.801000',16,5,NULL),(46,'2023-02-14 19:54:08.566000','2023-02-14 19:54:07.706000',6,4,NULL),(47,'2023-02-14 19:54:11.661000','2023-02-14 19:54:10.016000',13,4,NULL),(48,'2023-02-14 19:54:25.322000','2023-02-14 19:54:23.666000',13,4,NULL),(49,'2023-02-14 20:24:50.024000','2023-02-14 20:24:18.437000',33,1,NULL),(51,'2023-02-15 07:09:59.750000','2023-02-15 06:59:29.416000',NULL,3,5),(52,'2023-02-15 07:54:43.922000','2023-02-15 07:50:34.461000',NULL,3,10),(53,'2023-02-15 08:28:47.435000','2023-02-15 08:28:43.266000',NULL,3,8),(54,'2023-02-15 09:11:06.811000','2023-02-15 09:11:05.950000',NULL,3,3),(55,'2023-02-15 09:17:17.610000','2023-02-15 09:13:09.975000',NULL,3,3),(56,'2023-02-15 09:17:33.148000','2023-02-15 09:17:27.626000',NULL,3,3),(57,'2023-02-15 09:17:57.009000','2023-02-15 09:17:53.980000',NULL,3,3),(58,'2023-02-15 09:22:26.711000','2023-02-15 09:17:59.340000',NULL,3,3),(60,'2023-02-15 09:59:38.797000','2023-02-15 09:58:42.327000',34,4,NULL),(61,'2023-02-15 10:04:37.399000','2023-02-15 10:00:52.154000',34,4,NULL),(62,'2023-02-15 10:14:27.242000','2023-02-15 10:04:42.189000',34,4,NULL),(63,'2023-02-15 10:14:28.648000','2023-02-15 10:14:28.000000',34,4,NULL),(64,'2023-02-15 10:17:35.311000','2023-02-15 10:15:15.085000',34,4,NULL),(65,'2023-02-15 10:17:45.160000','2023-02-15 10:17:43.338000',NULL,4,35),(66,'2023-02-15 10:55:19.674000','2023-02-15 09:57:39.465000',42,5,NULL),(67,'2023-02-15 11:05:03.533000','2023-02-15 09:40:00.170000',NULL,3,4),(68,'2023-02-15 11:10:00.273000','2023-02-15 11:05:44.652000',NULL,3,8),(69,'2023-02-15 12:15:24.791000','2023-02-15 11:10:01.249000',NULL,3,3),(70,'2023-02-15 12:16:41.711000','2023-02-15 10:36:05.293000',34,4,NULL),(71,'2023-02-15 12:20:45.509000','2023-02-15 12:19:15.938000',41,5,NULL),(72,'2023-02-15 12:20:56.377000','2023-02-15 12:20:49.843000',42,5,NULL),(73,'2023-02-15 12:24:34.363000','2023-02-15 12:20:58.358000',42,5,NULL),(74,'2023-02-15 12:24:44.341000','2023-02-15 09:57:39.465000',42,5,NULL),(75,'2023-02-15 13:02:56.958000','2023-02-15 12:40:11.159000',NULL,3,8),(76,'2023-02-15 13:03:05.995000','2023-02-15 13:02:57.813000',NULL,3,8),(77,'2023-02-15 13:03:59.114000','2023-02-15 13:03:09.490000',NULL,3,8),(78,'2023-02-15 13:18:11.165000','2023-02-15 12:24:47.484000',41,5,NULL),(79,'2023-02-15 13:21:29.473000','2023-02-15 12:19:17.242000',34,4,NULL),(80,'2023-02-15 13:43:51.099000','2023-02-15 13:21:36.555000',34,4,NULL),(81,'2023-02-15 13:53:51.779000','2023-02-15 13:43:54.912000',NULL,4,35),(82,'2023-02-15 14:10:36.910000','2023-02-15 13:04:03.781000',NULL,3,8),(83,'2023-02-15 14:20:53.349000','2023-02-15 13:53:53.787000',NULL,4,47),(84,'2023-02-15 14:21:26.400000','2023-02-15 14:20:54.396000',NULL,4,47),(85,'2023-02-15 14:45:59.794000','2023-02-15 14:45:51.758000',NULL,4,35),(86,'2023-02-15 14:50:10.755000','2023-02-15 14:50:09.305000',NULL,4,35),(89,'2023-02-15 15:40:38.301000','2023-02-15 15:39:43.079000',NULL,4,47),(90,'2023-02-15 15:43:43.713000','2023-02-15 15:40:40.538000',NULL,4,47),(91,'2023-02-15 15:53:56.464000','2023-02-15 15:42:23.191000',43,5,NULL),(92,'2023-02-15 15:54:13.095000','2023-02-15 15:53:57.821000',42,5,NULL),(93,'2023-02-15 15:55:14.094000','2023-02-15 15:54:14.472000',41,5,NULL),(94,'2023-02-15 15:55:24.688000','2023-02-15 15:55:16.144000',41,5,NULL),(95,'2023-02-15 15:55:51.794000','2023-02-15 15:47:58.871000',NULL,4,47),(96,'2023-02-15 15:56:14.150000','2023-02-15 15:55:26.577000',42,5,NULL),(97,'2023-02-15 15:57:23.022000','2023-02-15 15:55:54.912000',NULL,4,47),(98,'2023-02-15 15:58:43.142000','2023-02-15 15:57:24.188000',NULL,4,47),(99,'2023-02-15 16:02:38.804000','2023-02-15 16:02:33.839000',NULL,3,5),(100,'2023-02-15 16:38:57.086000','2023-02-15 16:02:30.521000',NULL,4,47),(101,'2023-02-15 17:27:33.713000','2023-02-15 17:27:31.970000',43,5,NULL),(102,'2023-02-15 17:30:51.021000','2023-02-15 17:27:35.297000',44,5,NULL),(103,'2023-02-15 17:36:40.475000','2023-02-15 17:34:02.866000',48,21,NULL),(104,'2023-02-15 17:38:29.762000','2023-02-15 17:36:41.968000',49,21,NULL),(107,'2023-02-15 20:26:33.605000','2023-02-15 20:25:46.763000',NULL,22,52),(117,'2023-02-16 09:52:25.172000','2023-02-16 09:52:12.177000',NULL,4,35),(118,'2023-02-16 09:53:32.707000','2023-02-16 09:53:25.608000',NULL,4,35),(119,'2023-02-16 09:53:54.792000','2023-02-16 09:53:41.345000',NULL,3,5),(120,'2023-02-16 09:54:14.926000','2023-02-16 09:54:00.622000',NULL,4,47),(121,'2023-02-16 09:55:58.710000','2023-02-16 09:53:57.273000',NULL,3,5),(122,'2023-02-16 09:57:23.796000','2023-02-16 09:57:22.559000',NULL,3,5),(124,'2023-02-16 10:03:15.664000','2023-02-16 09:56:39.827000',NULL,4,35),(127,'2023-02-16 10:36:13.691000','2023-02-16 10:03:17.092000',NULL,4,35),(128,'2023-02-16 10:47:52.645000','2023-02-16 10:43:53.453000',NULL,4,35),(129,'2023-02-16 10:48:24.211000','2023-02-16 10:48:23.153000',NULL,4,47),(155,'2023-02-16 11:08:19.728000','2023-02-16 10:57:28.012000',NULL,4,47),(156,'2023-02-16 11:09:44.866000','2023-02-16 11:08:20.879000',NULL,4,47),(157,'2023-02-16 12:14:47.215000','2023-02-16 12:10:32.320000',74,5,NULL),(158,'2023-02-16 12:16:01.153000','2023-02-16 12:14:48.784000',56,5,NULL),(159,'2023-02-16 12:17:08.672000','2023-02-16 12:16:02.650000',78,5,NULL),(160,'2023-02-16 12:18:53.223000','2023-02-16 11:09:45.749000',NULL,4,47),(161,'2023-02-16 12:32:13.718000','2023-02-16 12:32:12.242000',NULL,3,5),(162,'2023-02-16 12:32:16.267000','2023-02-16 12:32:14.802000',NULL,3,5),(163,'2023-02-16 12:36:24.923000','2023-02-16 12:35:45.808000',NULL,3,12),(164,'2023-01-16 10:00:00.000000','2023-01-16 09:00:00.000000',79,23,NULL),(165,'2023-01-17 10:00:00.000000','2023-01-17 09:00:00.000000',80,23,NULL),(166,'2023-01-18 10:00:00.000000','2023-01-18 09:00:00.000000',81,23,NULL),(167,'2023-01-19 10:00:00.000000','2023-01-19 09:00:00.000000',82,23,NULL),(168,'2023-01-20 10:00:00.000000','2023-01-20 09:00:00.000000',83,23,NULL),(169,'2023-01-23 10:00:00.000000','2023-01-23 09:00:00.000000',84,23,NULL),(170,'2023-01-24 10:00:00.000000','2023-01-24 09:00:00.000000',85,23,NULL),(171,'2023-01-25 10:00:00.000000','2023-01-25 09:00:00.000000',86,23,NULL),(172,'2023-01-26 10:00:00.000000','2023-01-26 09:00:00.000000',87,23,NULL),(173,'2023-01-27 10:00:00.000000','2023-01-27 09:00:00.000000',88,23,NULL),(174,'2023-01-30 10:00:00.000000','2023-01-30 09:00:00.000000',89,23,NULL),(175,'2023-01-31 10:00:00.000000','2023-01-31 09:00:00.000000',90,23,NULL),(176,'2023-02-01 10:00:00.000000','2023-02-01 09:00:00.000000',91,23,NULL),(177,'2023-02-02 10:00:00.000000','2023-02-02 09:00:00.000000',92,23,NULL),(178,'2023-02-03 10:00:00.000000','2023-02-03 09:00:00.000000',93,23,NULL),(179,'2023-02-06 10:00:00.000000','2023-02-06 09:00:00.000000',94,23,NULL),(180,'2023-02-07 10:00:00.000000','2023-02-07 09:00:00.000000',95,23,NULL),(181,'2023-02-08 10:00:00.000000','2023-02-08 09:00:00.000000',96,23,NULL),(182,'2023-02-09 10:00:00.000000','2023-02-09 09:00:00.000000',97,23,NULL),(183,'2023-02-10 10:00:00.000000','2023-02-10 09:00:00.000000',98,23,NULL),(184,'2023-02-13 10:00:00.000000','2023-02-13 09:00:00.000000',99,23,NULL),(185,'2023-02-14 10:00:00.000000','2023-02-14 09:00:00.000000',100,23,NULL),(186,'2023-02-15 10:00:00.000000','2023-02-15 09:00:00.000000',101,23,NULL),(187,'2023-02-16 10:00:00.000000','2023-02-16 09:00:00.000000',102,23,NULL),(188,'2023-02-16 13:07:43.220000','2023-02-16 13:07:34.774000',103,5,NULL),(189,'2023-02-16 13:08:04.928000','2023-02-16 13:07:45.024000',104,5,NULL),(190,'2023-02-16 13:08:18.827000','2023-02-16 13:08:06.562000',106,5,NULL),(191,'2023-02-16 13:18:30.252000','2023-02-16 12:18:54.156000',NULL,4,35),(192,'2023-02-16 13:58:03.496000','2023-02-16 13:57:59.737000',NULL,6,20),(193,'2023-02-16 14:22:43.229000','2023-02-16 13:56:53.213000',58,23,NULL),(194,'2023-02-16 14:33:55.323000','2023-02-16 14:22:44.693000',58,23,NULL),(195,'2023-02-16 15:21:16.470000','2023-02-16 15:17:43.668000',NULL,3,109),(196,'2023-02-16 15:27:19.489000','2023-02-16 15:27:18.363000',NULL,3,3),(197,'2023-02-16 15:27:27.691000','2023-02-16 15:27:22.953000',NULL,3,10),(198,'2023-02-16 15:47:06.863000','2023-02-16 15:46:52.177000',58,23,NULL),(199,'2023-02-16 15:51:01.407000','2023-02-16 15:47:49.020000',73,23,NULL),(200,'2023-02-16 15:51:38.227000','2023-02-16 15:51:05.303000',73,23,NULL),(201,'2023-02-16 15:53:26.098000','2023-02-16 15:52:25.644000',73,23,NULL),(202,'2023-02-16 15:54:06.597000','2023-02-16 15:54:03.683000',73,23,NULL),(204,'2023-02-16 16:00:44.910000','2023-02-16 15:48:49.740000',NULL,3,145),(205,'2023-02-16 16:47:56.649000','2023-02-16 16:47:51.650000',NULL,6,37),(206,'2023-02-16 16:48:01.183000','2023-02-16 16:47:57.948000',146,6,NULL),(207,'2023-02-16 16:48:41.101000','2023-02-16 16:48:35.925000',NULL,6,37),(208,'2023-02-16 16:48:54.034000','2023-02-16 16:48:42.965000',NULL,6,20),(210,'2023-01-15 23:00:00.000000','2023-01-15 23:00:00.000000',111,23,NULL),(211,'2023-01-16 23:00:00.000000','2023-01-16 23:00:00.000000',114,23,NULL),(212,'2023-01-17 23:00:00.000000','2023-01-17 23:00:00.000000',115,23,NULL),(213,'2023-01-18 23:00:00.000000','2023-01-18 23:00:00.000000',116,23,NULL),(214,'2023-01-19 23:00:00.000000','2023-01-19 23:00:00.000000',117,23,NULL),(215,'2023-01-23 23:00:00.000000','2023-01-23 23:00:00.000000',118,23,NULL),(216,'2023-01-24 23:00:00.000000','2023-01-24 23:00:00.000000',119,23,NULL),(217,'2023-01-25 23:00:00.000000','2023-01-25 23:00:00.000000',120,23,NULL),(218,'2023-01-26 23:00:00.000000','2023-01-26 23:00:00.000000',121,23,NULL),(219,'2023-01-27 23:00:00.000000','2023-01-27 23:00:00.000000',122,23,NULL),(220,'2023-01-31 23:00:00.000000','2023-01-31 23:00:00.000000',123,23,NULL),(221,'2023-02-01 23:00:00.000000','2023-02-01 20:00:00.000000',124,23,NULL),(222,'2023-02-02 23:00:00.000000','2023-02-02 20:00:00.000000',125,23,NULL),(223,'2023-02-07 23:00:00.000000','2023-02-07 20:00:00.000000',126,23,NULL),(224,'2023-02-08 23:00:00.000000','2023-02-08 20:00:00.000000',127,23,NULL),(225,'2023-02-09 23:00:00.000000','2023-02-09 20:00:00.000000',128,23,NULL),(226,'2023-02-13 23:00:00.000000','2023-02-13 20:00:00.000000',129,23,NULL),(227,'2023-02-14 23:00:00.000000','2023-02-14 20:00:00.000000',130,23,NULL),(228,'2023-02-15 23:00:00.000000','2023-02-15 20:00:00.000000',131,23,NULL),(229,'2023-01-02 21:48:00.000000','2023-01-02 20:52:00.000000',132,23,NULL),(230,'2023-01-03 21:53:00.000000','2023-01-03 20:51:00.000000',133,23,NULL),(231,'2023-01-04 21:23:00.000000','2023-01-04 20:53:00.000000',134,23,NULL),(232,'2023-01-09 21:56:00.000000','2023-01-09 20:52:00.000000',135,23,NULL),(233,'2023-01-11 21:23:00.000000','2023-01-11 20:52:00.000000',136,23,NULL),(234,'2023-01-13 21:55:00.000000','2023-01-13 20:52:00.000000',137,23,NULL),(235,'2023-01-16 21:47:00.000000','2023-01-16 20:52:00.000000',138,23,NULL),(236,'2023-01-18 21:43:00.000000','2023-01-18 20:54:00.000000',139,23,NULL),(237,'2023-01-20 21:40:00.000000','2023-01-20 20:52:00.000000',140,23,NULL),(238,'2023-01-23 21:47:00.000000','2023-01-23 20:52:00.000000',141,23,NULL),(239,'2023-01-25 21:40:00.000000','2023-01-25 20:50:00.000000',142,23,NULL),(240,'2023-01-27 21:51:00.000000','2023-01-27 20:46:00.000000',143,23,NULL),(241,'2023-01-30 21:51:00.000000','2023-01-30 20:46:00.000000',149,23,NULL),(242,'2023-02-01 21:51:00.000000','2023-02-01 20:48:00.000000',150,23,NULL),(243,'2023-02-03 21:51:00.000000','2023-02-03 20:49:00.000000',151,23,NULL),(244,'2023-02-06 21:51:00.000000','2023-02-06 20:45:00.000000',152,23,NULL),(245,'2023-02-08 21:51:00.000000','2023-02-08 20:51:00.000000',153,23,NULL),(246,'2023-02-10 21:51:00.000000','2023-02-10 20:48:00.000000',154,23,NULL),(247,'2023-02-13 21:51:00.000000','2023-02-13 20:47:00.000000',155,23,NULL),(248,'2023-02-15 21:51:00.000000','2023-02-15 20:49:00.000000',156,23,NULL),(249,'2023-02-16 17:45:10.065000','2023-02-16 17:44:31.933000',146,23,NULL),(250,'2023-02-16 17:45:19.799000','2023-02-16 17:45:11.555000',102,23,NULL),(251,'2023-02-16 17:59:09.477000','2023-02-16 17:58:38.892000',NULL,23,164),(252,'2023-02-16 17:59:12.690000','2023-02-16 17:59:10.769000',NULL,23,157),(254,'2023-02-16 23:00:00.000000','2023-02-16 20:00:00.000000',NULL,23,157),(255,'2023-02-16 08:00:00.000000','2023-02-16 06:00:00.000000',NULL,23,158),(256,'2023-02-16 09:00:00.000000','2023-02-16 08:00:00.000000',NULL,23,159),(257,'2023-02-16 10:00:00.000000','2023-02-16 09:00:00.000000',NULL,23,160),(258,'2023-02-16 11:00:00.000000','2023-02-16 10:00:12.000000',NULL,23,161),(259,'2023-02-16 12:32:00.000000','2023-02-16 11:00:50.000000',NULL,23,162),(260,'2023-02-16 13:00:00.000000','2023-02-16 12:00:45.000000',NULL,23,163),(261,'2023-02-15 14:00:00.000000','2023-02-15 13:00:00.000000',NULL,23,164),(262,'2023-02-16 15:00:00.000000','2023-02-16 14:00:00.000000',NULL,23,165),(263,'2023-02-16 16:30:00.000000','2023-02-16 15:55:00.000000',NULL,23,166),(264,'2023-02-16 17:00:00.000000','2023-02-16 16:00:00.000000',NULL,23,167),(265,'2023-02-16 18:00:00.000000','2023-02-16 17:00:00.000000',NULL,23,168),(266,'2023-02-15 20:00:00.000000','2023-02-15 17:22:45.000000',NULL,23,169),(267,'2023-02-15 23:00:00.000000','2023-02-15 23:51:59.000000',NULL,23,170),(268,'2023-02-14 23:00:00.000000','2023-02-14 23:23:23.000000',NULL,23,168),(269,'2023-02-14 23:00:00.000000','2023-02-14 15:23:01.000000',NULL,23,169),(270,'2023-02-14 23:00:00.000000','2023-02-14 20:56:11.000000',NULL,23,170),(272,'2023-02-14 21:30:10.000000','2023-02-14 20:42:00.000000',NULL,23,162),(273,'2023-02-14 21:30:10.000000','2023-02-14 21:20:15.000000',NULL,23,163),(275,'2023-02-14 21:19:56.000000','2023-02-14 21:10:10.000000',NULL,23,165),(276,'2023-02-14 21:30:10.000000','2023-02-14 21:03:10.000000',NULL,23,160),(277,'2023-02-16 19:54:33.167000','2023-02-16 19:52:40.563000',NULL,23,160),(278,'2023-02-16 19:54:33.167000','2023-02-16 16:42:36.167000',NULL,23,168),(279,'2023-02-16 20:01:43.927000','2023-02-16 19:57:31.663000',NULL,23,168),(280,'2023-02-15 22:35:13.000000','2023-02-15 20:38:40.000000',NULL,23,165),(281,'2023-02-16 20:05:39.301000','2023-02-16 20:01:49.898000',NULL,23,163),(282,'2023-02-16 20:11:42.431000','2023-02-16 20:06:48.435000',NULL,23,162),(283,'2023-02-14 23:00:00.000000','2023-02-14 13:10:04.000000',NULL,23,171),(284,'2023-02-16 20:16:55.628000','2023-02-16 20:13:54.897000',NULL,23,171),(285,'2023-02-16 21:55:05.460000','2023-02-16 21:54:43.685000',NULL,23,158),(286,'2023-02-16 21:55:07.418000','2023-02-16 21:55:06.273000',NULL,23,158),(287,'2023-02-16 21:55:09.799000','2023-02-16 21:55:08.175000',NULL,23,161),(288,'2023-02-16 21:55:14.953000','2023-02-16 21:55:10.979000',NULL,23,157),(289,'2023-02-16 21:55:18.779000','2023-02-16 21:55:16.814000',NULL,23,163),(290,'2023-02-16 21:55:21.260000','2023-02-16 21:55:19.487000',NULL,23,170),(291,'2023-02-16 21:55:23.677000','2023-02-16 21:55:22.134000',NULL,23,159),(292,'2023-02-17 04:47:56.079000','2023-02-17 04:47:32.492000',NULL,23,164),(293,'2023-02-17 04:48:10.333000','2023-02-17 04:47:59.519000',NULL,23,157),(294,'2023-02-17 05:24:27.926000','2023-02-17 05:24:13.179000',NULL,23,161),(295,'2023-02-17 05:24:36.018000','2023-02-17 05:24:30.530000',NULL,23,157),(296,'2023-02-17 05:28:18.296000','2023-02-17 05:28:04.749000',NULL,23,161),(297,'2023-02-17 05:28:30.736000','2023-02-17 05:28:21.791000',NULL,23,157),(298,'2023-02-17 05:34:43.427000','2023-02-17 05:34:28.327000',NULL,23,161),(299,'2023-02-17 05:34:50.506000','2023-02-17 05:34:46.141000',NULL,23,157),(300,'2023-02-17 07:37:02.694000','2023-02-17 07:36:30.902000',NULL,23,166),(301,'2023-02-17 07:37:06.766000','2023-02-17 07:37:04.749000',NULL,23,158),(302,'2023-02-17 08:53:22.786000','2023-02-17 08:52:42.696000',NULL,31,172),(303,'2023-02-17 09:03:01.746000','2023-02-17 08:41:29.396000',NULL,23,161),(304,'2023-02-17 09:13:56.802000','2023-02-17 09:03:09.025000',NULL,23,162),(305,'2023-02-17 09:14:12.529000','2023-02-17 09:14:03.689000',NULL,23,159),(306,'2023-02-17 09:14:14.963000','2023-02-17 09:14:13.781000',NULL,23,161),(307,'2023-02-17 09:14:43.546000','2023-02-17 09:14:41.070000',NULL,23,171),(308,'2023-02-17 09:27:07.655000','2023-02-17 09:27:04.739000',NULL,4,47),(309,'2023-02-17 09:27:19.429000','2023-02-17 09:27:16.385000',NULL,4,47),(310,'2023-02-17 09:27:24.677000','2023-02-17 09:27:20.858000',NULL,4,35),(311,'2023-02-17 09:27:48.279000','2023-02-17 09:27:43.434000',NULL,4,47),(312,'2023-02-17 09:27:54.979000','2023-02-17 09:27:52.185000',NULL,4,47),(313,'2023-02-17 09:28:03.439000','2023-02-17 09:27:58.312000',NULL,4,47),(314,'2023-02-17 09:28:13.113000','2023-02-17 09:28:08.068000',NULL,4,47),(315,'2023-02-17 09:28:22.554000','2023-02-17 09:28:17.680000',NULL,4,47),(316,'2023-02-17 09:28:31.427000','2023-02-17 09:28:26.343000',NULL,4,47),(317,'2023-02-17 09:28:44.977000','2023-02-17 09:28:42.054000',NULL,4,47),(318,'2023-02-17 09:28:53.963000','2023-02-17 09:28:48.756000',NULL,4,47),(319,'2023-02-17 09:29:08.031000','2023-02-17 09:28:58.164000',NULL,4,47),(320,'2023-02-17 09:32:26.699000','2023-02-17 09:31:35.844000',NULL,23,157),(321,'2023-02-17 09:32:42.856000','2023-02-17 09:32:28.518000',NULL,23,161),(322,'2023-02-17 09:40:02.496000','2023-02-17 09:25:54.330000',NULL,23,164);
/*!40000 ALTER TABLE `work_period` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'calmwave'
--
/*!50106 SET @save_time_zone= @@TIME_ZONE */ ;
/*!50106 DROP EVENT IF EXISTS `transfer_data_event` */;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = utf8mb4 */ ;;
/*!50003 SET character_set_results = utf8mb4 */ ;;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = 'SYSTEM' */ ;;
/*!50106 CREATE*/ /*!50117 DEFINER=`surf`@`%`*/ /*!50106 EVENT `transfer_data_event` ON SCHEDULE EVERY 1 DAY STARTS '2023-02-14 04:00:00' ON COMPLETION NOT PRESERVE ENABLE DO CALL transfer_data() */ ;;
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
DELIMITER ;
/*!50106 SET TIME_ZONE= @save_time_zone */ ;

--
-- Dumping routines for database 'calmwave'
--
/*!50003 DROP PROCEDURE IF EXISTS `transfer_data` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`surf`@`%` PROCEDURE `transfer_data`()
BEGIN
    SET SQL_SAFE_UPDATES = 0;  # disable safe mode
    SET FOREIGN_KEY_CHECKS = 0;
    UPDATE work_period wp
    JOIN work w ON wp.work_id = w.work_id
    SET wp.past_work_id = wp.work_id, wp.work_id = NULL
    WHERE w.status = 'DONE';
    SET FOREIGN_KEY_CHECKS = 1;

    INSERT INTO `past_work` (`past_work_id`,`date_aimed`,`date_created`,`date_finished`,`description`,`status`,`title`,`user_id`,`work_cate_id`,`work_order`,`time_aimed`)
    SELECT `work_id`,`date_aimed`,`date_created`,`date_finished`,`description`,`status`,`title`,`user_id`,`work_cate_id`,`work_order`,`time_aimed`
    FROM `work`
    WHERE `status` = 'DONE';
    
    DELETE FROM `work`
    WHERE `status` = 'DONE';
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-17  9:44:03
