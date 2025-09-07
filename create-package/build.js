const fs = require('fs-extra');
const path = require('path');

async function build() {
  console.log('Building template package...');

  // Ensure template directory exists
  const templateDir = path.join(__dirname, 'template');
  fs.ensureDirSync(templateDir);

  // Copy all template files from parent directory
  const sourceDir = path.join(__dirname, '..');
  const filesToCopy = [
    'client',
    'server',
    '.vscode',
    'docker-compose.yml',
    'docker-compose.dev.yml',
    'env.example',
    'eslint.config.mjs',
    'jest.config.ts',
    'jest.preset.js',
    'nx.json',
    'package.json',
    'tsconfig.base.json',
    'tsconfig.json',
    'README.md',
    '.gitignore'
  ];

  for (const file of filesToCopy) {
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(templateDir, file);
    
    if (fs.existsSync(sourcePath)) {
      fs.copySync(sourcePath, targetPath);
      console.log(`✓ Copied ${file}`);
    }
  }

  // Create a template-specific gitignore
  const templateGitignore = `# Dependencies
node_modules/
package-lock.json

# Build outputs
dist/
build/
out/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# nyc test coverage
.nyc_output

# Dependency directories
node_modules/
jspm_packages/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# parcel-bundler cache
.cache
.parcel-cache

# Next.js build output
.next

# Nuxt.js build / generate output
.nuxt

# Storybook build outputs
.out
.storybook-out

# Temporary folders
tmp/
temp/

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
*.swp
*.swo
*~

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Nx
.nx/cache
.nx/workspace-data

# Test artifacts
test-output/
test-results/

# Docker
.dockerignore

# Database
*.sqlite
*.sqlite3
*.db
`;

  fs.writeFileSync(path.join(templateDir, '.gitignore'), templateGitignore);
  console.log('✓ Created template .gitignore');

  console.log('✅ Template package built successfully!');
}

build().catch(console.error);
