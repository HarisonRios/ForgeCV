# ForgeCV - Etapa 2

## 1. Objetivo

Esta etapa cria a base do backend do ForgeCV com:

- Node.js.
- Express.js.
- TypeScript.
- Prisma Client.
- Configuracao de conexao MySQL via variaveis de ambiente.
- Health check com teste real de banco.

Autenticacao, CRUD, upload, Gemini e PDF ainda nao entram nesta etapa.

## 2. Arquitetura

Estrutura criada:

```txt
package.json
package-lock.json
backend/
+-- package.json
+-- tsconfig.json
+-- .env.example
+-- .gitignore
+-- src/
    +-- app.ts
    +-- server.ts
    +-- config/
    |   +-- env.ts
    +-- shared/
        +-- errors/
        |   +-- app-error.ts
        +-- http/
        |   +-- middlewares/
        |   |   +-- error-handler.ts
        |   |   +-- not-found-handler.ts
        |   +-- routes/
        |       +-- health.routes.ts
        +-- prisma/
            +-- prisma.ts
```

O schema Prisma permanece centralizado em:

```txt
database/prisma/schema.prisma
```

O `package.json` da raiz atua como orquestrador do monorepo e contem os scripts Prisma. O backend mantem seus proprios scripts e delega os comandos Prisma para a raiz.

## 3. Decisoes Tecnicas

### Separacao entre app e server

`app.ts` cria e configura o Express.

`server.ts` inicia o listener HTTP e cuida do encerramento gracioso.

Isso facilita testes futuros, porque os testes poderao importar o app sem subir porta.

### Configuracao de ambiente com Zod

`src/config/env.ts` valida:

- `NODE_ENV`
- `PORT`
- `API_PREFIX`
- `CORS_ORIGIN`
- `DATABASE_URL`

Se alguma variavel obrigatoria estiver invalida, a API falha no boot com mensagem clara.

### Prisma Client centralizado

`src/shared/prisma/prisma.ts` exporta uma unica instancia do Prisma Client.

Em desenvolvimento, a instancia e reaproveitada no `globalThis` para evitar multiplas conexoes quando o watcher recarregar o processo.

O Prisma Client e gerado em:

```txt
backend/src/generated/prisma
```

Esse diretorio e ignorado pelo Git e deve ser recriado com `npm run prisma:generate`.

### Health check com banco

`GET /api/health` executa:

```sql
SELECT 1
```

Se o MySQL estiver acessivel, retorna `database: "connected"`.

## 4. Variaveis de Ambiente

Arquivo de exemplo:

```txt
backend/.env.example
```

Para executar localmente, crie:

```txt
backend/.env
```

Com conteudo semelhante:

```env
NODE_ENV=development
PORT=3333
API_PREFIX=/api
CORS_ORIGIN=http://localhost:3000
DATABASE_URL="mysql://forgecv_user:forgecv_password@localhost:3306/forgecv"
```

Altere usuario, senha, host, porta e banco conforme sua instalacao MySQL.

## 5. Como Executar

Na raiz do monorepo:

```bash
npm install
npm run prisma:generate
npm run prisma:validate
npm run backend:dev
```

Antes de subir a API, crie o `.env` do backend:

```bash
cp backend/.env.example backend/.env
```

No Windows PowerShell, para copiar o `.env`:

```powershell
Copy-Item backend/.env.example backend/.env
```

Tambem e possivel executar os scripts diretamente dentro de `backend`, depois da instalacao da raiz:

```bash
cd backend
npm run prisma:generate
npm run prisma:validate
npm run prisma:migrate
npm run dev
```

## 6. Como Testar

Com a API rodando:

```bash
curl http://localhost:3333/api/health
```

Resposta esperada:

```json
{
  "status": "ok",
  "service": "forgecv-api",
  "database": "connected"
}
```

Validacoes tecnicas:

```bash
npm run backend:typecheck
npm run prisma:validate
```

Observacao: `npm run prisma:migrate` exige um MySQL acessivel e um `DATABASE_URL` valido.

## 7. Criterios de Aceite da Etapa 2

- Backend Express criado.
- TypeScript configurado.
- Prisma Client instalado/configurado no projeto.
- Scripts Prisma apontam para `database/prisma/schema.prisma`.
- Conexao MySQL controlada por `DATABASE_URL`.
- Health check testa a conexao com o banco.
- Nenhuma funcionalidade da Etapa 3 foi implementada.

## 8. Proxima Etapa

Etapa 3:

- Sistema de autenticacao JWT.
- Cadastro.
- Login.
- Logout sem estado no servidor.
- Recuperacao de senha.

A Etapa 3 so deve iniciar apos confirmacao explicita.
