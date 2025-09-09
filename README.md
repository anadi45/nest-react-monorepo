# nest-react-monorepo

A CLI tool that generates modern, production-ready monorepos featuring NestJS backend and React frontend with TypeScript, powered by Nx.

## 🚀 Features

- **Dynamic Generation**: Always up-to-date with latest versions of React, NestJS, and Nx
- **Interactive Setup**: Choose your preferred package manager, bundler, and configurations
- **Future-Proof**: No static templates to maintain - uses Nx generators
- **Flexible**: Supports npm, yarn, pnpm with Vite or Webpack
- **Complete Setup**: Includes Docker, testing, and development configurations

## 📦 Installation & Usage

```bash
# Create a new monorepo
npx create-nest-react-monorepo my-awesome-app

# Or with options
npx create-nest-react-monorepo my-app --yes --no-install

# Get help
npx create-nest-react-monorepo --help
```

## 🛠️ Development

This repository contains the development environment for the npm package.

### Structure

```
├── create-package/          # The actual npm package
│   ├── bin/cli.js          # CLI tool
│   ├── package.json        # Package configuration
│   └── README.md           # Package documentation
└── package.json            # Development environment
```

### Testing

```bash
# Test the CLI locally
npm run test

# Clean up test files
npm run clean
```

## 🌟 What You Get

When you run the CLI, it will:

1. **Create Nx workspace** with your chosen package manager
2. **Generate React app** with your preferred bundler (Vite/Webpack)
3. **Generate NestJS app** with TypeScript
4. **Add Docker configurations** (optional)
5. **Configure testing setup** (optional)
6. **Set up development scripts** for easy workflow

## 📁 Generated Project Structure

```
my-awesome-app/
├── client/                 # React frontend application
├── server/                 # NestJS backend application
├── docker-compose.yml      # Production docker compose
├── docker-compose.dev.yml  # Development docker compose
├── nx.json                # Nx workspace configuration
└── package.json           # Root package.json with workspace scripts
```

## 🏃‍♂️ Quick Start

After creating your project:

```bash
cd my-awesome-app
npm install
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
