/*
 Navicat Premium Data Transfer

 Source Server         : 本地Mysql
 Source Server Type    : MySQL
 Source Server Version : 50716
 Source Host           : localhost:3306
 Source Schema         : operation11

 Target Server Type    : MySQL
 Target Server Version : 50716
 File Encoding         : 65001

 Date: 26/11/2020 13:35:58
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sys_permission
-- ----------------------------
DROP TABLE IF EXISTS `sys_permission`;
CREATE TABLE `sys_permission`  (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `menu_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '菜单code,前端判断',
  `menu_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '菜单名称',
  `permission_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '权限code',
  `permission_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '权限名称',
  `is_required` int(2) NOT NULL COMMENT '是否必选,1必选0非必选\r\n',
  `status` tinyint(1) NOT NULL COMMENT '权限状态1正常，0禁用',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 760 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_permission
-- ----------------------------
INSERT INTO `sys_permission` VALUES (101, 'dispatch', '派单中心', 'dispatch:list', '列表', 1, 1);
INSERT INTO `sys_permission` VALUES (102, 'dispatch', '派单中心', 'dispatch:edit', '修改', 2, 1);
INSERT INTO `sys_permission` VALUES (103, 'dispatch', '派单中心', 'dispatch:delete', '删除', 2, 1);
INSERT INTO `sys_permission` VALUES (601, 'user', '用户管理', 'user:list', '列表', 1, 1);
INSERT INTO `sys_permission` VALUES (602, 'user', '用户管理', 'user:add', '新增', 2, 1);
INSERT INTO `sys_permission` VALUES (603, 'user', '用户管理', 'user:edit', '编辑', 2, 1);
INSERT INTO `sys_permission` VALUES (604, 'user', '用户管理', 'user:delete', '删除', 1, 1);
INSERT INTO `sys_permission` VALUES (701, 'role', '角色权限', 'role:list', '列表', 1, 1);
INSERT INTO `sys_permission` VALUES (702, 'role', '角色权限', 'role:add', '新增', 2, 1);
INSERT INTO `sys_permission` VALUES (703, 'role', '角色权限', 'role:edit', '修改', 2, 1);
INSERT INTO `sys_permission` VALUES (704, 'role', '角色权限', 'role:delete', '删除', 2, 1);
INSERT INTO `sys_permission` VALUES (705, 'permission', '权限管理', 'permission:list', '列表', 1, 1);
INSERT INTO `sys_permission` VALUES (707, 'permission', '权限管理', 'permission:edit', '编辑', 1, 1);
INSERT INTO `sys_permission` VALUES (708, 'permission', '权限管理', 'permission:add', '增加', 1, 1);
INSERT INTO `sys_permission` VALUES (709, 'permission', '权限管理', 'permission:delete', '删除', 1, 1);
INSERT INTO `sys_permission` VALUES (710, 'teacher', '学校用户', 'teacher:list', '列表', 1, 1);
INSERT INTO `sys_permission` VALUES (711, 'teacher', '学校用户', 'teacher:edit', '编辑', 1, 1);
INSERT INTO `sys_permission` VALUES (712, 'teacher', '学校用户', 'teacher:delete', '删除', 1, 1);
INSERT INTO `sys_permission` VALUES (713, 'equipment', '设备管理', 'equipment:list', '列表', 1, 0);
INSERT INTO `sys_permission` VALUES (714, 'equipment', '设备管理', 'equipment:edit', '编辑', 1, 0);
INSERT INTO `sys_permission` VALUES (715, 'equipment', '设备管理', 'equipment:add', '添加', 1, 0);
INSERT INTO `sys_permission` VALUES (716, 'equipment', '设备管理', 'equipment:delete', '删除', 1, 0);
INSERT INTO `sys_permission` VALUES (717, 'tag', '故障标签', 'tag:list', '列表', 1, 1);
INSERT INTO `sys_permission` VALUES (718, 'tag', '故障标签', 'tag:add', '新增', 1, 1);
INSERT INTO `sys_permission` VALUES (719, 'tag', '故障标签', 'tag:edit', '编辑', 1, 1);
INSERT INTO `sys_permission` VALUES (720, 'tag', '故障标签', 'tag:delete', '删除', 1, 1);
INSERT INTO `sys_permission` VALUES (721, 'map', '派单地图', 'map:list', '列表', 1, 1);
INSERT INTO `sys_permission` VALUES (722, 'device', '设备管理', 'device:list', '列表', 1, 1);
INSERT INTO `sys_permission` VALUES (723, 'device', '设备管理', 'device:edit', '编辑', 1, 0);
INSERT INTO `sys_permission` VALUES (724, 'device', '设备管理', 'device:add', '新增', 1, 0);
INSERT INTO `sys_permission` VALUES (725, 'device', '设备管理', 'device:delete', '删除', 1, 0);
INSERT INTO `sys_permission` VALUES (726, 'device', '设备管理', 'device:creatQR', '二维码', 1, 1);
INSERT INTO `sys_permission` VALUES (727, 'file', '文档管理', 'file:list', '列表', 1, 1);
INSERT INTO `sys_permission` VALUES (728, 'file', '文档管理', 'file:add', '新增', 1, 1);
INSERT INTO `sys_permission` VALUES (729, 'file', '文档管理', 'file:edit', '编辑', 1, 1);
INSERT INTO `sys_permission` VALUES (730, 'file', '文档管理', 'file:delete', '删除', 1, 1);
INSERT INTO `sys_permission` VALUES (731, 'dataTable', '数据分析', 'dataTable:list', '列表', 1, 1);
INSERT INTO `sys_permission` VALUES (732, 'faultList', '故障清单', 'faultList:list', '列表', 1, 1);
INSERT INTO `sys_permission` VALUES (733, 'position', '设备位置', 'position:list', '列表', 1, 1);
INSERT INTO `sys_permission` VALUES (736, 'productType', '产品分类', 'productType:list', '列表', 1, 1);
INSERT INTO `sys_permission` VALUES (737, 'productType', '产品分类', 'productType:edit', '编辑', 1, 1);
INSERT INTO `sys_permission` VALUES (738, 'productType', '产品分类', 'productType:add', '新增', 1, 1);
INSERT INTO `sys_permission` VALUES (739, 'productType', '产品分类', 'productType:delete', '删除', 1, 1);
INSERT INTO `sys_permission` VALUES (740, 'productList', '产品列表', 'productList:list', '列表', 1, 1);
INSERT INTO `sys_permission` VALUES (741, 'productList', '产品列表', 'productList:edit', '编辑', 1, 1);
INSERT INTO `sys_permission` VALUES (742, 'productList', '产品列表', 'productList:add', '新增', 1, 1);
INSERT INTO `sys_permission` VALUES (743, 'productList', '产品列表', 'productList:delete', '删除', 1, 1);
INSERT INTO `sys_permission` VALUES (744, 'productModule', '产品模块', 'productModule:list', '列表', 1, 1);
INSERT INTO `sys_permission` VALUES (745, 'productModule', '产品模块', 'productModule:edit', '编辑', 1, 1);
INSERT INTO `sys_permission` VALUES (746, 'productModule', '产品模块', 'productModule:add', '新增', 1, 1);
INSERT INTO `sys_permission` VALUES (747, 'productModule', '产品模块', 'productModule:delete', '删除', 1, 1);
INSERT INTO `sys_permission` VALUES (748, 'problemManagement', '问题管理', 'problemManagement:list', '列表', 1, 1);
INSERT INTO `sys_permission` VALUES (749, 'problemManagement', '问题管理', 'problemManagement:edit', '编辑', 1, 1);
INSERT INTO `sys_permission` VALUES (750, 'problemManagement', '问题管理', 'problemManagement:add', '新增', 1, 1);
INSERT INTO `sys_permission` VALUES (751, 'problemManagement', '问题管理', 'problemManagement:delete', '删除', 1, 1);
INSERT INTO `sys_permission` VALUES (752, 'userManual', '使用手册', 'userManual:list', '列表', 1, 1);
INSERT INTO `sys_permission` VALUES (753, 'userManual', '使用手册', 'userManual:edit', '编辑', 1, 1);
INSERT INTO `sys_permission` VALUES (754, 'userManual', '使用手册', 'userManual:add', '添加', 1, 1);
INSERT INTO `sys_permission` VALUES (755, 'userManual', '使用手册', 'userManual:delete', '删除', 1, 1);
INSERT INTO `sys_permission` VALUES (756, 'versionManagement', '版本更新', 'versionManagement:list', '列表', 1, 1);
INSERT INTO `sys_permission` VALUES (757, 'versionManagement', '版本更新', 'versionManagement:edit', '编辑', 1, 1);
INSERT INTO `sys_permission` VALUES (758, 'versionManagement', '版本更新', 'versionManagement:add', '添加', 1, 1);
INSERT INTO `sys_permission` VALUES (759, 'versionManagement', '版本管理', 'versionManagement:delete', '删除', 1, 1);

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role`  (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '角色id',
  `role_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '角色名称',
  `create_time` bigint(13) NOT NULL COMMENT '创建时间',
  `update_time` bigint(13) NOT NULL COMMENT '更新时间',
  `status` varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '角色状态,1使用,0禁用',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES (1, '超级管理员', 1111, 1585643958586, '1');
INSERT INTO `sys_role` VALUES (8, '帮助中心管理员', 1550757468699, 1585645317209, '1');
INSERT INTO `sys_role` VALUES (9, '运维人员', 1550977385922, 1583894627414, '1');
INSERT INTO `sys_role` VALUES (11, '运维管理员', 1583890350508, 1592533212348, '1');
INSERT INTO `sys_role` VALUES (12, '测试', 1592532250389, 1592532272105, '1');

-- ----------------------------
-- Table structure for sys_role_permission
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_permission`;
CREATE TABLE `sys_role_permission`  (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `role_id` int(10) NOT NULL COMMENT '角色id',
  `permission_id` int(10) NOT NULL COMMENT '权限id',
  `create_time` bigint(13) NOT NULL COMMENT '创建时间',
  `updata_time` bigint(13) NOT NULL COMMENT '跟新时间',
  `status` int(2) NOT NULL COMMENT '状态1,正常0异常',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2574 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role_permission
-- ----------------------------
INSERT INTO `sys_role_permission` VALUES (2414, 1, 703, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2415, 1, 101, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2416, 1, 102, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2417, 1, 103, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2418, 1, 601, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2419, 1, 602, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2420, 1, 603, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2421, 1, 604, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2422, 1, 705, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2423, 1, 708, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2424, 1, 701, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2425, 1, 702, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2426, 1, 704, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2427, 1, 703, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2428, 1, 101, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2429, 1, 102, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2430, 1, 103, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2431, 1, 601, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2432, 1, 602, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2433, 1, 603, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2434, 1, 604, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2435, 1, 705, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2436, 1, 707, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2437, 1, 708, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2438, 1, 701, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2439, 1, 702, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2440, 1, 704, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2441, 1, 709, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2442, 1, 710, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2443, 1, 711, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2444, 1, 712, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2445, 1, 713, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2446, 1, 717, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2447, 1, 718, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2448, 1, 719, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2449, 1, 720, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2450, 1, 721, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2451, 1, 722, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2452, 1, 727, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2453, 1, 728, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2454, 1, 729, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2455, 1, 730, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2456, 1, 731, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2457, 1, 732, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2458, 1, 733, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2459, 1, 736, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2460, 1, 737, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2461, 1, 738, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2462, 1, 739, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2463, 1, 740, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2464, 1, 741, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2465, 1, 742, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2466, 1, 743, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2467, 1, 744, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2468, 1, 745, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2469, 1, 746, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2470, 1, 747, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2471, 1, 748, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2472, 1, 749, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2473, 1, 750, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2474, 1, 751, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2475, 1, 752, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2476, 1, 753, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2477, 1, 754, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2478, 1, 755, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2479, 1, 756, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2480, 1, 757, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2481, 1, 758, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2482, 1, 759, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2483, 1, 726, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2510, 8, 736, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2511, 8, 737, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2512, 8, 738, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2513, 8, 739, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2514, 8, 740, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2515, 8, 741, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2516, 8, 742, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2517, 8, 743, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2518, 8, 744, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2519, 8, 745, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2520, 8, 746, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2521, 8, 747, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2522, 8, 748, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2523, 8, 749, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2524, 8, 750, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2525, 8, 751, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2526, 8, 752, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2527, 8, 753, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2528, 8, 754, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2529, 8, 755, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2530, 8, 756, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2531, 8, 757, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2532, 8, 758, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2533, 8, 759, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2534, 12, 601, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2535, 12, 602, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2536, 12, 603, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2537, 12, 604, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2538, 12, 701, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2539, 12, 702, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2540, 12, 703, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2541, 12, 704, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2542, 12, 710, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2543, 12, 711, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2544, 12, 712, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2545, 12, 717, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2546, 12, 718, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2547, 12, 719, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2548, 12, 720, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2549, 11, 101, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2550, 11, 102, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2551, 11, 103, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2552, 11, 710, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2553, 11, 711, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2554, 11, 712, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2555, 11, 717, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2556, 11, 718, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2557, 11, 719, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2558, 11, 720, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2559, 11, 732, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2560, 11, 731, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2561, 11, 727, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2562, 11, 728, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2563, 11, 729, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2564, 11, 730, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2565, 11, 701, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2566, 11, 702, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2567, 11, 703, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2568, 11, 704, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2569, 11, 601, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2570, 11, 602, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2571, 11, 603, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2572, 11, 604, 0, 0, 0);
INSERT INTO `sys_role_permission` VALUES (2573, 11, 722, 0, 0, 0);

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user`  (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '主键',
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `role_id` int(10) NOT NULL COMMENT '角色id',
  `update_time` bigint(13) NULL DEFAULT NULL COMMENT '修改时间',
  `create_time` bigint(13) NOT NULL COMMENT '创建时间',
  `status` varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '是否有效\r\n',
  `job_number` varchar(13) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '工号',
  `is_super` varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '是否是超级管理员1是',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES ('25b9d050c481328f96729b52ecdb5de8', '凌梦威', '112233', 8, NULL, 1598321928367, '1', '101008', NULL);
INSERT INTO `sys_user` VALUES ('547a5662cf4758ba2138b561d04d1492', '101003', '123456', 9, NULL, 1562637646977, '1', '101003', NULL);
INSERT INTO `sys_user` VALUES ('78b90b0d265d0e4edf1a8bd017f3df9c', '夏捷', '123456', 9, NULL, 1585812042750, '1', '101007', NULL);
INSERT INTO `sys_user` VALUES ('9515b7894ca99e97deeaa1b734f3de75', '夏俊杰', '123456', 11, NULL, 1550761132252, '1', '101002', NULL);
INSERT INTO `sys_user` VALUES ('b4db7b32bb5c968e2f65d1da66b95e02', '韩明辉', 'kai3251756', 9, NULL, 1598321978744, '1', '101009', NULL);
INSERT INTO `sys_user` VALUES ('c35c00ec0e3e15e6303993ce770c118e', 'tiye', '123456', 8, NULL, 1585645102897, '1', '101004', NULL);
INSERT INTO `sys_user` VALUES ('e082f0b71a5f3566396ba3ece5007d5d', 'admin', 'tiye@123', 1, NULL, 1550762216973, '1', '101001', '1');
INSERT INTO `sys_user` VALUES ('e6895712bca984203c37549b0573691e', '张仕龙', '123456', 9, NULL, 1585811889394, '1', '101006', NULL);

-- ----------------------------
-- Table structure for sys_user_info
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_info`;
CREATE TABLE `sys_user_info`  (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '主键,工号',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '人员信息',
  `age` int(2) NOT NULL COMMENT '人员年龄',
  `sex` varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '人员性别',
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '人员头像',
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '人员地址',
  `phone` bigint(11) NOT NULL COMMENT '联系电话',
  `entry_time` bigint(13) NOT NULL COMMENT '入职时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user_info
-- ----------------------------
INSERT INTO `sys_user_info` VALUES ('101001', '超级管理员', 24, '1', '', '河南省漯河市', 13641119340, 1549900800000);
INSERT INTO `sys_user_info` VALUES ('101002', '夏俊杰', 25, '1', '', '赛威小镇', 13837107009, 1550505600000);
INSERT INTO `sys_user_info` VALUES ('101003', '研发账号', 25, '1', '', '郑州', 15563154980, 1562601600000);
INSERT INTO `sys_user_info` VALUES ('101004', '帮助中心管理员', 26, '1', '', '河南天业仁和', 13586498752, 1582992000000);
INSERT INTO `sys_user_info` VALUES ('101006', '张仕龙', 21, '1', '', '叶县实验学校', 15993535039, 1554739200000);
INSERT INTO `sys_user_info` VALUES ('101007', '夏捷', 30, '1', '', '叶县实验学校', 18736068666, 1519747200000);
INSERT INTO `sys_user_info` VALUES ('101008', '凌梦威', 20, '2', '', '叶县', 18237506091, 1590940800000);
INSERT INTO `sys_user_info` VALUES ('101009', '韩明辉', 25, '1', '', '叶县', 13409307635, 1590940800000);

SET FOREIGN_KEY_CHECKS = 1;
