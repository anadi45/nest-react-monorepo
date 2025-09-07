# create-nest-react-monorepo

A CLI tool to create a new NestJS + React monorepo with TypeScript, powered by Nx.

## Quick Start

Create a new monorepo project:

```bash
npx create-nest-react-monorepo my-awesome-app
```

Or with npm:

```bash
npm create nest-react-monorepo my-awesome-app
```

Or with yarn:

```bash
yarn create nest-react-monorepo my-awesome-app
```

## What You Get

This template creates a modern, production-ready monorepo with:

- **🏗️ Monorepo Architecture**: Managed with Nx for optimal development experience
- **⚡ Backend**: NestJS with TypeScript
- **⚛️ Frontend**: React with TypeScript and Vite
- **🧪 Testing**: Jest for unit tests
- **🔧 Linting**: ESLint with TypeScript support
- **🐳 Docker**: Multi-stage builds for both development and production
- **🚀 Development Tools**: Hot reload, debugging support

## Usage

### Basic Usage

```bash
npx create-nest-react-monorepo my-project
cd my-project
npm run dev
```

### Options

- `--yes` or `-y`: Skip prompts and use defaults
- `--no-install`: Skip installing dependencies

```bash
npx create-nest-react-monorepo my-project --yes --no-install
```

## Project Structure

The generated project includes:

```
my-project/
├── client/                 # React frontend application
│   ├── src/
│   ├── Dockerfile         # Production Docker image
│   ├── Dockerfile.dev     # Development Docker image
│   ├── nginx.conf         # Nginx configuration
│   └── package.json
├── server/                 # NestJS backend application
│   ├── src/
│   ├── Dockerfile         # Production Docker image
│   ├── Dockerfile.dev     # Development Docker image
│   └── package.json
├── docker-compose.yml      # Production docker compose
├── docker-compose.dev.yml  # Development docker compose
├── nx.json                # Nx workspace configuration
└── package.json           # Root package.json
```

## Available Scripts

After creating your project, you can run:

### Development
- `npm run dev` - Start both client and server in development mode
- `npm run dev:server` - Start only the NestJS server
- `npm run dev:client` - Start only the React app

### Building
- `npm run build` - Build both applications for production
- `npm run build:server` - Build server only
- `npm run build:client` - Build client only

### Testing
- `npm run test` - Run all unit tests
- `npm run test:server` - Run server tests only
- `npm run test:client` - Run client tests only

### Docker
- `npm run docker:dev` - Start development containers
- `npm run docker:up` - Start production containers
- `npm run docker:build` - Build Docker images

## Requirements

- Node.js >= 18.0.0
- npm >= 8.0.0

## Contributing

Issues and pull requests are welcome! Please visit our [GitHub repository](https://github.com/anadi45/nest-react-monorepo).

## License

MIT License - see the [LICENSE](LICENSE) file for details.
