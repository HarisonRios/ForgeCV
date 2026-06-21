# ForgeCV - Etapa 1

## 1. Objetivo

Esta etapa define a base do produto ForgeCV antes de iniciar a implementacao.

O objetivo e consolidar:

- Requisitos funcionais do MVP.
- Requisitos nao funcionais.
- Arquitetura geral do monorepo.
- Modelo inicial do banco de dados com Prisma e MySQL.
- Decisoes tecnicas para orientar as proximas etapas.

Nenhum backend, frontend, autenticacao, IA, upload ou geracao de PDF sera implementado nesta etapa.

## 2. Produto

ForgeCV e um SaaS para forjar curriculos personalizados para vagas especificas usando IA.

O usuario cadastra seus materiais profissionais uma vez:

- Dados pessoais.
- Formacao academica.
- Experiencias profissionais.
- Projetos.
- Habilidades.
- Certificacoes.
- Cursos.
- Idiomas.
- Links profissionais.
- Curriculo PDF original opcional.

Depois disso, o usuario cola a descricao de uma vaga. A IA analisa a vaga, compara com os dados cadastrados, reorganiza os itens relevantes e retorna uma versao otimizada do curriculo.

Regra central: a IA nunca deve inventar experiencias, habilidades, certificacoes, cursos ou projetos. Ela apenas seleciona, reorganiza, resume e destaca informacoes reais cadastradas pelo usuario.

## 3. Branding e Produto

Nome do projeto: ForgeCV.

Conceito: uma forja transforma materia-prima em algo valioso; o ForgeCV transforma um curriculo base em versoes otimizadas para oportunidades especificas.

Tom da marca:

- Profissional.
- Tecnologico.
- Criativo.
- Moderno.
- Voltado para estudantes e profissionais em inicio de carreira.

Paleta definida:

- Background principal: `#1E1E1E`
- Background secundario: `#2D2D2D`
- Bordas: `#4A4A4A`
- Laranja forja: `#FF6B00`
- Destaque: `#FFB000`
- Texto principal: `#FFFFFF`
- Texto secundario: `#D6D6D6`

Terminologia:

- "Forjar Curriculo" em vez de "Gerar Curriculo".
- "Forge Resume" em vez de "Generate Resume".
- "Forja" para a area de criacao.
- "Materiais" para experiencias, habilidades e projetos.
- "Biblioteca" para curriculos ja gerados.
- "Compatibilidade da Forja" para o score.

Observacao sobre logo e referencia visual:

- A referencia enviada aponta para uma fornalha de Minecraft.
- O projeto nao deve usar esse asset diretamente.
- A logo deve ser original, inspirada em forja, metal aquecido, voxel sutil e produto SaaS moderno, sem copiar elementos protegidos.

## 4. Requisitos Funcionais do MVP

### Autenticacao

- Cadastro.
- Login.
- Logout.
- Recuperacao de senha.

### Perfil e Curriculo Base

- Editar perfil.
- Editar curriculo base.
- Cadastrar dados pessoais.
- Cadastrar formacao academica.
- Cadastrar experiencias profissionais.
- Cadastrar projetos.
- Cadastrar habilidades.
- Cadastrar certificacoes.
- Cadastrar cursos.
- Cadastrar idiomas.
- Cadastrar links profissionais.
- Fazer upload opcional de curriculo PDF original.

### Curriculos Forjados

- Criar curriculo personalizado a partir de uma vaga.
- Listar curriculos forjados.
- Visualizar curriculo forjado.
- Baixar PDF.

### IA

A IA deve receber:

- Dados reais do usuario.
- Descricao da vaga.

A IA deve retornar:

```json
{
  "score": 0,
  "resumo": "",
  "habilidades": [],
  "experiencias": [],
  "projetos": [],
  "palavrasChaveEncontradas": [],
  "palavrasChaveAusentes": []
}
```

### Dashboard

- Estatisticas principais.
- Curriculos forjados.
- Vagas analisadas.
- Compatibilidade media.
- Ultimas forjas realizadas.

## 5. Requisitos Nao Funcionais

- TypeScript em todo o projeto.
- Clean Architecture sempre que possivel.
- Principios SOLID.
- Variaveis de ambiente.
- Banco MySQL.
- Prisma como ORM.
- Autenticacao JWT.
- Upload com Multer.
- PDF com HTML + Puppeteer.
- IA com Google Gemini API.
- API sem dependencias de implementacao do frontend.
- Nao inventar APIs externas.
- Nao criar funcionalidades ficticias.
- Codigo preparado para evolucao incremental.

## 6. Arquitetura Geral

Monorepo desejado:

```txt
curriculo-ai/
+-- frontend/
|   +-- Next.js App Router
+-- backend/
|   +-- Express + TypeScript
+-- database/
|   +-- prisma/
|       +-- schema.prisma
+-- docs/
    +-- ETAPA_1.md
```

Responsabilidades:

- `frontend`: interface Next.js, Tailwind CSS, telas de autenticacao, perfil, forja, biblioteca, dashboard e visualizacao de curriculos.
- `backend`: API REST com Express, casos de uso, validacoes, autenticacao, integracoes com Prisma, Gemini, Multer e Puppeteer.
- `database`: schema Prisma, migrations e futuras seeds.
- `docs`: documentacao incremental das etapas.

## 7. Arquitetura do Backend Planejada

Estrutura proposta para a Etapa 2 em diante:

