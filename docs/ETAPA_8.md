# ForgeCV - Etapa 8

## 1. Objetivo

Esta etapa implementa a Geração de PDF a partir do currículo forjado.
Utilizando a identidade visual da marca ("ForgeCV") com tema escuro e detalhes em tons de laranja ("fogo/brasa"), o sistema injeta os dados do `ForgedResume` em um template HTML e usa o **Puppeteer** para renderizar e exportar o arquivo em PDF de alta qualidade.

## 2. Arquitetura

Um novo módulo focado em PDF foi criado:

```txt
backend/src/modules/pdf/
+-- application/
|   +-- pdf.service.ts
+-- templates/
    +-- resume.hbs
```

O download é exposto através da rota de `forged-resumes`, para centralizar a responsabilidade de "currículos forjados" na API:
- `backend/src/modules/forged-resume/http/forged-resume.controller.ts`

Responsabilidades:
- `resume.hbs`: Template em HTML utilizando a *template engine* **Handlebars** e CSS embarcado. Ele define o design final seguindo as regras da UI (Fundo `#1E1E1E`, destaques em `#FF6B00` e `#FFB000`).
- `pdf.service.ts`: Lê o template, injeta as variáveis (usuário, perfil, experiências selecionadas, habilidades selecionadas), compila o HTML e abre o **Puppeteer** no backend para salvar a página como Buffer de PDF.
- `forged-resume.controller.ts`: O método `downloadPdf` retorna o buffer gerado pelo Puppeteer enviando o cabeçalho `Content-Type: application/pdf`, permitindo que o navegador baixe ou exiba o currículo forjado.

## 3. Decisões Técnicas

### Handlebars e Puppeteer
Optamos pelo Handlebars devido à facilidade de loops iterativos (`{{#each experiences}}`) com objetos JSON complexos que salvamos no banco na Etapa 7. O Puppeteer foi escolhido porque é o padrão-ouro de fidelidade de renderização Web-to-PDF em Node.js, respeitando todo o CSS e margens de impressão (A4).

### Design Escuro por Padrão
Foi solicitado que a interface fosse *"Modo escuro por padrão"* baseada na forja. O PDF também foi construído seguindo essa identidade, de modo que o candidato enviará um currículo com um visual ousado e marcante (Dark Mode), reforçando a ideia de um "currículo premium de SaaS de tecnologia".

## 4. Endpoints

### Baixar PDF do Currículo Forjado

```http
GET /api/forged-resumes/:id/download-pdf
```
Headers: `Authorization: Bearer <accessToken>`

Retorna (200): Arquivo Binário (PDF). O navegador fará o download de `forgecv-<id>.pdf`.

## 5. Próxima Etapa

**Etapa 9: Dashboard**
- Construção de endpoints analíticos.
- Cálculo de estatísticas principais: quantidade de currículos gerados, últimas vagas analisadas, compatibilidade média, etc.

A Etapa 9 aguarda confirmação para ser iniciada.
