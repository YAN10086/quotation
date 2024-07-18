/*
Navicat MySQL Data Transfer

Source Server         : 49.111.111.111
Source Server Version : 50562
Source Host           : 49.111.111.111:3306
Source Database       : baojia

Target Server Type    : MYSQL
Target Server Version : 50562
File Encoding         : 65001

Date: 2024-07-18 10:26:38
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `content` longtext,
  `content2` longtext,
  `createDate` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `tenantId` int(11) DEFAULT NULL,
  `enabled` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for banner
-- ----------------------------
DROP TABLE IF EXISTS `banner`;
CREATE TABLE `banner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `enabled` varchar(255) DEFAULT NULL,
  `tenantId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for brand
-- ----------------------------
DROP TABLE IF EXISTS `brand`;
CREATE TABLE `brand` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `enabled` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for daisen
-- ----------------------------
DROP TABLE IF EXISTS `daisen`;
CREATE TABLE `daisen` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `goodsName` varchar(255) DEFAULT NULL COMMENT '名称',
  `recyclingPrice` longtext COMMENT '回收价格',
  `recyclingPriceList` longtext,
  `bid` int(11) DEFAULT NULL COMMENT '对应的品牌id',
  `visitCount` int(255) DEFAULT NULL COMMENT '访问次数',
  `goodsCover` varchar(255) DEFAULT NULL COMMENT '封面',
  `dis` varchar(255) DEFAULT NULL,
  `tenantId` varchar(255) DEFAULT NULL COMMENT '租户ID',
  `updateDate` varchar(255) DEFAULT NULL,
  `createDate` varchar(255) DEFAULT NULL COMMENT '创建时间',
  `enabled` varchar(255) DEFAULT NULL COMMENT '1正常 0删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for digital
-- ----------------------------
DROP TABLE IF EXISTS `digital`;
CREATE TABLE `digital` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `goodsName` varchar(255) DEFAULT NULL COMMENT '名称',
  `recyclingPrice` longtext COMMENT '回收价格',
  `recyclingPriceList` varchar(255) DEFAULT NULL,
  `bid` int(11) DEFAULT NULL COMMENT '对应的品牌id',
  `visitCount` int(255) DEFAULT NULL COMMENT '访问次数',
  `goodsCover` varchar(255) DEFAULT NULL COMMENT '封面',
  `dis` varchar(255) DEFAULT NULL,
  `tenantId` varchar(255) DEFAULT NULL COMMENT '租户ID',
  `updateDate` varchar(255) DEFAULT NULL,
  `createDate` varchar(255) DEFAULT NULL COMMENT '创建时间',
  `enabled` varchar(255) DEFAULT NULL COMMENT '1正常 0删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for fav
-- ----------------------------
DROP TABLE IF EXISTS `fav`;
CREATE TABLE `fav` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openId` varchar(255) DEFAULT NULL,
  `goodsId` int(11) DEFAULT NULL,
  `createDate` varchar(255) DEFAULT NULL,
  `tenantId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orderId` int(11) DEFAULT NULL,
  `goodsName` varchar(255) DEFAULT NULL COMMENT '名称',
  `recyclingPrice` longtext COMMENT '回收价格',
  `recyclingPriceList` varchar(1000) DEFAULT NULL,
  `bid` int(11) DEFAULT NULL COMMENT '对应的品牌id',
  `cid` int(11) DEFAULT NULL,
  `visitCount` int(255) DEFAULT NULL COMMENT '访问次数',
  `goodsCover` varchar(255) DEFAULT NULL COMMENT '封面',
  `tenantId` varchar(255) DEFAULT NULL COMMENT '租户ID',
  `updateDate` varchar(255) DEFAULT NULL,
  `createDate` varchar(255) DEFAULT NULL COMMENT '创建时间',
  `enabled` varchar(255) DEFAULT NULL COMMENT '1正常 0删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=367 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for goods_copy
-- ----------------------------
DROP TABLE IF EXISTS `goods_copy`;
CREATE TABLE `goods_copy` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `goodsName` varchar(255) DEFAULT NULL COMMENT '名称',
  `recyclingPrice` longtext COMMENT '回收价格',
  `recyclingPriceList` varchar(255) DEFAULT NULL,
  `bid` int(11) DEFAULT NULL COMMENT '对应的品牌id',
  `visitCount` int(255) DEFAULT NULL COMMENT '访问次数',
  `goodsCover` varchar(255) DEFAULT NULL COMMENT '封面',
  `tenantId` varchar(255) DEFAULT NULL COMMENT '租户ID',
  `updateDate` varchar(255) DEFAULT NULL,
  `createDate` varchar(255) DEFAULT NULL COMMENT '创建时间',
  `enabled` varchar(255) DEFAULT NULL COMMENT '1正常 0删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=184 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for goods2
-- ----------------------------
DROP TABLE IF EXISTS `goods2`;
CREATE TABLE `goods2` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `goodsName` varchar(255) DEFAULT NULL COMMENT '名称',
  `recyclingPrice` longtext COMMENT '回收价格',
  `recyclingPriceList` longtext,
  `basisPrice` varchar(255) DEFAULT NULL,
  `bid` int(11) DEFAULT NULL COMMENT '对应的品牌id',
  `visitCount` int(255) DEFAULT NULL COMMENT '访问次数',
  `goodsCover` varchar(255) DEFAULT NULL COMMENT '封面',
  `tenantId` varchar(255) DEFAULT NULL COMMENT '租户ID',
  `createDate` varchar(255) DEFAULT NULL COMMENT '创建时间',
  `enabled` varchar(255) DEFAULT NULL COMMENT '1正常 0删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=184 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for hlw
-- ----------------------------
DROP TABLE IF EXISTS `hlw`;
CREATE TABLE `hlw` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `num` varchar(255) DEFAULT NULL,
  `cname` varchar(255) DEFAULT NULL,
  `shortLink` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for myziyuan
-- ----------------------------
DROP TABLE IF EXISTS `myziyuan`;
CREATE TABLE `myziyuan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openId` varchar(255) DEFAULT NULL,
  `ziyuanId` int(11) DEFAULT NULL,
  `createDate` varchar(255) DEFAULT NULL,
  `tenantId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for notice
-- ----------------------------
DROP TABLE IF EXISTS `notice`;
CREATE TABLE `notice` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(255) DEFAULT NULL,
  `tenantId` varchar(255) DEFAULT NULL,
  `flag` varchar(255) DEFAULT NULL,
  `createDate` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `enabled` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for notice_bar
-- ----------------------------
DROP TABLE IF EXISTS `notice_bar`;
CREATE TABLE `notice_bar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(255) DEFAULT NULL,
  `tenantId` int(11) DEFAULT NULL,
  `enabled` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for que
-- ----------------------------
DROP TABLE IF EXISTS `que`;
CREATE TABLE `que` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question` varchar(255) DEFAULT NULL,
  `answer` varchar(255) DEFAULT NULL,
  `tenantId` varchar(255) DEFAULT NULL,
  `enabled` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for quotation
-- ----------------------------
DROP TABLE IF EXISTS `quotation`;
CREATE TABLE `quotation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `goodsId` varchar(255) DEFAULT NULL COMMENT '商品ID',
  `recyclingPrice` varchar(255) DEFAULT NULL COMMENT '回收价格',
  `updateDate` varchar(255) DEFAULT NULL,
  `tenantId` varchar(255) DEFAULT NULL COMMENT '租户ID',
  `enabled` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=631 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for Sheet2
-- ----------------------------
DROP TABLE IF EXISTS `Sheet2`;
CREATE TABLE `Sheet2` (
  `A` varchar(255) DEFAULT NULL,
  `B` varchar(255) DEFAULT NULL,
  `C` varchar(255) DEFAULT NULL,
  `D` varchar(255) DEFAULT NULL,
  `E` varchar(255) DEFAULT NULL,
  `F` varchar(255) DEFAULT NULL,
  `G` varchar(255) DEFAULT NULL,
  `H` varchar(255) DEFAULT NULL,
  `I` varchar(255) DEFAULT NULL,
  `J` varchar(255) DEFAULT NULL,
  `K` varchar(255) DEFAULT NULL,
  `L` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for subscribe
-- ----------------------------
DROP TABLE IF EXISTS `subscribe`;
CREATE TABLE `subscribe` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createDate` varchar(255) DEFAULT NULL,
  `userName` varchar(255) DEFAULT NULL,
  `tenantId` varchar(255) DEFAULT NULL,
  `strDate` varchar(255) DEFAULT NULL,
  `enabled` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=222 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for sys
-- ----------------------------
DROP TABLE IF EXISTS `sys`;
CREATE TABLE `sys` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `img` varchar(255) DEFAULT NULL,
  `aboutUs` varchar(255) DEFAULT NULL,
  `tel` varchar(255) DEFAULT NULL,
  `loginCode` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for tenant_admin
-- ----------------------------
DROP TABLE IF EXISTS `tenant_admin`;
CREATE TABLE `tenant_admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) DEFAULT NULL,
  `userPwd` varchar(255) DEFAULT NULL,
  `tenantId` varchar(255) DEFAULT NULL,
  `createDate` varchar(255) DEFAULT NULL,
  `enabled` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for tenant_users
-- ----------------------------
DROP TABLE IF EXISTS `tenant_users`;
CREATE TABLE `tenant_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openId` varchar(255) DEFAULT NULL,
  `userName` varchar(255) DEFAULT NULL,
  `nickName` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `createDate` varchar(255) DEFAULT NULL,
  `tenantId` varchar(11) DEFAULT NULL COMMENT '商户Id',
  `loginDate` varchar(255) DEFAULT NULL,
  `enabled` varchar(255) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2280 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for tenants
-- ----------------------------
DROP TABLE IF EXISTS `tenants`;
CREATE TABLE `tenants` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tenantName` varchar(255) DEFAULT NULL COMMENT '单位名称',
  `createDate` varchar(255) DEFAULT NULL COMMENT '创建时间',
  `person` varchar(255) DEFAULT NULL COMMENT '负责人信息',
  `tenantCode` varchar(255) DEFAULT NULL,
  `tel` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `enabled` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for user_ziyuan
-- ----------------------------
DROP TABLE IF EXISTS `user_ziyuan`;
CREATE TABLE `user_ziyuan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openId` varchar(255) DEFAULT NULL,
  `ziyuanId` int(11) DEFAULT NULL,
  `createDate` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for xianbao
-- ----------------------------
DROP TABLE IF EXISTS `xianbao`;
CREATE TABLE `xianbao` (
  `id` int(11) NOT NULL,
  `tenantId` int(11) DEFAULT NULL,
  `jijianTitle` varchar(255) DEFAULT NULL,
  `jijianUserInfo` varchar(255) DEFAULT NULL,
  `jijianAddress` varchar(255) DEFAULT NULL,
  `qunTitle` varchar(255) DEFAULT NULL,
  `qunImg` varchar(255) DEFAULT NULL,
  `qunText` varchar(255) DEFAULT NULL,
  `qunTitle2` varchar(255) DEFAULT NULL,
  `qunImg2` varchar(255) DEFAULT NULL,
  `qunText2` varchar(255) DEFAULT NULL,
  `kefuTitle` varchar(255) DEFAULT NULL,
  `kefuImg` varchar(255) DEFAULT NULL,
  `kefuText` varchar(255) DEFAULT NULL,
  `enabled` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for youxiji
-- ----------------------------
DROP TABLE IF EXISTS `youxiji`;
CREATE TABLE `youxiji` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `goodsName` varchar(255) DEFAULT NULL COMMENT '名称',
  `recyclingPrice` longtext COMMENT '回收价格',
  `recyclingPriceList` longtext,
  `bid` int(11) DEFAULT NULL COMMENT '对应的品牌id',
  `visitCount` int(255) DEFAULT NULL COMMENT '访问次数',
  `goodsCover` varchar(255) DEFAULT NULL COMMENT '封面',
  `dis` varchar(255) DEFAULT NULL,
  `tenantId` varchar(255) DEFAULT NULL COMMENT '租户ID',
  `updateDate` varchar(255) DEFAULT NULL,
  `createDate` varchar(255) DEFAULT NULL COMMENT '创建时间',
  `enabled` varchar(255) DEFAULT NULL COMMENT '1正常 0删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for ziyuan
-- ----------------------------
DROP TABLE IF EXISTS `ziyuan`;
CREATE TABLE `ziyuan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` longtext,
  `content` longtext,
  `imgList` longtext,
  `type` varchar(255) DEFAULT NULL,
  `tagName` varchar(255) DEFAULT NULL,
  `address` longtext,
  `contentImg` varchar(255) DEFAULT NULL,
  `coverImg` varchar(255) DEFAULT NULL,
  `visitNum` varchar(255) DEFAULT NULL,
  `downNum` int(11) DEFAULT NULL,
  `createDate` varchar(255) DEFAULT NULL,
  `enabled` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
