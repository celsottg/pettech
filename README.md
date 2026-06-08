# Pettech

API REST em Node.js e TypeScript para gestão de usuários e pessoas, com PostgreSQL executado via Docker Compose.

## Visão geral

- **Runtime:** Node.js (ESM)
- **Servidor HTTP:** Fastify
- **Banco de dados:** PostgreSQL (`pg`)
- **Validação:** Zod (body, params e variáveis de ambiente)
- **Build:** tsup (saída em `build/`)

## Arquitetura

O projeto segue uma arquitetura em camadas, separando responsabilidades entre apresentação, regras de aplicação, acesso a dados e infraestrutura.

```mermaid
flowchart TB
  client[Cliente_HTTP]
  controllers[http/controllers]
  useCases[use-cases]
  interfaces[repository_interfaces]
  pgImpl[repositories/pg]
  lib[lib/pg]
  db[(PostgreSQL_Docker)]

  client --> controllers
  controllers --> useCases
  useCases --> interfaces
  pgImpl -.->|implements| interfaces
  pgImpl --> lib
  lib --> db
```

### Estrutura em `src/`

| Pasta | Responsabilidade |
|-------|------------------|
| `entities/` | Modelos de domínio (`User`, `Person`, `Address`) |
| `env/` | Validação de variáveis de ambiente com Zod |
| `http/controllers/` | Rotas e handlers HTTP (entrada da API) |
| `lib/` | Infraestrutura (conexão PostgreSQL em `lib/pg/db.ts`) |
| `utils/` | Utilitários compartilhados (ex.: tratamento global de erros) |
| `repositories/` | Contratos de acesso a dados (`*.repository.interface.ts`) |
| `repositories/pg/` | Implementações PostgreSQL dos repositórios |
| `use-cases/` | Regras de aplicação e orquestração |
| `use-cases/factory/` | Factories que instanciam use cases com suas dependências |
| `use-cases/errors/` | Erros de domínio reutilizados na aplicação |

### Bootstrap

- `src/app.ts` — instancia o Fastify, registra as rotas e conecta o `globalErrorHandler`
- `src/server.ts` — sobe o servidor na porta definida em `PORT`
- `src/utils/global-error-handler.ts` — mapeia erros de domínio e validação para respostas HTTP

### Repositórios e inversão de dependência

Os use cases dependem de **interfaces**, não das implementações concretas. As factories instanciam as classes em `repositories/pg/` e as injetam via contrato:

| Interface | Implementação PG | Métodos |
|-----------|------------------|---------|
| `IPersonRepository` | `PersonRepository` | `create` |
| `IUserRepository` | `UserRepository` | `create`, `findWithPerson` |
| `IAddressRepository` | `AddressRepository` | `create`, `findAddressesByPersonId` |

A entidade `Address` e o `AddressRepository` já estão modelados para endereços vinculados a pessoas (com paginação na listagem).

### Factories de use cases

Os controllers não instanciam repositórios diretamente. A composição fica centralizada em `use-cases/factory/`:

| Factory | Use case |
|---------|----------|
| `makeCreateUserUseCase()` | `CreateUserUseCase` |
| `makeCreatePersonUseCase()` | `CreatePersonUseCase` |
| `makeFindWithPersonUseCase()` | `FindWithPersonUseCase` |

### Tratamento de erros

A função `globalErrorHandler` em `src/utils/global-error-handler.ts` centraliza as respostas HTTP e é registrada em `app.ts` via `app.setErrorHandler`:

| Erro | Status | Resposta |
|------|--------|----------|
| `ZodError` (validação de body/params) | `400` | `{ message: "Validation error", errors: ... }` |
| `ResourceNotFoundError` | `404` | `{ message: "Resource not found" }` |
| Demais erros | `500` | `{ message: "Internal server error" }` |

O use case `FindWithPersonUseCase` lança `ResourceNotFoundError` quando o usuário não existe, em vez de retornar `undefined` para o controller tratar manualmente.

## Endpoints da API

| Método | Rota | Descrição | Body / Params |
|--------|------|-----------|---------------|
| `POST` | `/user` | Cria usuário | `{ "username": "string", "password": "string" }` |
| `GET` | `/user/:id` | Busca usuário com dados de person (JOIN) | `id` na URL — retorna `404` se não encontrado |
| `POST` | `/person` | Cria pessoa vinculada a um usuário | `{ "cpf": "string", "name": "string", "birth": "YYYY-MM-DD", "email": "string", "user_id": number }` |

### Exemplo — criar usuário

```bash
curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{"username": "celso", "password": "123456"}'
```

### Exemplo — criar pessoa

```bash
curl -X POST http://localhost:3000/person \
  -H "Content-Type: application/json" \
  -d '{
    "cpf": "11111111111",
    "name": "Celso Gonçalves",
    "birth": "1900-01-01",
    "email": "teste@teste.com",
    "user_id": 1
  }'
```

> **Observação:** o campo `cpf` no banco aceita até 11 caracteres (`varchar(11)`). Envie o CPF sem máscara (apenas dígitos).

## Pré-requisitos

- Node.js 22+
- npm
- Docker e Docker Compose

## Configuração e execução

### 1. Variáveis de ambiente

Copie `.env.example` para `.env` e preencha:

```env
PORT=3000
POSTGRES_USER=root
POSTGRES_PASSWORD=pettech
POSTGRES_DB=pettech
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
```

### 2. Banco de dados (Docker)

```bash
docker compose up -d
```

O `docker-compose.yml` sobe um container PostgreSQL (`pettech-postgres`) na porta `5432`, com volume persistente e script de inicialização em `docker/postgres/`.

### 3. Instalar dependências

```bash
npm install
```

### 4. Desenvolvimento

```bash
npm run start:dev
```

O servidor ficará disponível em `http://localhost:3000`.

### 5. Build e produção local

```bash
npm run build
npm run start
```

O comando `build` compila o código TypeScript para a pasta `build/` (ignorada pelo Git).

## Scripts npm

| Script | Comando | Uso |
|--------|---------|-----|
| `start:dev` | `tsx watch src/server.ts` | Desenvolvimento com hot reload |
| `start` | `tsx src/server.js` | Execução após build |
| `build` | `tsup src --out-dir build` | Compila TypeScript para `build/` |

## Dependências

### Produção

| Pacote | Uso |
|--------|-----|
| `fastify` | Servidor HTTP |
| `pg` | Driver PostgreSQL |
| `zod` | Validação de schemas e variáveis de ambiente |
| `dotenv` | Carregamento do arquivo `.env` |

### Desenvolvimento

| Pacote | Uso |
|--------|-----|
| `typescript` | Compilador TypeScript |
| `tsx` | Execução de TS em desenvolvimento |
| `tsup` | Bundler/build para `build/` |
| `@types/node`, `@types/pg` | Tipagens |
| `eslint`, `prettier` e plugins | Lint e formatação de código |

## Estrutura do repositório

```
pettech/
├── build/              # saída do tsup (gitignored)
├── docker/
│   └── postgres/       # script init multi-database
├── src/
│   ├── entities/
│   ├── env/
│   ├── http/controllers/
│   ├── lib/
│   ├── repositories/
│   │   ├── *.repository.interface.ts
│   │   └── pg/
│   ├── utils/
│   └── use-cases/
│       ├── errors/
│       └── factory/
├── docker-compose.yml
├── .env.example
└── package.json
```

## Postman

Coleção de requisições disponível em `.postman/Pettech.postman_collection.json`.

## Arquivos ignorados pelo Git

- `.env` — credenciais e configurações locais
- `build/` — artefatos de compilação
- `node_modules/` — dependências instaladas
