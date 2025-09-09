# nest-react-monorepo

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
│   ├── src/               # React source code
│   ├── public/            # Static assets
│   ├── index.html         # HTML template
│   ├── vite.config.ts     # Vite configuration
│   ├── Dockerfile         # Docker configuration (if enabled)
│   └── package.json       # Client dependencies
├── server/                 # NestJS backend application
│   ├── src/               # NestJS source code
│   ├── webpack.config.js  # Webpack configuration
│   ├── Dockerfile         # Docker configuration (if enabled)
│   └── package.json       # Server dependencies
├── client-e2e/            # Client end-to-end tests
├── server-e2e/            # Server end-to-end tests
├── packages/              # Shared packages (if any)
├── docker-compose.yml     # Docker Compose configuration (if enabled)
├── nx.json               # Nx workspace configuration
├── tsconfig.base.json    # Base TypeScript configuration
└── package.json          # Root package.json with workspace scripts
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
- `npm run docker:build` - Build Docker images
- `npm run docker:up` - Start containers
- `npm run docker:down` - Stop containers

## Docker Usage

If you enabled Docker during setup, you can run the project using Docker:

```bash
# Build and start with Docker
npm run docker:build
npm run docker:up

# Or use docker-compose directly
docker-compose up --build

# Stop containers
npm run docker:down
# or
docker-compose down
```

**Docker Benefits:**
- Consistent environment across different machines
- Easy deployment to production
- Isolated dependencies
- No need to install Node.js locally

## Requirements

- Node.js >= 18.0.0
- npm >= 8.0.0

## Contributing

Issues and pull requests are welcome! Please visit our [GitHub repository](https://github.com/anadi45/nest-react-monorepo).

## License

MIT License - see the [LICENSE](LICENSE) file for details.
