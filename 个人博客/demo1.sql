-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- 主机： localhost
-- 生成日期： 2020-10-26 09:12:54
-- 服务器版本： 5.7.26
-- PHP 版本： 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `demo1`
--

-- --------------------------------------------------------

--
-- 表的结构 `likes`
--

CREATE TABLE `likes` (
  `id` int(250) NOT NULL,
  `user` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `txtid` varchar(250) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `likes`
--

INSERT INTO `likes` (`id`, `user`, `txtid`) VALUES
(293, '1829038870', '49'),
(291, '1829038870', '48'),
(292, '1829038870', '47'),
(289, '15110890092', '47');

-- --------------------------------------------------------

--
-- 表的结构 `pinglun`
--

CREATE TABLE `pinglun` (
  `id` int(11) NOT NULL,
  `name` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `img` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `txt` varchar(10000) COLLATE utf8_unicode_ci NOT NULL,
  `zuozhe` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `pinglun` int(250) NOT NULL DEFAULT '0',
  `chakan` int(20) NOT NULL DEFAULT '0',
  `dianzan` int(20) NOT NULL DEFAULT '0',
  `user` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `time` varchar(250) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `pinglun`
--

INSERT INTO `pinglun` (`id`, `name`, `img`, `txt`, `zuozhe`, `pinglun`, `chakan`, `dianzan`, `user`, `time`) VALUES
(49, '123', NULL, '123', '董奥奇', 8, 0, 1, '1829038870', '2020-09-24, 10:11:48'),
(47, '123213213', NULL, '13213213132131', '宋帅', 2, 0, 2, '15110890092', '2020-09-01, 21:41:59'),
(48, '文章测试', NULL, '模糊宿舍', '宋帅', 7, 0, -28, '15110890092', '2020-09-01, 21:46:07');

-- --------------------------------------------------------

--
-- 表的结构 `txtlist`
--

CREATE TABLE `txtlist` (
  `id` int(50) NOT NULL,
  `txtid` int(250) NOT NULL,
  `name` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `txt` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `headimg` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `txtlist`
--

INSERT INTO `txtlist` (`id`, `txtid`, `name`, `user`, `txt`, `headimg`) VALUES
(193, 48, '宋帅', '15110890092', '憨批', 'https://img2.woyaogexing.com/2020/09/25/eff1aae071694f0983c3bd38148c31ab!400x400.jpeg'),
(194, 48, '宋帅', '15110890092', '今天邵明尉给我整了一个bug，淦！', 'https://img2.woyaogexing.com/2020/09/25/eff1aae071694f0983c3bd38148c31ab!400x400.jpeg'),
(190, 49, '董奥奇', '1829038870', '给自己的文章点个赞，啦啦啦啦', 'https://img2.woyaogexing.com/2020/09/25/e0a6794289094150a1ed8b60b181688d!400x400.jpeg'),
(188, 47, '董奥奇', '1829038870', '我tm真是太牛逼了', 'https://img2.woyaogexing.com/2020/09/25/e0a6794289094150a1ed8b60b181688d!400x400.jpeg'),
(186, 45, '宋帅', '15110890092', '1232131', 'https://img2.woyaogexing.com/2020/09/25/eff1aae071694f0983c3bd38148c31ab!400x400.jpeg'),
(191, 48, '宋帅', '15110890092', '大和之间天上来', 'https://img2.woyaogexing.com/2020/09/25/eff1aae071694f0983c3bd38148c31ab!400x400.jpeg'),
(187, 47, '宋帅', '15110890092', '其实还ok', 'https://img2.woyaogexing.com/2020/09/25/eff1aae071694f0983c3bd38148c31ab!400x400.jpeg'),
(192, 48, '宋帅', '15110890092', '大和之间天上来', 'https://img2.woyaogexing.com/2020/09/25/eff1aae071694f0983c3bd38148c31ab!400x400.jpeg');

-- --------------------------------------------------------

--
-- 表的结构 `users`
--

CREATE TABLE `users` (
  `id` int(250) NOT NULL,
  `user` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `headimg` varchar(5000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `address` varchar(250) COLLATE utf8_unicode_ci DEFAULT '您还没有填写个人信息',
  `sex` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `txtcount` int(50) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `users`
--

INSERT INTO `users` (`id`, `user`, `password`, `phone`, `headimg`, `name`, `address`, `sex`, `txtcount`) VALUES
(45, '15110890092', 'gaoxiaojian2580', '15110890092', 'https://img2.woyaogexing.com/2020/09/25/eff1aae071694f0983c3bd38148c31ab!400x400.jpeg', '宋帅', '123123', '0', 0),
(44, '1829038870', '123', '123', 'https://img2.woyaogexing.com/2020/09/25/e0a6794289094150a1ed8b60b181688d!400x400.jpeg', '董奥奇', '一个正在学习js的人', '0', 0);

--
-- 转储表的索引
--

--
-- 表的索引 `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `pinglun`
--
ALTER TABLE `pinglun`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `txtlist`
--
ALTER TABLE `txtlist`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=374;

--
-- 使用表AUTO_INCREMENT `pinglun`
--
ALTER TABLE `pinglun`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- 使用表AUTO_INCREMENT `txtlist`
--
ALTER TABLE `txtlist`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=196;

--
-- 使用表AUTO_INCREMENT `users`
--
ALTER TABLE `users`
  MODIFY `id` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
