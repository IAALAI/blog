SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for logs
-- ----------------------------
DROP TABLE IF EXISTS `logs`;
CREATE TABLE `logs`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `ip` int UNSIGNED NOT NULL COMMENT ' ',
  `user_agent` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL,
  `user` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `time` bigint NOT NULL,
  `method` enum('GET','POST','PUT','DELETE','PATCH','OPTIONS','HEAD') CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `uri` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL,
  `version` enum('HTTP/1.0','HTTP/1.1','HTTP/2.0','HTTP/3.0') CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `status_code` smallint UNSIGNED NOT NULL,
  `length` int UNSIGNED NOT NULL,
  `referer` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = DYNAMIC;

SET FOREIGN_KEY_CHECKS = 1;
