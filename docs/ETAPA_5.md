# ForgeCV - Etapa 5

## 1. Objetivo

Esta etapa implementa o upload e processamento inicial do currículo PDF base do usuário.
O sistema recebe um PDF, armazena o arquivo e extrai o texto contido nele para ser usado posteriormente pela Inteligência Artificial.

## 2. Arquitetura

O módulo de uploads foi adicionado:

```txt
backend/src/modules/uploads/
+-- application/
|   +-- resume-pdf.service.ts
+-- http/
|   +-- resume-pdf.controller.ts
|   +-- resume-pdf.routes.ts
|   +-- resume-pdf-upload.middleware.ts
+-- infra/
    +-- pdf-text-extractor.ts
```

Responsabilidades:
- `resume-pdf-upload.middleware.ts`: Middleware usando `multer` configurado para aceitar apenas arquivos PDF até 5MB, salvos temporariamente ou permanentemente de acordo com a estratégia.
- `pdf-text-extractor.ts`: Utiliza a biblioteca `pdf-parse` para ler o PDF e extrair seu texto bruto.
- `resume-pdf.service.ts`: Serviço que orquestra o salvamento do arquivo, extração de texto e registro/atualização no banco de dados via Prisma (`BaseResume`).
- `resume-pdf.controller.ts` e `resume-pdf.routes.ts`: Exposição dos endpoints REST para upload, consulta e deleção.

## 3. Decisões Técnicas

### Upload com Multer
O arquivo é salvo temporariamente no sistema de arquivos local (`/uploads` ou pasta temporária) usando o `multer` configurado com `diskStorage` ou armazenamento na própria pasta temp do SO, facilitando o processamento da API de IA posteriormente ou a recuperação. 

### Extração de Texto via pdf-parse
O texto extraído do currículo é essencial para servir como contexto para a IA. Removemos excessos de quebra de linha e espaços para manter o texto otimizado no banco (`originalPdfText`).

### BaseResume Upsert
Como os campos relacionados ao PDF original (como `originalPdfUrl`, `originalPdfName`, `originalPdfText`, etc) estão no modelo `BaseResume`, nós atualizamos o registro existente (caso o usuário já tenha editado seu currículo base) ou criamos um novo com base nos dados extraídos do PDF.

## 4. Endpoints

Base URL: `/api/uploads/resume`

Todas as rotas exigem:
`Authorization: Bearer <accessToken>`

### Fazer Upload do PDF

```http
POST /api/uploads/resume
Content-Type: multipart/form-data
```
Body (FormData):
- `file`: Arquivo PDF (máx 5MB)

Retorna (201):
```json
{
  "message": "Original PDF uploaded and processed successfully",
  "pdf": {
    "originalPdfName": "curriculo.pdf",
    "originalPdfMimeType": "application/pdf",
    "originalPdfSize": 45362,
    "originalPdfUploadedAt": "2026-06-21T00:00:00.000Z",
    "extractedTextLength": 2500
  }
}
```

### Consultar PDF Enviado

```http
GET /api/uploads/resume
```
Retorna (200):
```json
{
  "pdf": {
    "originalPdfName": "curriculo.pdf",
    "originalPdfMimeType": "application/pdf",
    "originalPdfSize": 45362,
    "originalPdfText": "Texto extraído...",
    "originalPdfUploadedAt": "2026-06-21T00:00:00.000Z",
    "extractedTextLength": 2500
  }
}
```

### Remover PDF

```http
DELETE /api/uploads/resume
```
Retorna: `204 No Content`

## 5. Correções Realizadas

Ao validar esta etapa, foi corrigido um erro de compilação do TypeScript causado por tipagens ausentes da biblioteca `pdf-parse`. As dependências corretas de tipo foram adicionadas e o uso do módulo ajustado em `infra/pdf-text-extractor.ts`. O projeto agora realiza o build com sucesso.

## 6. Próxima Etapa

**Etapa 6: Integração com Gemini API**
- Recebimento da chave do Google Gemini.
- Criação do serviço de inteligência artificial.
- Desenvolvimento do prompt base que recebe as experiências do usuário e a vaga desejada para forjar o novo currículo.

A Etapa 6 aguarda confirmação para ser iniciada.
