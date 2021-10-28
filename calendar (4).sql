-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3308
-- Tempo de geração: 27-Out-2021 às 19:55
-- Versão do servidor: 5.7.31
-- versão do PHP: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `calendar`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `anotacao`
--

DROP TABLE IF EXISTS `anotacao`;
CREATE TABLE IF NOT EXISTS `anotacao` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) NOT NULL,
  `content` varchar(500) NOT NULL,
  `id_data` int(5) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_anotacao_data` (`id_data`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `anotacao`
--

INSERT INTO `anotacao` (`id`, `titulo`, `content`, `id_data`) VALUES
(1, 'Teste dia 07/01', 'Anotação dia 7 de janeiro de 2021', 1),
(2, 'Segunda anotação dia 07/01', 'Segunda anotação do dia editado', 1),
(3, 'Anotação dia 4 de Novembro', 'Prmeira anotação - dia 04/11', 8),
(4, 'alallaakak', 'alalalalal', 4),
(5, 'teste titulo', 'EDITADO', 1),
(9, 'modificado', 'mooooiiddiificado', 8),
(12, 'show mano', '\'alskdjalsdjalsdjalsdk', 9),
(21, 'show meu fi', '11111111111111111111111', 15),
(24, 'aaaasdasdas', 'a4234234234', 19),
(28, 'dia 16', 'true dia 16\n', 29),
(29, 'Nova anotacao dia 7', 'Editado chefia\n', 1),
(34, 'funcionando noramal', ' showwwwwwwwww', 43),
(41, 'dadasasdasd', 'ewq123124234234 editado', 46);

-- --------------------------------------------------------

--
-- Estrutura da tabela `data_anotacao`
--

DROP TABLE IF EXISTS `data_anotacao`;
CREATE TABLE IF NOT EXISTS `data_anotacao` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `data_anot` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `data_anotacao`
--

INSERT INTO `data_anotacao` (`id`, `data_anot`) VALUES
(1, '7/1/2021'),
(2, '2/9/2021'),
(3, '3/9/2021'),
(4, '6/1/2021'),
(5, '1/9/2021'),
(6, '6/7/2021'),
(7, '16/7/2021'),
(8, '4/11/2021'),
(9, '8/2/2021'),
(12, '22/1/2021'),
(13, '28/1/2021'),
(14, '24/1/2021'),
(15, '23/1/2021'),
(16, '29/1/2021'),
(17, '27/1/2021'),
(19, '5/1/2021'),
(24, '13/1/2021'),
(28, '18/1/2021'),
(29, '16/2/2021'),
(30, '20/1/2021'),
(42, '11/1/2021'),
(43, '14/1/2021'),
(44, '8/1/2021'),
(45, '19/1/2021'),
(46, '11/2/2021');

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `anotacao`
--
ALTER TABLE `anotacao`
  ADD CONSTRAINT `fk_anotacao_data` FOREIGN KEY (`id_data`) REFERENCES `data_anotacao` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
