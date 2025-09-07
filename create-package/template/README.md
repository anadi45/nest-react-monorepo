# NestJS + React Monorepo Template

A modern, production-ready monorepo template featuring NestJS backend and React frontend with TypeScript, powered by Nx.

## 🚀 Features

- **Monorepo Architecture**: Managed with Nx for optimal development experience
- **Backend**: NestJS with TypeScript
- **Frontend**: React with TypeScript and Vite
- **Testing**: Jest for unit tests
- **Linting**: ESLint with TypeScript support
- **Docker**: Multi-stage builds for both development and production
- **Development Tools**: Hot reload, debugging support

## 📁 Project Structure

```
├── client/                 # React frontend application
│   ├── src/
│   ├── Dockerfile         # Production Docker image
│   ├── Dockerfile.dev     # Development Docker image
│   ├── nginx.conf         # Nginx configuration for production
│   └── package.json
├── server/                 # NestJS backend application
│   ├── src/
│   ├── Dockerfile         # Production Docker image
│   ├── Dockerfile.dev     # Development Docker image
│   └── package.json
├── docker-compose.yml      # Production docker compose
├── docker-compose.dev.yml  # Development docker compose
├── nx.json                # Nx workspace configuration
└── package.json           # Root package.json with workspace scripts
```

## 🛠️ Prerequisites

- **Node.js**: >= 18.0.0
- **npm**: >= 8.0.0
- **Docker**: >= 20.0.0 (optional, for containerized development)

## 🏃‍♂️ Getting Started

### Local Development

1. **Clone and install dependencies**
   ```bash
   git clone <your-repo-url>
   cd <your-project-name>
   npm install
   ```

2. **Start both applications**
   ```bash
   # Start both client and server concurrently
   npm run dev
   
   # Or start them individually
   npm run dev:server  # NestJS server on http://localhost:3000
   npm run dev:client  # React app on http://localhost:5173
   ```

### Docker Development

1. **Start with Docker Compose (Development)**
   ```bash
   # Start both services in development mode with hot reload
   npm run docker:dev
   # or
   docker-compose -f docker-compose.dev.yml up
   ```

2. **Access the applications**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## Run tasks

To run tasks with Nx use:

```sh
npx nx <target> <project-name>
```

For example:

```sh
npx nx build myproject
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Versioning and releasing

To version and release the library use

```
npx nx release
```

Pass `--dry-run` to see what would happen without actually releasing the library.

[Learn more about Nx release &raquo;](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

To install a new plugin you can use the `nx add` command. Here's an example of adding the React plugin:
```sh
npx nx add @nx/react
```

Use the plugin's generator to create new projects. For example, to create a new React app or library:

```sh
# Generate an app
npx nx g @nx/react:app demo

# Generate a library
npx nx g @nx/react:lib some-lib
```

You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Set up CI!

### Step 1

To connect to Nx Cloud, run the following command:

```sh
npx nx connect
```

Connecting to Nx Cloud ensures a [fast and scalable CI](https://nx.dev/ci/intro/why-nx-cloud?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) pipeline. It includes features such as:

- [Remote caching](https://nx.dev/ci/features/remote-cache?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Task distribution across multiple machines](https://nx.dev/ci/features/distribute-task-execution?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Task flakiness detection and rerunning](https://nx.dev/ci/features/flaky-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

### Step 2

Use the following command to configure a CI workflow for your workspace:

```sh
npx nx g ci-workflow
```

[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/getting-started/tutorials/npm-workspaces-tutorial?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:
- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
