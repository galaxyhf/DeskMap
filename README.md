# DeskMap - Sistema de Gerenciamento de Atendimentos Técnicos

Sistema web full-stack simples para gerenciamento de atendimentos técnicos com CRUD completo, utilizando tecnologias modernas.

## � Segurança

**⚠️ IMPORTANTE:** Este projeto utiliza variáveis de ambiente para informações sensíveis.

- **NUNCA** commite o arquivo `.env` para o repositório
- Use `.env.example` como template e crie seu próprio `.env`
- Mantenha suas credenciais de banco de dados em segredo
- Configure variáveis de ambiente diferentes para desenvolvimento, staging e produção

## �🚀 Stack Tecnológico

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Sequelize** - ORM para MySQL
- **MySQL** - Banco de dados relacional
- **CORS** - Controle de origem cruzada
- **dotenv** - Gerenciamento de variáveis de ambiente

### Frontend
- **React 19** - UI library
- **Vite** - Build tool e dev server
- **TypeScript** (strict mode) - Tipagem estática
- **Tailwind CSS v4** - Utility-first CSS
- **Shadcn/UI** - Componentes reutilizáveis
- **React Router DOM** - Roteamento
- **React Hook Form + Zod** - Validação de formulários
- **TanStack Query** - Gerenciamento de estado e cache
- **Axios** - Cliente HTTP
- **Sonner** - Toast notifications
- **date-fns** - Manipulação de datas
- **XLSX** - Exportação para Excel

## 📋 Modelo de Dados

### Atendimento
```typescript
{
  id: bigint (auto-increment)
  referencia: date
  numeroAtendimento: bigint
  tipoAtendimento: string
  motivoReconversao: string (opcional)
  sistema: string
  tecnicoResponsavel: string
  dataColeta: date
  dataConclusao: date (opcional)
  quantidadeDias: int (calculado automaticamente)
  conferenciaPor: string (opcional)
}
```

### Regras de Negócio
- `quantidadeDias` = diferença em dias entre `dataColeta` e `dataConclusao` (ou data atual se não concluído)
- `dataConclusao` não pode ser menor que `dataColeta`

## 🔌 Endpoints API

```
GET    /api/atendimentos              - Listar atendimentos (com paginação e filtros)
GET    /api/atendimentos/:id          - Obter atendimento por ID
POST   /api/atendimentos              - Criar novo atendimento
PUT    /api/atendimentos/:id          - Atualizar atendimento
DELETE /api/atendimentos/:id          - Deletar atendimento
GET    /health                        - Health check
```

### Query Params (GET /api/atendimentos)
- `page` - Número da página (padrão: 1)
- `limit` - Itens por página (padrão: 10)
- `tecnicoResponsavel` - Filtrar por técnico
- `sistema` - Filtrar por sistema
- `tipoAtendimento` - Filtrar por tipo
- `dataInicio` - Filtrar por data inicial (YYYY-MM-DD)
- `dataFim` - Filtrar por data final (YYYY-MM-DD)

## 🎨 Frontend - Funcionalidades

### Página Única (/)
- ✅ Tabela de atendimentos com paginação e ordenação
- ✅ Filtros avançados (técnico, sistema, tipo, data)
- ✅ Modal para criar/editar/deletar atendimentos
- ✅ Validação em tempo real (React Hook Form + Zod)
- ✅ Estados de loading com skeletons
- ✅ Notificações toast (sucesso e erro)
- ✅ Exportação para Excel
- ✅ Responsivo e mobile-friendly

## 📦 Instalação

### Pré-requisitos
- Node.js 18+
- MySQL 8.0+
- npm ou yarn

### 1. Clonar o repositório
```bash
git clone <repository-url>
cd DeskMap
```

### 2. Configurar Banco de Dados

#### Criar banco e tabelas
```bash
mysql -u root -p < database.sql
```

Ou manualmente:
1. Abra o MySQL Workbench ou cliente MySQL
2. Execute o conteúdo do arquivo `database.sql`

### 3. Configurar e Instalar Backend

```bash
cd backend

# Copiar arquivo de exemplo e configurar
cp .env.example .env

# ⚠️ IMPORTANTE: Editar .env com suas credenciais
# NÃO use as credenciais de exemplo em produção!
# Configure valores reais:
# DB_HOST=seu_host_mysql
# DB_PORT=3306
# DB_NAME=seu_banco_dados
# DB_USER=seu_usuario_mysql
# DB_PASSWORD=sua_senha_forte
# PORT=3000
# NODE_ENV=development

# Instalar dependências
npm install

# Iniciar servidor
npm run dev
```

O backend estará disponível em `http://localhost:3000`

### 4. Configurar e Instalar Frontend

