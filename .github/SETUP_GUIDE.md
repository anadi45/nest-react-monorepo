# 🛠️ GitHub Actions Setup Guide

Complete guide to set up automated testing, releasing, and npm publishing for your `create-nest-react-monorepo` package.

## 🚀 Quick Setup Checklist

- [ ] 1. Configure NPM token
- [ ] 2. Push workflows to GitHub
- [ ] 3. Test the workflows
- [ ] 4. Create your first release

## 📋 Detailed Setup

### Step 1: Configure NPM Token

1. **Generate NPM Automation Token**:
   ```bash
   npm login
   npm token create --type=automation
   ```
   
   Copy the generated token (starts with `npm_`).

2. **Add Token to GitHub Secrets**:
   - Go to your repository: https://github.com/anadi45/nest-react-monorepo
   - Navigate to: Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `NPM_TOKEN`
   - Value: Paste your npm token
   - Click "Add secret"

### Step 2: Push Workflows to GitHub

```bash
# Make sure you're in the root directory
cd /Users/ranjeetbaraik/Desktop/projects/nest-react-template

# Add all the new workflow files
git add .github/

# Commit the workflows
git commit -m "ci: add automated testing and npm publishing workflows"

# Push to your repository
git push origin main
```

### Step 3: Test the Workflows

1. **Test CI Workflow**:
   - The push above should trigger the test workflow automatically
   - Go to: https://github.com/anadi45/nest-react-monorepo/actions
   - Verify "Test Suite" workflow passes

2. **Test CLI Tool Manually** (optional):
   ```bash
   cd create-package
   npm install
   npm run build
   cd /tmp
   node /path/to/create-package/bin/cli.js test-setup --no-install
   ```

### Step 4: Create Your First Release

#### Option A: Automatic Release (Recommended)

1. **Make a change** to your template
2. **Create a PR** with a conventional commit:
   ```bash
   git checkout -b feat/initial-release
   git commit -m "feat: initial release of nest-react monorepo template"
   git push origin feat/initial-release
   ```
3. **Create PR** and merge to main
4. **Automatic release** will trigger!

#### Option B: Manual Release

1. Go to: https://github.com/anadi45/nest-react-monorepo/actions
2. Click on "Manual Release" workflow  
3. Click "Run workflow"
4. Select release type: `minor`
5. Click "Run workflow"

### Step 5: Verify Everything Works

1. **Check GitHub Release**:
   - Go to: https://github.com/anadi45/nest-react-monorepo/releases
   - Verify your release appears

2. **Check NPM Package**:
   - Visit: https://npmjs.com/package/create-nest-react-monorepo
   - Test installation: `npx create-nest-react-monorepo test-verify`

## 🔧 Workflow Overview

### 📊 What Each Workflow Does

#### 1. `test.yml` (Continuous Integration)
**Triggers**: Push to main, Pull Requests
- ✅ Runs on Node.js 18 & 20
- ✅ Lints code
- ✅ Runs unit tests
- ✅ Builds applications
- ✅ Tests CLI tool creation
- ✅ Tests Docker containers

#### 2. `release.yml` (Manual Release Creation)
**Triggers**: Manual workflow dispatch
- ✅ Runs all tests
- ✅ Generates changelog from commits
- ✅ Creates Git tag
- ✅ Creates GitHub release
- ✅ Triggers npm publishing

#### 3. `publish-npm.yml` (Continuous Deployment)
**Triggers**: PR merges to main branch
- ✅ Analyzes commit messages for version bump
- ✅ Runs comprehensive tests
- ✅ Builds template
- ✅ Automatically bumps version
- ✅ Publishes to npm
- ✅ Creates Git tag and GitHub release

#### 4. `dependabot-auto-merge.yml` (Dependency Updates)
**Triggers**: Dependabot PRs
- ✅ Tests dependency updates
- ✅ Auto-merges if tests pass
- ✅ Keeps dependencies current

## 🎯 Usage Examples

### Regular Development (Continuous Deployment)
```bash
# Create feature branch
git checkout -b feat/database-config

# Make changes to your template
git add .
git commit -m "feat: add database configuration"
git push origin feat/database-config

# Create PR, merge to main
# → Triggers automatic version bump and npm publish!
```

### Emergency Releases
```bash
# Via GitHub Actions (for urgent fixes)
# Go to Actions → Manual Release → Run workflow

# Or via breaking change commit
git commit -m "fix!: critical security vulnerability"
# → Triggers major version bump automatically
```

### Emergency Hotfix
```bash
git commit -m "fix: resolve critical security issue"
git tag v1.0.1
git push origin v1.0.1
# → Immediate test + publish
```

## 🔍 Monitoring & Troubleshooting

### Check Workflow Status
- **All workflows**: https://github.com/anadi45/nest-react-monorepo/actions
- **Latest runs**: Check for ✅ or ❌ status
- **Logs**: Click on any workflow run to see detailed logs

### Common Issues & Solutions

#### NPM Publishing Fails
```bash
# Check if token is valid
npm whoami

# Regenerate token if needed
npm token create --type=automation
# Update GitHub secret with new token
```

#### Tests Fail
```bash
# Run tests locally first
npm test
cd create-package && npm run build

# Check specific test logs in GitHub Actions
```

#### Docker Issues
```bash
# Test Docker locally
docker-compose build
docker-compose up

# Check if all ports are available
```

### Success Indicators

✅ **Everything Working**:
- Test workflow shows green ✅
- Releases appear in GitHub
- Package appears on npmjs.com
- `npx create-nest-react-monorepo` works

## 🎉 You're All Set!

Your automated pipeline is now ready:

1. **Push code** → Tests run automatically
2. **Create release** → Package publishes to npm
3. **Dependencies update** → Auto-merge if tests pass
4. **Users can install** → `npx create-nest-react-monorepo my-app`

### Next Steps

- 📊 Monitor npm download stats
- 🐛 Respond to GitHub issues  
- 🔄 Regular dependency updates
- 📝 Update documentation as needed
- ⭐ Promote your package!

**Happy automating! 🚀**
