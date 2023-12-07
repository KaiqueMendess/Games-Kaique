-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 07-Dez-2023 às 22:52
-- Versão do servidor: 10.4.28-MariaDB
-- versão do PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `faqfatec`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `administradores`
--

CREATE TABLE `administradores` (
  `id` int(11) NOT NULL,
  `cpf` varchar(14) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `imagem_path` varchar(255) NOT NULL DEFAULT 'https://files.passeidireto.com/f776e7de-e18d-4b55-a668-a5ca608cb864/f776e7de-e18d-4b55-a668-a5ca608cb864.png'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `administradores`
--

INSERT INTO `administradores` (`id`, `cpf`, `nome`, `senha`, `imagem_path`) VALUES
(1, '47400443828', 'Kaique Mendes', '$2y$10$pDXsgXpt2OnerfaZ7s049.XGRbTLFEyfpHTuTu6gDhP0AZyiW3Tiy', 'http://localhost/FAQFATEC/admin/adminimg/teste.jpg');

-- --------------------------------------------------------

--
-- Estrutura da tabela `alunos`
--

CREATE TABLE `alunos` (
  `AlunoID` int(11) NOT NULL,
  `Nome` varchar(50) NOT NULL,
  `RA` varchar(13) NOT NULL,
  `Senha` varchar(255) NOT NULL,
  `email` varchar(200) NOT NULL,
  `imagem_path` varchar(255) NOT NULL DEFAULT 'https://files.passeidireto.com/f776e7de-e18d-4b55-a668-a5ca608cb864/f776e7de-e18d-4b55-a668-a5ca608cb864.png'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `alunos`
--

INSERT INTO `alunos` (`AlunoID`, `Nome`, `RA`, `Senha`, `email`, `imagem_path`) VALUES
(1, 'Kaique Mendes', '4740044382', '', '', 'C:/xampp/htdocs/FAQFATEC/aluno/alunoimg/WhatsApp Image 2023-12-07 at 13.41.39.jpg'),
(19, 'Kaique Mendes2', '2781392313012', '', 'kaiquemendesn11@gmail.com', 'https://files.passeidireto.com/f776e7de-e18d-4b55-a668-a5ca608cb864/f776e7de-e18d-4b55-a668-a5ca608cb864.png'),
(20, 'Kaique Mendes', '2781392313013', '$2y$10$ywXQiSuR83vamQykXPVePuZfUBbas5MDMKLqhNyw2vWYnO4cJui.u', 'kaiquemendesn11@gmail.com', 'https://files.passeidireto.com/f776e7de-e18d-4b55-a668-a5ca608cb864/f776e7de-e18d-4b55-a668-a5ca608cb864.png');

-- --------------------------------------------------------

--
-- Estrutura da tabela `categorias`
--

CREATE TABLE `categorias` (
  `CategoriaID` int(11) NOT NULL,
  `NomeCategoria` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `categorias`
--

INSERT INTO `categorias` (`CategoriaID`, `NomeCategoria`) VALUES
(1, 'Matrícula'),
(2, 'Cursos e Grade Curricular'),
(3, 'Atividades Extracurriculares'),
(4, 'Admissão e Processo Seletivo'),
(5, 'Estágios e Oportunidades Profissionais');

-- --------------------------------------------------------

--
-- Estrutura da tabela `perguntas`
--

CREATE TABLE `perguntas` (
  `PerguntaID` int(11) NOT NULL,
  `CategoriaID` int(11) DEFAULT NULL,
  `alunoID` int(11) DEFAULT NULL,
  `PerguntaTexto` text NOT NULL,
  `status` varchar(20) DEFAULT 'pendente',
  `dataCriacao` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `perguntas`
--

INSERT INTO `perguntas` (`PerguntaID`, `CategoriaID`, `alunoID`, `PerguntaTexto`, `status`, `dataCriacao`) VALUES
(1, 1, 1, 'Como faço para me matricular em uma das disciplinas?', 'respondida', '2023-12-04 05:12:50'),
(2, 1, 1, 'Quais são os documentos necessários para a matrícula?', 'respondida', '2023-12-04 05:12:50'),
(3, 2, 1, 'Qual é a grade curricular do curso de Ciências da Computação?', 'respondida', '2023-12-04 05:12:50'),
(4, 3, 1, 'Existem atividades extracurriculares disponíveis?', 'respondida', '2023-12-04 05:12:50'),
(5, 5, 1, 'Como posso me inscrever para os cursos oferecidos pela FATEC?', 'pendente', '2023-12-04 05:12:50');

-- --------------------------------------------------------

--
-- Estrutura da tabela `respostas`
--

CREATE TABLE `respostas` (
  `RespostaID` int(11) NOT NULL,
  `PerguntaID` int(11) DEFAULT NULL,
  `RespostaTexto` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `respostas`
--

INSERT INTO `respostas` (`RespostaID`, `PerguntaID`, `RespostaTexto`) VALUES
(0, 0, ''),
(1, 1, 'Você pode se matricular online no portal do aluno.'),
(2, 2, 'CPF ou documento contendo o número do CPF; foto 3X4 de rosto recente,fundo neutro; documento de quitação com o serviço militar para brasileiros maiores de 18 anos do sexo masculino; histórico escolar completo do Ensino Médio (frente e verso);'),
(3, 3, 'A grade curricular pode ser encontrada no site oficial da instituição.'),
(4, 4, 'Sim, oferecemos uma variedade de atividades extracurriculares, incluindo clubes e eventos.'),
(5, 5, 'HAHAHA ARRUMEIs');

-- --------------------------------------------------------

--
-- Estrutura da tabela `sessoes`
--

CREATE TABLE `sessoes` (
  `SessaoID` int(11) NOT NULL,
  `AlunoID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `sessoes`
--

INSERT INTO `sessoes` (`SessaoID`, `AlunoID`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE `usuario` (
  `UsuarioID` int(11) NOT NULL,
  `Nome` varchar(50) NOT NULL,
  `Senha` varchar(255) NOT NULL,
  `email` varchar(200) NOT NULL,
  `imagem_path` varchar(255) NOT NULL DEFAULT 'https://files.passeidireto.com/f776e7de-e18d-4b55-a668-a5ca608cb864/f776e7de-e18d-4b55-a668-a5ca608cb864.png'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `administradores`
--
ALTER TABLE `administradores`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `alunos`
--
ALTER TABLE `alunos`
  ADD PRIMARY KEY (`AlunoID`);

--
-- Índices para tabela `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`CategoriaID`);

--
-- Índices para tabela `perguntas`
--
ALTER TABLE `perguntas`
  ADD PRIMARY KEY (`PerguntaID`),
  ADD KEY `CategoriaID` (`CategoriaID`);

--
-- Índices para tabela `respostas`
--
ALTER TABLE `respostas`
  ADD PRIMARY KEY (`RespostaID`),
  ADD KEY `PerguntaID` (`PerguntaID`);

--
-- Índices para tabela `sessoes`
--
ALTER TABLE `sessoes`
  ADD PRIMARY KEY (`SessaoID`),
  ADD KEY `AlunoID` (`AlunoID`);

--
-- Índices para tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`UsuarioID`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `administradores`
--
ALTER TABLE `administradores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `alunos`
--
ALTER TABLE `alunos`
  MODIFY `AlunoID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de tabela `perguntas`
--
ALTER TABLE `perguntas`
  MODIFY `PerguntaID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `sessoes`
--
ALTER TABLE `sessoes`
  MODIFY `SessaoID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `UsuarioID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `sessoes`
--
ALTER TABLE `sessoes`
  ADD CONSTRAINT `sessoes_ibfk_1` FOREIGN KEY (`AlunoID`) REFERENCES `alunos` (`AlunoID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