```txt
backend/
+-- src/
|   +-- app.ts
|   +-- server.ts
|   +-- config/
|   +-- modules/
|   |   +-- auth/
|   |   +-- users/
|   |   +-- resumes/
|   |   +-- job-analyses/
|   |   +-- forged-resumes/
|   |   +-- uploads/
|   |   +-- dashboard/
|   +-- shared/
|   |   +-- errors/
|   |   +-- middlewares/
|   |   +-- prisma/
|   |   +-- validators/
|   |   +-- utils/
|   +-- integrations/
|       +-- gemini/
|       +-- puppeteer/
+-- package.json
```

Padrao por modulo:

```txt
module/
+-- domain/
+-- application/
+-- infra/
+-- http/
```

Intencao:

- `domain`: regras centrais e entidades conceituais.
- `application`: casos de uso.
- `infra`: Prisma, servicos externos e persistencia.
- `http`: controllers, rotas e DTOs.

## 8. Decisoes Tecnicas

### IDs

O schema usa `cuid()` para IDs textuais.

Motivo:

- Facilita uso distribuido.
- Evita expor IDs incrementais.
- Funciona bem com Prisma e MySQL.

### Dados do curriculo base

O curriculo base foi modelado de forma normalizada:

- `BaseResume`
- `Education`
- `WorkExperience`
- `Project`
- `Skill`
- `Certification`
- `Course`
- `Language`
- `ProfessionalLink`

Motivo:

- CRUD mais claro.
- Melhor validacao.
- Menos risco de dados inconsistentes.
- Facilita a IA receber dados estruturados.

### Campos JSON

Campos JSON foram usados em pontos flexiveis:

- `achievements`
- `technologies`
- `highlights`
- respostas selecionadas pela IA
- palavras-chave encontradas e ausentes
- resposta bruta da IA

Motivo:

- Listas dinamicas podem variar por usuario e vaga.
- Mantem a estrutura da IA sem criar tabelas artificiais prematuramente.
- Preserva auditoria da resposta.

### Curriculo forjado separado do curriculo base

`ForgedResume` armazena a versao otimizada, sem alterar o curriculo base.

Motivo:

- O usuario pode gerar varias versoes para vagas diferentes.
- Mantem historico.
- Permite comparar scores e evolucao.

### Analise de vaga separada

`JobAnalysis` registra a descricao da vaga e o resultado da analise.

Motivo:

- Permite dashboard de vagas analisadas.
- Permite reprocessamento.
- Permite auditar falhas da IA.

### Recuperacao de senha

`PasswordResetToken` armazena apenas hash do token.

Motivo:

- Evita armazenar tokens sensiveis em texto puro.
- Permite expirar e invalidar tokens.

### Soft delete parcial

`User` possui `deletedAt`.

Motivo:

- Permite desativacao logica de conta.
- Evita perda acidental imediata de historico.

Nesta etapa, as demais entidades usam cascade delete por simplicidade operacional. Politicas mais rigidas de retencao podem ser definidas antes do deploy.

## 9. Modelagem do Banco

Arquivo criado:

```txt
database/prisma/schema.prisma
```

Principais entidades:

- `User`: conta do usuario.
- `UserProfile`: dados pessoais e resumo geral.
- `PasswordResetToken`: recuperacao de senha.
- `BaseResume`: curriculo base do usuario.
- `Education`: formacao academica.
- `WorkExperience`: experiencias profissionais.
- `Project`: projetos.
- `Skill`: habilidades.
- `Certification`: certificacoes.
- `Course`: cursos.
- `Language`: idiomas.
- `ProfessionalLink`: links profissionais.
- `JobAnalysis`: analise da vaga.
- `ForgedResume`: curriculo personalizado gerado pela forja.

## 10. Estrutura Criada Nesta Etapa

```txt
curriculo-ai/
+-- database/
|   +-- prisma/
|       +-- schema.prisma
+-- docs/
    +-- ETAPA_1.md
```

## 11. Como Executar

Nesta etapa ainda nao ha aplicacao executavel.

Quando a Etapa 2 criar o backend e instalar dependencias, os comandos esperados serao:

```bash
cd backend
npm install
npx prisma generate --schema ../database/prisma/schema.prisma
npx prisma migrate dev --schema ../database/prisma/schema.prisma
npm run dev
```

## 12. Como Testar

Nesta etapa, a validacao e conceitual e estrutural:

- Conferir se o schema cobre todos os dados do MVP.
- Conferir se as relacoes permitem um usuario ter um curriculo base e varios curriculos forjados.
- Conferir se `JobAnalysis` permite historico de vagas analisadas.
- Conferir se `ForgedResume` preserva o retorno da IA sem modificar o curriculo base.

Na Etapa 2, apos instalar Prisma, o primeiro teste tecnico sera:

```bash
npx prisma validate --schema ../database/prisma/schema.prisma
```

## 13. Criterios de Aceite da Etapa 1

- Requisitos do MVP registrados.
- Branding ForgeCV incorporado.
- Arquitetura geral definida.
- Modelagem Prisma inicial criada.
- Proximas etapas respeitam a ordem definida.
- Nenhum desenvolvimento da Etapa 2 iniciado.

## 14. Proxima Etapa

Etapa 2:

- Setup do backend Express.
- Configuracao Prisma.
- Conexao MySQL.

A Etapa 2 so deve iniciar apos confirmacao explicita.
