#!/usr/bin/env node

const { Command } = require('commander');
const kleur = require('kleur');
const fs = require('fs-extra');
const path = require('path');
const ora = require('ora');
const prompts = require('prompts');
const { execSync } = require('child_process');

const program = new Command();

program
  .name('create-nest-react-monorepo')
  .description('Create a new NestJS + React monorepo with TypeScript')
  .version('1.0.0')
  .argument('[project-name]', 'name of the project')
  .option('-y, --yes', 'skip prompts and use defaults')
  .option('--no-install', 'skip installing dependencies')
  .option('--react-version <version>', 'React version to use', 'latest')
  .option('--nestjs-version <version>', 'NestJS version to use', 'latest')
  .option('--nx-version <version>', 'Nx version to use', 'latest')
  .action(async (projectName, options) => {
    console.log(kleur.blue().bold('\n🚀 Create NestJS + React Monorepo\n'));

    let targetDir = projectName;
    let config = {};

    // If no project name provided, prompt for it
    if (!targetDir) {
      const response = await prompts({
        type: 'text',
        name: 'projectName',
        message: 'Project name:',
        initial: 'my-nest-react-app',
        validate: (value) => {
          if (!value) return 'Project name is required';
          if (!/^[a-z0-9-]+$/.test(value)) {
            return 'Project name can only contain lowercase letters, numbers, and hyphens';
          }
          return true;
        }
      });

      if (!response.projectName) {
        console.log(kleur.red('Operation cancelled.'));
        process.exit(0);
      }

      targetDir = response.projectName;
    }

    const projectPath = path.resolve(targetDir);

    // Check if directory exists
    if (fs.existsSync(projectPath)) {
      console.log(kleur.red(`Error: Directory ${targetDir} already exists.`));
      process.exit(1);
    }

    // Get configuration options if not using defaults
    if (!options.yes) {
      const configResponse = await prompts([
        {
          type: 'select',
          name: 'packageManager',
          message: 'Which package manager would you like to use?',
          choices: [
            { title: 'npm', value: 'npm' },
            { title: 'yarn', value: 'yarn' },
            { title: 'pnpm', value: 'pnpm' }
          ],
          initial: 0
        },
        {
          type: 'select',
          name: 'bundler',
          message: 'Which bundler would you like to use for React?',
          choices: [
            { title: 'Vite (recommended)', value: 'vite' },
            { title: 'Webpack', value: 'webpack' }
          ],
          initial: 0
        },
        {
          type: 'confirm',
          name: 'addDocker',
          message: 'Add Docker configuration?',
          initial: true
        },
        {
          type: 'confirm',
          name: 'addTesting',
          message: 'Add testing setup (Jest)?',
          initial: true
        }
      ]);

      config = { ...config, ...configResponse };
    } else {
      // Use defaults
      config = {
        packageManager: 'npm',
        bundler: 'vite',
        addDocker: true,
        addTesting: true
      };
    }

    try {
      // Step 1: Create Nx workspace
      const spinner = ora('Creating Nx workspace...').start();
      
      const nxCommand = `npx create-nx-workspace@${options.nxVersion} ${targetDir} --preset=npm --packageManager=${config.packageManager} --nxCloud=skip --no-interactive`;
      
      execSync(nxCommand, { 
        stdio: 'inherit',
        timeout: 300000 // 5 minutes timeout
      });
      
      spinner.succeed('Nx workspace created');

      // Change to project directory
      process.chdir(projectPath);

      // Step 2: Install Nx plugins
      spinner.start('Installing Nx plugins...');
      
      // Install React plugin
      const installReactCommand = `npx nx add @nx/react --no-interactive`;
      execSync(installReactCommand, { 
        stdio: 'inherit',
        timeout: 300000
      });
      
      // Install NestJS plugin
      const installNestCommand = `npx nx add @nx/nest --no-interactive`;
      execSync(installNestCommand, { 
        stdio: 'inherit',
        timeout: 300000
      });
      
      spinner.succeed('Nx plugins installed');

      // Step 3: Generate React app
      spinner.start('Generating React application...');
      
      const reactCommand = `npx nx g @nx/react:app client --bundler=${config.bundler} --routing=true --style=css --no-interactive`;
      
      execSync(reactCommand, { 
        stdio: 'inherit',
        timeout: 300000
      });
      
      spinner.succeed('React application generated');

      // Fix Vite configuration if using Vite bundler
      if (config.bundler === 'vite') {
        await fixViteConfig();
      }

      // Step 4: Generate NestJS app
      spinner.start('Generating NestJS application...');
      
      const nestCommand = `npx nx g @nx/nest:app server --no-interactive`;
      
      execSync(nestCommand, { 
        stdio: 'inherit',
        timeout: 300000
      });
      
      spinner.succeed('NestJS application generated');

      // Step 5: Add additional configurations
      if (config.addDocker) {
        spinner.start('Adding Docker configuration...');
        await addDockerConfig();
        spinner.succeed('Docker configuration added');
      }

      if (config.addTesting) {
        spinner.start('Configuring testing setup...');
        await addTestingConfig();
        spinner.succeed('Testing setup configured');
      }

      // Step 6: Update package.json with useful scripts
      spinner.start('Configuring project scripts...');
      await updatePackageJson(targetDir);
      spinner.succeed('Project scripts configured');

      // Step 7: Create README
      spinner.start('Creating README...');
      await createReadme(targetDir);
      spinner.succeed('README created');

      // Step 8: Install dependencies
      if (options.install !== false) {
        spinner.start('Installing dependencies... (this may take a few minutes)');
        
        try {
          execSync(`${config.packageManager} install`, { 
            stdio: 'inherit',
            timeout: 300000
          });
          spinner.succeed('Dependencies installed');
        } catch (error) {
          spinner.fail('Failed to install dependencies');
          console.log(kleur.yellow('You can install dependencies manually by running:'));
          console.log(kleur.cyan(`  cd ${targetDir}`));
          console.log(kleur.cyan(`  ${config.packageManager} install`));
        }
      }

      // Success message
      console.log(kleur.green().bold('\n✅ Success! Your monorepo is ready.'));
      console.log(kleur.blue('\nNext steps:'));
      console.log(kleur.cyan(`  cd ${targetDir}`));
      
      if (options.install === false) {
        console.log(kleur.cyan(`  ${config.packageManager} install`));
      }
      
      console.log(kleur.cyan('  npm run dev'));
      
      // Show Docker instructions if Docker was enabled
      if (config.addDocker) {
        console.log(kleur.blue('\n🐳 Docker Usage:'));
        console.log(kleur.cyan('  npm run docker:build'));
        console.log(kleur.cyan('  npm run docker:up'));
        console.log(kleur.gray('  # Or: docker-compose up --build'));
      }
      
      console.log(kleur.blue('\nHappy coding! 🎉\n'));

    } catch (error) {
      console.error(kleur.red('Error creating project:'), error.message);
      
      // Cleanup on error
      if (fs.existsSync(projectPath)) {
        fs.removeSync(projectPath);
      }
      
      process.exit(1);
    }
  });

