# 🐾 Clínica Veterinária

Aplicação front-end para gerenciamento de **consultas veterinárias**, desenvolvida em **Angular 22** (standalone components) com **Angular Material**. O sistema permite listar, cadastrar, editar, visualizar e excluir consultas, cada uma vinculada a um animal (nome, espécie, raça e idade).

> Este projeto consome uma **API REST externa** (não incluída neste repositório) para persistência dos dados. Veja a seção [Configuração da API](#-configuração-da-api).

---

## 📸 Demonstração

> Adicione aqui capturas de tela e GIFs mostrando a aplicação em funcionamento. Sugestão de itens para capturar:

| Tela | Preview |
|---|---|
| Listagem de consultas | `![Listagem de consultas](docs/screenshots/lista-consultas.png)` |
| Cadastro de nova consulta | `![Cadastro de consulta](docs/screenshots/nova-consulta.png)` |
| Detalhes da consulta | `![Detalhes da consulta](docs/screenshots/detalhe-consulta.png)` |
| Edição de consulta | `![Edição de consulta](docs/screenshots/editar-consulta.png)` |
| Exclusão com confirmação | `![Exclusão de consulta](docs/screenshots/excluir-consulta.png)` |
| Fluxo completo (GIF) | `![Fluxo completo](docs/gifs/fluxo-completo.gif)` |

**Como adicionar:**
1. Crie as pastas `docs/screenshots/` e `docs/gifs/` na raiz do projeto.
2. Salve suas imagens (`.png`/`.jpg`) e GIFs (`.gif`) lá dentro.
3. Substitua os caminhos de exemplo acima pelos nomes reais dos seus arquivos.
4. Ferramentas úteis para gravar GIFs: [ScreenToGif](https://www.screentogif.com/) (Windows), [Kap](https://getkap.co/) (Mac), [Peek](https://github.com/phw/peek) (Linux).

---

## ✨ Funcionalidades

- **Listagem de consultas** em tabela, com estados de carregamento e "lista vazia".
- **Cadastro de nova consulta** vinculada a um animal (via ID do animal).
- **Edição de consulta existente**, com formulário pré-preenchido.
- **Visualização de detalhes** de uma consulta (dados do animal + dados da consulta).
- **Exclusão de consulta**, com confirmação antes de remover.
- **Feedback visual** via *snack bars* (mensagens de sucesso/erro) e *spinners* de carregamento.
- Datas formatadas no padrão brasileiro (`pt-BR`).

---

## 🧱 Estrutura do projeto

```
angular-clinica-veterinaria/
├── src/
│   ├── app/
│   │   ├── app.ts                       # Componente raiz (App)
│   │   ├── app.html                     # Template raiz (<router-outlet />)
│   │   ├── app.css                      # Estilos do componente raiz
│   │   ├── app.config.ts                # Configuração da aplicação (providers globais)
│   │   ├── app.routes.ts                # Definição das rotas da aplicação
│   │   │
│   │   ├── core/                        # Camada "core": código transversal à app
│   │   │   ├── models/
│   │   │   │   └── consulta.model.ts    # Interfaces: Animal, Consulta, ConsultaRequest
│   │   │   └── services/
│   │   │       └── consulta.service.ts  # Serviço HTTP (CRUD de consultas)
│   │   │
│   │   └── features/                    # Camada "features": telas por domínio
│   │       └── consultas/
│   │           ├── consulta-list/       # Tela de listagem
│   │           ├── consulta-form/       # Tela de criação/edição (form reativo)
│   │           └── consulta-detail/     # Tela de detalhes
│   │
│   ├── environments/
│   │   ├── environment.ts               # apiUrl (desenvolvimento)
│   │   └── environment.prod.ts          # apiUrl (produção)
│   │
│   ├── material-theme.scss              # Tema do Angular Material (Material 3)
│   ├── styles.css                       # Estilos globais
│   ├── index.html                       # HTML principal
│   └── main.ts                          # Bootstrap da aplicação
│
├── public/                              # Assets estáticos (favicon, etc.)
├── angular.json                         # Configuração do Angular CLI
├── package.json                         # Dependências e scripts
└── tsconfig*.json                       # Configurações do TypeScript
```

### Padrão arquitetural

O projeto segue uma separação simples entre:

- **`core/`** — modelos (`models`) e serviços (`services`) reutilizáveis em toda a aplicação.
- **`features/`** — telas organizadas por domínio de negócio (no caso, `consultas`), cada uma como um **standalone component** carregado via *lazy loading* nas rotas (`loadComponent`).

Cada componente de feature segue o padrão de 4 arquivos do Angular:
```
consulta-list/
├── consulta-list.ts       # Lógica do componente
├── consulta-list.html     # Template
├── consulta-list.css      # Estilos
└── consulta-list.spec.ts  # Testes unitários
```

---

## 🛣️ Rotas da aplicação

| Rota | Componente | Descrição |
|---|---|---|
| `/` | — | Redireciona para `/consultas` |
| `/consultas` | `ConsultaList` | Lista todas as consultas |
| `/consultas/nova` | `ConsultaForm` | Formulário de cadastro |
| `/consultas/:id` | `ConsultaDetail` | Detalhes de uma consulta |
| `/consultas/:id/editar` | `ConsultaForm` | Formulário de edição (reaproveitado) |

---

## 🗃️ Modelo de dados

```typescript
interface Animal {
  id: number;
  nome: string;
  especie: string;
  raca: string;
  idade: number;
}

interface Consulta {
  id: number;
  animal: Animal;
  data_consulta: string;
  motivo: string;
  observacoes: string | null;
}

interface ConsultaRequest {
  animal_id: number;
  data_consulta: string;
  motivo: string;
  observacoes?: string;
}
```

O `ConsultaService` expõe as operações CRUD consumindo a API REST (`GET`, `POST`, `PUT`, `DELETE`) no endpoint `/consultas`.

---

## 🛠️ Stack tecnológica

- **[Angular 22](https://angular.dev/)** — standalone components, *lazy loading* de rotas, `signal()`.
- **[Angular Material 22](https://material.angular.dev/)** — componentes de UI (tabela, formulário, datepicker, snackbar, spinner, toolbar, cards).
- **RxJS** — programação reativa para chamadas HTTP.
- **Reactive Forms** — validação de formulários (`Validators.required`, `min`, `maxLength`).
- **Vitest** — testes unitários.
- **TypeScript**

---

## 🚀 Como executar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) (recomendado LTS mais recente)
- npm 10+
- Uma API REST rodando e compatível com o contrato descrito em [Modelo de dados](#️-modelo-de-dados) (endpoints `/consultas`)

### Passos

```bash
# 1. Instalar as dependências
npm install

# 2. Configurar a URL da API (ver seção abaixo)

# 3. Rodar o servidor de desenvolvimento
npm start
# ou: ng serve
```

Acesse `http://localhost:4200/` no navegador. A aplicação recarrega automaticamente a cada alteração nos arquivos-fonte.

### Build de produção

```bash
ng build
```

Os artefatos de build são gerados em `dist/`.

### Testes unitários

```bash
ng test
```

---

## ⚙️ Configuração da API

A URL base da API é definida nos arquivos de ambiente:

```typescript
// src/environments/environment.ts (desenvolvimento)
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000',
};
```

```typescript
// src/environments/environment.prod.ts (produção)
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000',
};
```

> ⚠️ **Atenção:** o arquivo `environment.prod.ts` atualmente aponta para `localhost:8000` e tem `production: false`. Isso deve ser corrigido antes de um deploy real (veja [Melhorias sugeridas](#-melhorias-sugeridas)).

A API deve expor endpoints REST no padrão:

| Método | Endpoint | Ação |
|---|---|---|
| `GET` | `/consultas/` | Listar consultas |
| `GET` | `/consultas/{id}` | Buscar consulta por ID |
| `POST` | `/consultas/` | Criar consulta |
| `PUT` | `/consultas/{id}` | Atualizar consulta |
| `DELETE` | `/consultas/{id}` | Excluir consulta |

---

## 🔧 Melhorias sugeridas

### Funcionalidades
- [ ] **CRUD de animais**: hoje o formulário exige digitar manualmente o `ID do animal`; o ideal seria um cadastro completo de animais com busca/autocomplete no formulário de consulta.
- [ ] **Cadastro e autenticação de usuários** (login, perfis de acesso — recepcionista, veterinário, admin).
- [ ] **Busca e filtros** na listagem (por nome do animal, período, status da consulta).
- [ ] **Paginação** na tabela de consultas para lidar com grandes volumes de dados.
- [ ] **Ordenação de colunas** na tabela (`matSort`).
- [ ] **Histórico clínico** do animal (prontuário, vacinas, exames, anexos de imagens/documentos).
- [ ] **Agenda/calendário** de consultas com visualização por dia/semana/mês.
- [ ] **Notificações/lembretes** de consultas futuras (e-mail, push).
- [ ] Exclusão com **feedback de erro** (atualmente o `excluir()` não recarrega a lista nem trata o `error` no `subscribe`).

### Qualidade de código e arquitetura
- [ ] Corrigir o import não utilizado/incorreto `Service, Inject` em `consulta.service.ts` (não fazem parte da API pública do `@angular/core` dessa forma).
- [ ] Adicionar **tratamento de erros centralizado** (interceptor HTTP) em vez de repetir `error: (error) => {...}` em cada componente.
- [ ] Criar um **`AnimalService`** e mover a lógica de consulta de animais para fora do formulário de consulta.
- [ ] Adicionar **guards de rota** (ex.: `CanDeactivate` para alertar sobre alterações não salvas no formulário).
- [ ] Corrigir `environment.prod.ts` (URL de produção real + `production: true`).
- [ ] Adicionar **variáveis de ambiente** via `.env`/CI para não versionar URLs sensíveis.
- [ ] Aumentar cobertura de **testes unitários** (atualmente os `.spec.ts` existem, mas cobrem pouco além do "deve criar o componente").
- [ ] Adicionar **testes end-to-end** (Cypress ou Playwright).
- [ ] Configurar **lint** (ESLint) e formatação automática (já há Prettier instalado, mas sem script dedicado em `package.json`).

### UX/UI
- [ ] Estados de **erro** mais visuais (não só snackbar) quando a API falhar completamente.
- [ ] **Modo escuro** (o tema Material já vem preparado para `color-scheme: light dark`).
- [ ] **Responsividade** para uso em tablets/celulares (útil em clínicas com atendimento móvel).
- [ ] **Confirmação de exclusão** via `MatDialog` em vez de `window.confirm()` (mais consistente com o Material Design).
- [ ] Indicadores de campos obrigatórios e melhoria nas mensagens de validação do formulário.
- [ ] Breadcrumbs / indicação clara de navegação entre as telas.

### DevOps
- [ ] Pipeline de **CI/CD** (build, lint, testes automatizados).
- [ ] Dockerfile para build e serving da aplicação.
- [ ] Deploy automatizado (Vercel, Netlify, Firebase Hosting, etc.).

---

## 📄 Licença

Defina aqui a licença do projeto (ex.: MIT, uso interno, etc.).