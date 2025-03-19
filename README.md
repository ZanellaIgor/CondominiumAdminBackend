# Backend - API de Autenticação e Gerenciamento de Condomínios

Este é o backend de um sistema gestão de condomínios, desenvolvido com NestJS, Prisma e PostgreSQL. Ele fornece uma API REST para autenticação, gerenciamento de condomínios e apartamentos, e controle de acesso baseado em roles.

## Tecnologias Utilizadas

- **[NestJS](https://nestjs.com/)** - Framework para desenvolvimento de APIs em Node.js.
- **[Prisma](https://www.prisma.io/)** - ORM utilizado para interagir com o banco de dados PostgreSQL.
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional.
- **[JWT](https://jwt.io/)** - JSON Web Tokens para autenticação.
- **[bcrypt](https://www.npmjs.com/package/bcrypt)** - Para hashing de senhas.
- **[class-validator](https://github.com/typestack/class-validator)** - Para validação de dados.
- **[Docker](https://www.docker.com/)** - Para containerização do banco de dados.
- **[Swagger](https://swagger.io/)** - Documentação interativa da API.

# Funcionalidades

## Avisos (WARNINGS)

- **Criação:** Todos os usuários podem criar avisos.
- **Aprovação:** Avisos precisam ser aprovados por usuários com role "admin" ou "master".
- **Edição:**
  - Usuários comuns: Podem editar seus próprios avisos apenas enquanto estiverem no status "ABERTO".
  - Admins/Masters: Podem selecionar o apartamento ao qual o aviso se refere.
- **Visualização:** Todos os usuários podem visualizar avisos aprovados referente ao seu condomínio.

## Reservas (RESERVATION)

- **Solicitação:** Usuários podem solicitar reservas.
- **Edição:**
  - Usuários comuns: Podem editar a descrição da reserva apenas enquanto estiver no status "ABERTO".
  - Admins/Masters: Podem aprovar ou reprovar as solicitações.
  - Admins/Masters: Podem selecionar o apartamento ao qual a reserva se refere.

## Manutenções (MAINTENANCE)

- **Solicitação:** Usuários podem solicitar manutenções.
- **Aprovação:** Solicitações precisam ser aprovadas por usuários "admin" ou "master".
- **Edição:**
  - Usuários comuns: Podem editar a descrição de suas próprias solicitações enquanto estiverem no status "ABERTO".
  - Admins/Masters: Podem selecionar o condomínio ao qual a manutenção se refere.
- **Visualização:** Todos os usuários podem visualizar manutenções aprovadas.

## Enquetes (SURVEY)

- **Criação/Edição:** Apenas usuários "admin" e "master" podem criar e editar enquetes.
- **Restrição:** Enquetes não podem ser editadas após receberem respostas.

## Respostas (ANSWER)

- **Participação:** Apenas usuários com role "USER" podem responder enquetes.

## Área Administrativa (Acesso exclusivo para usuários "admin" e "master")

- **Apartamentos (APARTMENT):**
  - **Gerenciamento:** CRUD (Criar, Ler, Atualizar, Deletar) de informações dos apartamentos.
- **Condomínios (CONDOMINIUM):**
  - **Gerenciamento:** CRUD de informações dos condomínios.
- **Espaços de Reserva (SPACE-RESERVATION):**
  - **Gerenciamento:** CRUD de espaços de reserva, com seleção do condomínio.
- **Usuários (USER):**

  - **Gerenciamento:** CRUD de informações dos usuários.

## Documentação da API

A documentação da API está disponível via **Swagger**. Após iniciar o servidor, você pode acessar a interface do Swagger no seguinte endereço:

- **Swagger UI**: [http://localhost:3332/api](http://localhost:3332/api)

A interface do Swagger permite:

- Visualizar todos os endpoints da API.
- Testar as requisições diretamente na interface.
- Ver exemplos de requisições e respostas.

## Instalação e Configuração

Clone do repositório:

```bash
git clone https://github.com/ZanellaIgor/CondominiumAdminBackend.git
cd CondominiumAdminBackend
```

Instalação as dependências:

```bash
npm install
```

Iniciar container

```bash
docker compose up -d
```

Popular banco com seed

```bash
npm run seed
```

Iniciar projeto

```bash
npm run dev
```

Obs: Verificar configuração do .env.example, e alterar para .env

### Pré-requisitos

- [Node.js](https://nodejs.org/) >= 16
- [PostgreSQL](https://www.postgresql.org/)
- [Nest CLI](https://docs.nestjs.com/cli/overview)