```bash
cd frontend

# Copiar arquivo de exemplo
cp .env.example .env

# ⚠️ IMPORTANTE: Editar .env com a URL da sua API
# VITE_API_URL=http://localhost:3000/api (desenvolvimento)
# VITE_API_URL=https://sua-api.com/api (produção)

# Instalar dependências
npm install

# Iniciar dev server
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

## 🧪 Scripts Disponíveis

### Backend
```bash
npm run dev       # Inicia servidor em modo desenvolvimento
npm run start     # Inicia servidor em produção
npm run lint      # Verifica e corrige erros de linting
npm run format    # Formata código com Prettier
```

### Frontend
```bash
npm run dev       # Inicia dev server
npm run build     # Build para produção
npm run lint      # Verifica erros de linting
npm run preview   # Preview do build de produção
npm run format    # Formata código com Prettier
```

## 📂 Estrutura do Projeto

### Backend
```
backend/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── index.js
│   │   └── atendimento.model.js
│   ├── controllers/
│   │   └── atendimento.controller.js
│   ├── routes/
│   │   └── atendimento.routes.js
│   ├── middleware/
│   │   ├── error.middleware.js
│   │   └── cors.middleware.js
│   ├── utils/
│   │   └── helpers.js
│   └── app.js
├── server.js
├── package.json
├── .env.example
├── .eslintrc.json
└── .prettierrc.json
```

### Frontend
```
frontend/
├── src/
│   ├── components/
│   │   ├── AtendimentoTable.tsx
│   │   ├── AtendimentoForm.tsx
│   │   ├── Filters.tsx
│   │   └── Layout.tsx
│   ├── services/
│   │   └── api.ts
│   ├── hooks/
│   │   └── useAtendimentos.ts
│   ├── types/
│   │   └── atendimento.ts
│   ├── App.tsx
│   ├── main.tsx
│   ├── App.css
│   └── index.css
├── public/
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
├── .env.example
├── .eslintrc.js
├── .prettierrc.json
└── components.json (Shadcn/UI config)
```

## 🔍 Tipos de Atendimento

- **Suporte** - Atendimentos de suporte técnico
- **Incidente** - Incidentes críticos
- **Manutenção** - Manutenção preventiva/corretiva
- **Implementação** - Implementação de novas funcionalidades

## 📝 Boas Práticas Implementadas

### Backend
- ✅ Separação de responsabilidades (MVC)
- ✅ Middleware global de erro
- ✅ Validação em controllers
- ✅ Sincronização automática de modelos Sequelize
- ✅ CORS configurado
- ✅ Variáveis de ambiente com dotenv
- ✅ Índices de banco de dados para performance
- ✅ Constraints de validação no banco

### Frontend
- ✅ Componentes reutilizáveis e isolados
- ✅ Tipagem TypeScript strict
- ✅ Validação com Zod schemas
- ✅ Gerenciamento de estado com React Query
- ✅ Custom hooks para lógica reutilizável
- ✅ Tratamento de erros e loading states
- ✅ Layout mínimo em App.tsx
- ✅ Responsividade com Tailwind
- ✅ Code splitting e lazy loading
Variáveis de Ambiente

### Backend (.env)

⚠️ **Nunca commite este arquivo!** Use valores reais apenas localmente.

```env
# Configuração do Banco de Dados
DB_HOST=                # Host do MySQL (ex: localhost)
DB_PORT=                # Porta do MySQL (padrão: 3306)
DB_NAME=                # Nome do banco de dados
DB_USER=                # Usuário do MySQL
DB_PASSWORD=            # Senha do MySQL (use senhas fortes!)

# Configuração do Servidor
PORT=                   # Porta do servidor (padrão: 3000)
NODE_ENV=development    # Ambiente: development, staging, production
```

### Frontend (.env)

⚠️ **Nunca commite este arquivo!**

```env
# URL da API
VITE_API_URL=          # URL completa da API (ex: http://localhost:3000/api)
```

### Arquivos .env.example

Os arquivos `.env.example` servem como templates e **podem** ser commitados.
Use-os para documentar quais variáveis são necessárias, mas sem valores reais.E_API_URL=http://localhost:3000/api
```

## 🔒 Validações

### Backend
- Campos obrigatórios verificados no controller
- Validação de datas (dataConclusao >= dataColeta)
- Constraint de chave única para numeroAtendimento
- Check constraint no banco para datas

### Frontend
- Zod schemas para validação em tempo real
- React Hook Form para gerenciamento de formulário
- Validação de datas (não permite datas futuras)
- Feedback imediato para o usuário

## 📊 Exportação para Excel

- Exporta todos os dados da tabela filtrada/paginada
- Inclui cabeçalhos formatados
- Arquivo nomeado com data: `atendimentos-DD-MM-YYYY.xlsx`
- Formatação de datas em português

## 🚨 Tratamento de Erros

- Middleware centralizado no backend
- Toasts informativos no frontend
- Mensagens de erro em português
- Log de erros no console do servidor

## 📱 Responsividade

- Design mobile-first
- Breakpoints Tailwind (sm, md, lg, xl)
- Componentes adaptáveis a diferentes tamanhos

## 🔄 Status da Aplicação

- Health check endpoint: `GET /health`
- Swagger em: /docs
- Sincronização automática do banco ao iniciar
- Logs informativos no console

## 📄 Licença

MIT

## 👨‍💻 Suporte

Para reportar bugs ou sugerir melhorias, abra uma issue no repositório.

---

**Desenvolvido por Caio Silva - 2025**
