CREATE DATABASE ExtensaoPUC;
USE ExtensaoPUC;


CREATE TABLE ALUNO (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    curso_graduacao_atual VARCHAR(100) NOT NULL
);


CREATE TABLE ORIENTADOR (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL
);


CREATE TABLE TURMA (
    id INT PRIMARY KEY AUTO_INCREMENT
);


CREATE TABLE PROJETO (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT NOT NULL,
    curso VARCHAR(100) NOT NULL,
    numero_vagas INT NOT NULL,
    orientador_id INT,
    FOREIGN KEY (orientador_id) REFERENCES ORIENTADOR(id)
);


CREATE TABLE TAREFA (
    id INT PRIMARY KEY AUTO_INCREMENT,
    descricao TEXT NOT NULL,
    data_inicial DATE NOT NULL,
    data_final DATE NOT NULL,
    nota DECIMAL(5,2),
    projeto_id INT,
    FOREIGN KEY (projeto_id) REFERENCES PROJETO(id)
);


CREATE TABLE FEEDBACK (
    id INT PRIMARY KEY AUTO_INCREMENT,
    descricao TEXT NOT NULL
);


CREATE TABLE CERTIFICADO (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL
);


CREATE TABLE ALUNO_TURMA (
    aluno_id INT,
    turma_id INT,
    PRIMARY KEY (aluno_id, turma_id),
    FOREIGN KEY (aluno_id) REFERENCES ALUNO(id),
    FOREIGN KEY (turma_id) REFERENCES TURMA(id)
);


CREATE TABLE TURMA_PROJETO (
    turma_id INT,
    projeto_id INT,
    PRIMARY KEY (turma_id, projeto_id),
    FOREIGN KEY (turma_id) REFERENCES TURMA(id),
    FOREIGN KEY (projeto_id) REFERENCES PROJETO(id)
);


CREATE TABLE ALUNO_PROJETO (
    aluno_id INT,
    projeto_id INT,
    PRIMARY KEY (aluno_id, projeto_id),
    FOREIGN KEY (aluno_id) REFERENCES ALUNO(id),
    FOREIGN KEY (projeto_id) REFERENCES PROJETO(id)
);


CREATE TABLE ALUNO_CERTIFICADO (
    aluno_id INT,
    certificado_id INT,
    PRIMARY KEY (aluno_id, certificado_id),
    FOREIGN KEY (aluno_id) REFERENCES ALUNO(id),
    FOREIGN KEY (certificado_id) REFERENCES CERTIFICADO(id)
);
