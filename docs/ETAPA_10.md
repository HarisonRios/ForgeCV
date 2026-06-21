# ForgeCV - Etapa 10

## 1. Objetivo

Esta etapa cria a fundação do **Frontend** do ForgeCV.
Inicializamos o projeto com **Next.js (App Router)** utilizando TypeScript e a nova versão do Tailwind CSS. Também estabelecemos as raízes visuais e configurações para integrar com as APIs construídas nas etapas anteriores.

## 2. Arquitetura

O monorepo agora possui a pasta `frontend` em conjunto com a pasta `backend`.

```txt
curriculo-ai/
+-- backend/
|   +-- src/ (Express API)
+-- frontend/
|   +-- src/app/
|       +-- globals.css
|       +-- page.tsx
|       +-- layout.tsx
+-- package.json (raiz)
```

Responsabilidades:
- `globals.css`: Define as propriedades globais, o fundo (`#1E1E1E`) que simula o *dark mode* natural de uma forja, e injeta classes utilitárias como `.btn-primary` para manter a consistência em todos os componentes.
- `package.json` raiz: Agora orquestra comandos tanto do backend quanto do frontend (ex: `npm run frontend:dev`).

## 3. Decisões Técnicas

### Tailwind v4 e CSS Variáveis
Usamos o `@theme inline` padrão das novas versões do Tailwind (Next.js scaffold) para atrelar rapidamente as variáveis de cor exigidas (como `--orange-forge`) diretamente nas chaves utilitárias, permitindo o uso de classes customizadas ao longo da interface.

### Axios e Lucide React
Instalamos o `axios` para padronizar o consumo da API protegida por JWT e interceptar requisições. Instalamos o `lucide-react` para uso de ícones vetoriais modernos e leves, combinando com o minimalismo exigido no design da "Forja".

## 4. Como Executar

Para iniciar o ambiente do frontend:
```bash
npm run frontend:dev
```
O servidor abrirá em `http://localhost:3000`.

## 5. Próxima Etapa

**Etapa 11: Landing Page & Autenticação**
- Construção da UI de Landing Page para apresentação do SaaS.
- Telas de Login e Cadastro (UI/UX limpa, modal ou página dedicada).
- Conexão do fluxo de login gerando o JWT em cookies ou context API.

A Etapa 11 aguarda confirmação para ser iniciada.