// Helper functions
async function addDockerConfig() {
  // Add Docker configuration - single boilerplate for both development and production
  const dockerComposeContent = `version: '3.8'

services:
  client:
    build:
      context: ./client
      dockerfile: Dockerfile
    ports:
      - "5173:5173"
    volumes:
      - ./client:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
    depends_on:
      - server

  server:
    build:
      context: ./server
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    volumes:
      - ./server:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
`;

  fs.writeFileSync('docker-compose.yml', dockerComposeContent);

  // Add Dockerfiles for client and server
  const clientDockerfile = `FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Expose port
EXPOSE 5173

# Start development server
CMD ["npm", "run", "serve"]
`;

  const serverDockerfile = `FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Start server
CMD ["npm", "run", "serve"]
`;

  fs.writeFileSync('client/Dockerfile', clientDockerfile);
  fs.writeFileSync('server/Dockerfile', serverDockerfile);
}

async function addTestingConfig() {
  // Testing is already configured by Nx generators
  // We can add additional test configurations if needed
}

async function updatePackageJson(projectName) {
  const packageJsonPath = 'package.json';
  const packageJson = fs.readJsonSync(packageJsonPath);
  
  // Add useful scripts
  packageJson.scripts = {
    ...packageJson.scripts,
    'dev': 'concurrently "npm run dev:server" "npm run dev:client"',
    'dev:server': 'nx serve server',
    'dev:client': 'nx serve client',
    'build': 'nx build server && nx build client',
    'build:server': 'nx build server',
    'build:client': 'nx build client',
    'start': 'nx serve server --prod',
    'start:prod': 'node dist/server/main.js',
    'test': 'nx test server && nx test client',
    'test:server': 'nx test server',
    'test:client': 'nx test client',
    'lint': 'nx lint server && nx lint client',
    'lint:server': 'nx lint server',
    'lint:client': 'nx lint client',
    'docker:build': 'docker-compose build',
    'docker:up': 'docker-compose up',
    'docker:down': 'docker-compose down',
    'graph': 'nx graph'
  };

  // Update project name
  packageJson.name = projectName;
  
  fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 });
}

