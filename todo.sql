-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 05, 2021 at 09:05 PM
-- Server version: 10.3.29-MariaDB-0ubuntu0.20.04.1
-- PHP Version: 7.3.28-2+ubuntu20.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `todo`
--

-- --------------------------------------------------------

--
-- Table structure for table `akses_token`
--

CREATE TABLE `akses_token` (
  `id_akses_token` int(11) NOT NULL,
  `id_user` varchar(255) NOT NULL,
  `ip_address` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `akses_token`
--

INSERT INTO `akses_token` (`id_akses_token`, `id_user`, `ip_address`) VALUES
(4, '1', '192.168.7.22'),
(5, '1', '192.168.7.22');

-- --------------------------------------------------------

--
-- Table structure for table `todos`
--

CREATE TABLE `todos` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `note` longtext NOT NULL,
  `date` date NOT NULL,
  `is_true` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `todos`
--

INSERT INTO `todos` (`id`, `title`, `note`, `date`, `is_true`) VALUES
(1, 'belajar node js', 'Tutorial Nodejs dari Nol untuk pemula. Dimulai dari cara install Nodejs di Linux hingga Membuat webserver dan aplikasi lainnya.', '2021-07-04', 0),
(2, 'belajar react native', 'Halo semuanya, di artikel ini, aku mau sharing cara membuat aplikasi berita dengan menggunakan React Native dan memanfaatkan News API. Aplikasi ini masih sederhana karena hanya terdiri dari tiga screen di mana user bisa melihat headline, mencari berita berdasarkan kata kunci, dan mencari berita berdasarkan kategori.', '2021-07-05', 0),
(3, 'Belajar Python', 'Kali ini saya akan membuat satu series tentang Laravel Framework. Motivasi pembuatan series ini adalah banyaknya teman-teman yang mau belajar menggunakan Laravel tetapi tidak mendapat tutorial yang menurut saya cukup komprehensif. Kebanyakan tutorial yang ada sejauh ini hanya membahas pembuatan CRUD (Create, Read, Update, Delete). Pada dasarnya target akhir dari series ini juga adalah CRUD, hanya saja saya akan membahasnya dengan sedetail mungkin, ringkas, dan padat.\n', '2021-07-04', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nama` varchar(30) NOT NULL,
  `asal` varchar(200) NOT NULL,
  `no_hp` varchar(13) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(20) NOT NULL,
  `tanggal_daftar` date NOT NULL,
  `image` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `nama`, `asal`, `no_hp`, `email`, `password`, `role`, `tanggal_daftar`, `image`) VALUES
(1, 'Wandi Pratama', 'Kota Prabumulih', '083149395058', 'wandi99pratama@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'member', '2021-07-04', 'images/1625476495871-Screenshot from 2021-06-11 15-58-24.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `akses_token`
--
ALTER TABLE `akses_token`
  ADD PRIMARY KEY (`id_akses_token`);

--
-- Indexes for table `todos`
--
ALTER TABLE `todos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `akses_token`
--
ALTER TABLE `akses_token`
  MODIFY `id_akses_token` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `todos`
--
ALTER TABLE `todos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
