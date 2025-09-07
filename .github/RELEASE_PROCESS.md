# 🚀 Continuous Deployment & Publishing Process

This repository uses **Continuous Deployment** with GitHub Actions to automatically test, version, and publish to npm on every PR merge to main.

## 📋 Overview

We have 3 main workflows:

1. **`test.yml`** - Runs on every push/PR to test the template and CLI tool
2. **`publish-npm.yml`** - **Automatically publishes to npm when PRs are merged to main**
3. **`release.yml`** - Manual workflow for emergency releases or version overrides

## 🔧 Setup Requirements

### 1. NPM Token Configuration

You need to set up an NPM token for automated publishing:

1. **Generate NPM Token**:
   ```bash
   # Login to npm
   npm login
   
   # Generate an automation token
   npm token create --type=automation
   ```

2. **Add to GitHub Secrets**:
   - Go to your repository → Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `NPM_TOKEN`
   - Value: Your npm token (starts with `npm_`)

### 2. GitHub Token (Automatic)

The `GITHUB_TOKEN` is automatically provided by GitHub Actions for creating releases.

## 🚀 Continuous Deployment Process

### Automatic Release (Default)

**Every PR merge to `main` automatically triggers a release!**

1. **Create a PR** with your changes
2. **Use conventional commit messages** (see [COMMIT_CONVENTION.md](COMMIT_CONVENTION.md)):
   ```bash
   feat: add database configuration options    # Minor version bump
   fix: resolve Docker build issue            # Patch version bump  
   feat!: change CLI API structure           # Major version bump
   ```
3. **Merge PR to main**
4. **Automatic Process**:
   - ✅ Analyzes commit messages since last release
   - ✅ Determines version bump (major/minor/patch)
   - ✅ Runs all tests
   - ✅ Tests CLI tool creation
   - ✅ Updates version in package.json
   - ✅ Publishes to npm
   - ✅ Creates Git tag
   - ✅ Creates GitHub release with changelog

### Manual Release (Emergency Only)

For urgent releases or version overrides:

1. **Go to GitHub Actions**:
   - Navigate to your repository  
   - Click "Actions" tab
   - Select "Manual Release" workflow

2. **Trigger Manual Release**:
   - Click "Run workflow"
   - Select release type (patch/minor/major)
   - Optionally skip tests for emergencies
   - Click "Run workflow"

3. **Manual Process**:
   - ✅ Optionally runs tests (can be skipped)
   - ✅ Bumps version manually
   - ✅ Pushes to main (triggers automatic CD)

## 🧪 Testing Workflows

### Continuous Integration

Every push to `main` or PR triggers:
- ✅ Linting checks
- ✅ Unit tests (server & client)
- ✅ Build verification
- ✅ CLI tool functionality test
- ✅ Docker container tests
- ✅ Multi-Node.js version testing (18, 20)

### CLI Tool Testing

The workflows automatically test:
- Template generation works correctly
- All required files are created
- Generated project can build successfully
- Generated project tests pass

## 📦 Continuous Deployment to NPM

**When any PR is merged to `main`:**

1. **Pre-publish checks**:
   - Analyzes commit messages for version bump type
   - All tests must pass
   - CLI tool must work correctly  
   - Template must build successfully

2. **Smart Publishing**:
   - Only publishes if there are changes that warrant a version bump
   - Automatically determines version (major/minor/patch) from commits
   - Updates package.json version
   - Builds template files
   - Publishes to npm registry

3. **Post-publish**:
   - Creates Git tag for the new version
   - GitHub release created with auto-generated changelog
   - Package immediately available via `npx create-nest-react-monorepo`

### Commit Message → Version Bump

| Commit Type | Version Bump | Example |
|-------------|--------------|---------|
| `feat:` | **Minor** | `feat: add database config` → 1.0.0 → 1.1.0 |
| `fix:` | **Patch** | `fix: resolve build issue` → 1.1.0 → 1.1.1 |
| `feat!:` | **Major** | `feat!: change CLI args` → 1.1.1 → 2.0.0 |
| `docs:`, `style:`, etc. | **Patch** | `docs: update README` → 2.0.0 → 2.0.1 |

## 🔍 Monitoring

### Check Workflow Status
- Go to repository → Actions tab
- View status of all workflows
- Check logs for any failures

### Verify NPM Publishing
- Check [npmjs.com/package/create-nest-react-monorepo](https://npmjs.com/package/create-nest-react-monorepo)
- Test installation: `npx create-nest-react-monorepo test-app`

### GitHub Releases
- Check repository → Releases section
- Verify release notes and changelog

## 🐛 Troubleshooting

### Common Issues

1. **NPM Token Expired**:
   ```bash
   # Generate new token
   npm token create --type=automation
   # Update GitHub secret
   ```

2. **Test Failures**:
   - Check Actions logs for specific failures
   - Run tests locally: `npm test`
   - Test CLI tool locally: `cd create-package && npm run build`

3. **Docker Issues**:
   - Verify Docker compose files are valid
   - Test locally: `docker-compose up`

4. **Permission Issues**:
   - Verify NPM token has publish permissions
   - Check GitHub token permissions

### Manual Recovery

If automatic publishing fails:

```bash
# Manual publish (after fixing issues)
cd create-package
npm run build
npm version 1.0.0 --no-git-tag-version
npm publish
```

## 📈 Version Strategy

We follow [Semantic Versioning](https://semver.org/):

- **Patch** (1.0.1): Bug fixes, security updates
- **Minor** (1.1.0): New features, improvements  
- **Major** (2.0.0): Breaking changes

### When to Release

- **Patch**: Bug fixes, dependency updates
- **Minor**: New template features, CLI improvements
- **Major**: Breaking changes to generated project structure

## 🔄 Workflow Files

- **`.github/workflows/test.yml`**: CI testing
- **`.github/workflows/release.yml`**: Manual release creation
- **`.github/workflows/publish-npm.yml`**: Automated npm publishing

## 📝 Best Practices

1. **Test Locally First**:
   ```bash
   npm test
   cd create-package && npm run build
   ```

2. **Meaningful Commit Messages**:
   ```bash
   git commit -m "feat: add database configuration options"
   git commit -m "fix: resolve Docker build issue"
   ```

3. **Update Documentation**:
   - Update README for new features
   - Update CLI help text if needed
   - Add migration notes for breaking changes

4. **Monitor After Release**:
   - Check npm download stats
   - Monitor GitHub issues
   - Test package installation

---

## 🎉 Ready to Release?

1. ✅ All tests passing locally
2. ✅ NPM token configured in GitHub secrets
3. ✅ Changes committed and pushed
4. ✅ Ready to create release

**Go to Actions → Create Release → Run workflow!** 🚀