async function fixViteConfig() {
  const viteConfigPath = 'client/vite.config.ts';
  
  if (fs.existsSync(viteConfigPath)) {
    let viteConfig = fs.readFileSync(viteConfigPath, 'utf8');
    
    // Replace CommonJS require with ESM import
    viteConfig = viteConfig.replace(
      /const\s+{\s*defineConfig\s*}\s*=\s*require\(['"]vite['"]\);/g,
      "import { defineConfig } from 'vite';"
    );
    
    // Also handle any other require statements for vite plugins
    viteConfig = viteConfig.replace(
      /const\s+(\w+)\s*=\s*require\(['"]@vitejs\/plugin-react['"]\);/g,
      "import $1 from '@vitejs/plugin-react';"
    );
    
    fs.writeFileSync(viteConfigPath, viteConfig);
    console.log(kleur.green('✅ Fixed Vite configuration for ESM compatibility'));
  }
}

async function createReadme(projectName) {
  const readmeContent = `# ${projectName}

A modern, production-ready monorepo featuring NestJS backend and React frontend with TypeScript, powered by Nx.

## 🚀 Features

- **Monorepo Architecture**: Managed with Nx for optimal development experience
- **Backend**: NestJS with TypeScript
- **Frontend**: React with TypeScript and Vite
- **Testing**: Jest for unit tests
- **Linting**: ESLint with TypeScript support
- **Docker**: Multi-stage builds for both development and production
- **Development Tools**: Hot reload, debugging support

## 📁 Project Structure

\`\`\`
├── client/                 # React frontend application
│   └── Dockerfile         # Client Docker configuration
├── server/                 # NestJS backend application
│   └── Dockerfile         # Server Docker configuration
├── docker-compose.yml      # Docker Compose configuration
├── nx.json                # Nx workspace configuration
└── package.json           # Root package.json with workspace scripts
\`\`\`

## 🛠️ Prerequisites

- **Node.js**: >= 18.0.0
- **npm**: >= 8.0.0
- **Docker**: >= 20.0.0 (optional, for containerized development)

## 🏃‍♂️ Getting Started

### Local Development

1. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

2. **Start both applications**
   \`\`\`bash
   # Start both client and server concurrently
   npm run dev
   
   # Or start them individually
   npm run dev:server  # NestJS server on http://localhost:3000
   npm run dev:client  # React app on http://localhost:5173
   \`\`\`

### Docker Development

1. **Start with Docker Compose**
   \`\`\`bash
   # Build and start both services
   npm run docker:build
   npm run docker:up
   
   # Or use docker-compose directly
   docker-compose up --build
   \`\`\`

2. **Access the applications**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## Available Scripts

- \`npm run dev\` - Start both client and server in development mode
- \`npm run build\` - Build both applications for production
- \`npm run test\` - Run tests for both applications
- \`npm run lint\` - Lint both applications
- \`npm run docker:up\` - Start applications with Docker
- \`npm run docker:build\` - Build Docker images
- \`npm run docker:down\` - Stop Docker containers

## 🌟 Community

Join the Nx community:
- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
`;

  fs.writeFileSync('README.md', readmeContent);
}

program.parse();
