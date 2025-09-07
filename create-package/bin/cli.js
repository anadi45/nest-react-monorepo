#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
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
  .action(async (projectName, options) => {
    console.log(chalk.blue.bold('\n🚀 Create NestJS + React Monorepo\n'));

    let targetDir = projectName;

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
        console.log(chalk.red('Operation cancelled.'));
        process.exit(0);
      }

      targetDir = response.projectName;
    }

    const projectPath = path.resolve(targetDir);

    // Check if directory exists
    if (fs.existsSync(projectPath)) {
      console.log(chalk.red(`Error: Directory ${targetDir} already exists.`));
      process.exit(1);
    }

    try {
      // Create project directory
      const spinner = ora('Creating project directory...').start();
      fs.ensureDirSync(projectPath);
      spinner.succeed('Project directory created');

      // Copy template files
      spinner.start('Copying template files...');
      const templatePath = path.join(__dirname, '../template');
      fs.copySync(templatePath, projectPath);
      spinner.succeed('Template files copied');

      // Update package.json with project name
      spinner.start('Configuring project...');
      const packageJsonPath = path.join(projectPath, 'package.json');
      const packageJson = fs.readJsonSync(packageJsonPath);
      packageJson.name = `@${targetDir}/source`;
      fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 });

      // Update README with project name
      const readmePath = path.join(projectPath, 'README.md');
      let readmeContent = fs.readFileSync(readmePath, 'utf8');
      readmeContent = readmeContent.replace(/nest-react-template/g, targetDir);
      readmeContent = readmeContent.replace(/NestJS \+ React Monorepo Template/g, `${targetDir}`);
      fs.writeFileSync(readmePath, readmeContent);

      spinner.succeed('Project configured');

      // Install dependencies
      if (options.install !== false) {
        spinner.start('Installing dependencies... (this may take a few minutes)');
        process.chdir(projectPath);
        
        try {
          execSync('npm install', { 
            stdio: 'pipe',
            timeout: 300000 // 5 minutes timeout
          });
          spinner.succeed('Dependencies installed');
        } catch (error) {
          spinner.fail('Failed to install dependencies');
          console.log(chalk.yellow('You can install dependencies manually by running:'));
          console.log(chalk.cyan(`  cd ${targetDir}`));
          console.log(chalk.cyan('  npm install'));
        }
      }

      // Success message
      console.log(chalk.green.bold('\n✅ Success! Your monorepo is ready.'));
      console.log(chalk.blue('\nNext steps:'));
      console.log(chalk.cyan(`  cd ${targetDir}`));
      
      if (options.install === false) {
        console.log(chalk.cyan('  npm install'));
      }
      
      console.log(chalk.cyan('  npm run dev'));
      console.log(chalk.blue('\nHappy coding! 🎉\n'));

    } catch (error) {
      console.error(chalk.red('Error creating project:'), error.message);
      
      // Cleanup on error
      if (fs.existsSync(projectPath)) {
        fs.removeSync(projectPath);
      }
      
      process.exit(1);
    }
  });

program.parse();
