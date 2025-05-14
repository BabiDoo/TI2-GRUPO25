## Tecnologias utilizadas

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js + Express
- **Banco de Dados**: PostgreSQL
- **Ambiente de desenvolvimento**: VS Code + Live Server + pgAdmin

---

## Funcionalidades

### Aluno
- Cadastro e login
- Visualização de projetos disponíveis
- Acesso restrito com base no tipo de usuário

### Administrador
- Login com permissão especial
- Cadastro de novos projetos
- Gerenciamento de projetos

---

## Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/BabiDoo/TI2-GRUPO25.git
```

---

### 2. Instale as dependências do backend

```bash
cd Sprint2/Backend
npm install
```

---

### 3. Configure o banco de dados PostgreSQL

- Crie um banco chamado `projetos_extensao`
- Execute o seguinte SQL no pgAdmin ou terminal:

```sql
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  senha VARCHAR(100),
  matricula VARCHAR(20) UNIQUE,
  tipo VARCHAR(10) DEFAULT 'aluno'
);

CREATE TABLE projetos (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(100),
  descricao TEXT,
  area VARCHAR(50),
  vagas INTEGER
);

-- Usuários de teste
INSERT INTO usuarios (nome, email, senha, matricula, tipo)
VALUES 
('Admin Teste', 'admin@email.com', '12345678', 'admin001', 'admin'),
('Aluno Teste', 'aluno@email.com', '12345678', '123456', 'aluno');
```

---

### 4. Configure o `.env`

Crie um arquivo `.env` na pasta `Backend` com o seguinte conteúdo:

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=projetos_extensao
DB_PASS=sua_senha
DB_PORT=5432
```

> Substitua `sua_senha` pela senha real do seu PostgreSQL

---

### 5. Inicie o servidor

```bash
node server.js
```

---

### 6. Acesse o site

Abra o arquivo `login.html` no navegador com **Live Server**

---

## Teste rápido com usuários

- **Admin**
  - Matrícula: `admin001`
  - Senha: `12345678`

- **Aluno**
  - Matrícula: `123456`
  - Senha: `12345678`

---
