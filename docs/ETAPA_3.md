# ForgeCV - Etapa 3

## 1. Objetivo

Esta etapa implementa o sistema de autenticacao JWT do backend ForgeCV.

Funcionalidades entregues:

- Cadastro.
- Login.
- Logout stateless.
- Consulta da sessao atual.
- Solicitacao de recuperacao de senha.
- Redefinicao de senha por token.

Nao foram implementados frontend, envio de e-mail, CRUD de curriculo, IA, upload ou PDF nesta etapa.

## 2. Arquitetura

Estrutura adicionada:

```txt
backend/src/
+-- @types/
|   +-- express/
|       +-- index.d.ts
+-- modules/
|   +-- auth/
|       +-- application/
|       |   +-- auth.service.ts
|       |   +-- auth.validation.ts
|       +-- http/
|       |   +-- auth.controller.ts
|       |   +-- auth.routes.ts
|       +-- infra/
|           +-- jwt.ts
+-- shared/
    +-- http/
        +-- middlewares/
            +-- auth-guard.ts
```

O modulo segue uma divisao simples:

- `application`: regras de autenticacao e validacao de entrada.
- `http`: controllers e rotas Express.
- `infra`: detalhes tecnicos de JWT.
- `shared/http/middlewares`: middleware reutilizavel de autenticacao.

## 3. Decisoes Tecnicas

### JWT stateless

O login retorna um `accessToken`.

O backend nao armazena sessao. O logout e stateless: o cliente deve descartar o token.

Essa decisao reduz complexidade nesta fase. Lista de bloqueio de tokens, refresh tokens e controle multi-dispositivo podem entrar futuramente se o produto exigir.

### Senhas

Senhas sao armazenadas com `bcryptjs`.

Configuracao atual:

```txt
PASSWORD_HASH_ROUNDS = 12
```

### Criacao de perfil inicial

No cadastro, o backend tambem cria:

- `UserProfile`
- `BaseResume`

Isso garante que o usuario ja tenha a estrutura base para a Etapa 4.

### Recuperacao de senha

A API gera um token aleatorio, salva apenas o hash SHA-256 no banco e define expiracao.

Como ainda nao existe integracao de e-mail especificada, o backend nao finge envio. Em `production`, a resposta e generica. Em ambientes diferentes de `production`, a resposta inclui `resetToken` para permitir teste manual.

## 4. Variaveis de Ambiente

Adicionadas em `backend/.env.example`:

```env
JWT_SECRET="replace-this-with-a-long-random-secret"
JWT_EXPIRES_IN=1d
PASSWORD_RESET_TOKEN_TTL_MINUTES=30
```

`JWT_SECRET` precisa ter pelo menos 32 caracteres.

## 5. Endpoints

Base URL:

```txt
/api/auth
```

### Cadastro

```http
POST /api/auth/register
```

Body:

```json
{
  "name": "Ada Lovelace",
  "email": "ada@example.com",
  "password": "password123"
}
```

Resposta:

```json
{
  "user": {
    "id": "user_id",
    "name": "Ada Lovelace",
    "email": "ada@example.com",
    "role": "USER",
    "createdAt": "2026-06-20T00:00:00.000Z"
  },
  "accessToken": "jwt"
}
```

### Login

```http
POST /api/auth/login
```

Body:

```json
{
  "email": "ada@example.com",
  "password": "password123"
}
```

Resposta:

```json
{
  "user": {
    "id": "user_id",
    "name": "Ada Lovelace",
    "email": "ada@example.com",
    "role": "USER",
    "createdAt": "2026-06-20T00:00:00.000Z"
  },
  "accessToken": "jwt"
}
```

### Sessao Atual

```http
GET /api/auth/me
Authorization: Bearer jwt
```

Resposta:

```json
{
  "user": {
    "id": "user_id",
    "name": "Ada Lovelace",
    "email": "ada@example.com",
    "role": "USER",
    "createdAt": "2026-06-20T00:00:00.000Z"
  }
}
```

### Logout

```http
POST /api/auth/logout
Authorization: Bearer jwt
```

Resposta:

```json
{
  "message": "Logged out successfully"
}
```

### Solicitar Recuperacao de Senha

```http
POST /api/auth/forgot-password
```

Body:

```json
{
  "email": "ada@example.com"
}
```

Resposta em desenvolvimento:

```json
{
  "message": "If the email exists, password reset instructions will be generated.",
  "resetToken": "token_para_teste_manual"
}
```

Resposta em producao:

```json
{
  "message": "If the email exists, password reset instructions will be generated."
}
```

### Redefinir Senha

```http
POST /api/auth/reset-password
```

Body:

```json
{
  "token": "token_para_teste_manual",
  "password": "newpassword123"
}
```

Resposta:

```json
{
  "message": "Password updated successfully"
}
```

## 6. Como Executar

Na raiz:

```bash
npm install
npm run prisma:generate
npm run prisma:migrate
npm run backend:dev
```

Crie o ambiente local:

```powershell
Copy-Item backend/.env.example backend/.env
```

Atualize `DATABASE_URL` e `JWT_SECRET` no arquivo `backend/.env`.

## 7. Como Testar

Validacoes tecnicas executadas:

```bash
npm run prisma:validate
npm run backend:typecheck
```

Com MySQL e API rodando, fluxo manual sugerido:

1. `POST /api/auth/register`
2. `GET /api/auth/me` usando `Authorization: Bearer <accessToken>`
3. `POST /api/auth/logout`
4. `POST /api/auth/login`
5. `POST /api/auth/forgot-password`
6. `POST /api/auth/reset-password`

## 8. Criterios de Aceite da Etapa 3

- Cadastro cria usuario com senha hasheada.
- Cadastro cria perfil e curriculo base inicial.
- Login valida credenciais e retorna JWT.
- Middleware protege rotas com `Authorization: Bearer`.
- Logout respeita modelo stateless.
- Recuperacao de senha usa token aleatorio e salva apenas hash.
- Redefinicao invalida token usado ou expirado.
- Nenhuma funcionalidade da Etapa 4 foi implementada.

## 9. Proxima Etapa

Etapa 4:

- CRUD completo do curriculo base.
- Edicao de dados pessoais.
- Edicao de formacoes, experiencias, projetos, habilidades, certificacoes, cursos, idiomas e links.

A Etapa 4 so deve iniciar apos confirmacao explicita.
