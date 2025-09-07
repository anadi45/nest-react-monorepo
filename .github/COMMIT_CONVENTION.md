# 📝 Commit Message Convention

This project uses [Conventional Commits](https://conventionalcommits.org/) to automatically determine version bumps and generate changelogs.

## 🎯 Format

```
<type>: <description>

[optional body]

[optional footer(s)]
```

## 📋 Types

### Version Bumping Types

| Type | Version Bump | Description | Example |
|------|-------------|-------------|---------|
| `feat` | **MINOR** | New features | `feat: add database configuration options` |
| `fix` | **PATCH** | Bug fixes | `fix: resolve Docker build issue` |
| `feat!` | **MAJOR** | Breaking feature | `feat!: change CLI argument structure` |
| `fix!` | **MAJOR** | Breaking fix | `fix!: remove deprecated API endpoints` |

### Other Types (PATCH bump)

| Type | Description | Example |
|------|-------------|---------|
| `docs` | Documentation changes | `docs: update installation guide` |
| `style` | Code style changes | `style: fix linting issues` |
| `refactor` | Code refactoring | `refactor: simplify CLI logic` |
| `perf` | Performance improvements | `perf: optimize template generation` |
| `test` | Test changes | `test: add CLI integration tests` |
| `chore` | Maintenance tasks | `chore: update dependencies` |
| `ci` | CI/CD changes | `ci: add automated testing` |

## 🚀 Examples

### Feature Addition (Minor Bump)
```bash
git commit -m "feat: add PostgreSQL configuration template"
# Results in: 1.0.0 → 1.1.0
```

### Bug Fix (Patch Bump)
```bash
git commit -m "fix: resolve npm install timeout in generated projects"
# Results in: 1.1.0 → 1.1.1
```

### Breaking Change (Major Bump)
```bash
git commit -m "feat!: change default port from 3000 to 8000

BREAKING CHANGE: The default server port has changed from 3000 to 8000.
Update your environment variables accordingly."
# Results in: 1.1.1 → 2.0.0
```

### Documentation Update (Patch Bump)
```bash
git commit -m "docs: add Docker deployment examples"
# Results in: 2.0.0 → 2.0.1
```

## 🔄 How It Works

When you merge a PR to `main`, the CI system:

1. **Analyzes commits** since the last release
2. **Determines version bump**:
   - Any `feat!`, `fix!`, or `BREAKING CHANGE` → **MAJOR**
   - Any `feat:` → **MINOR**  
   - Any `fix:`, `docs:`, `style:`, etc. → **PATCH**
3. **Updates version** in `create-package/package.json`
4. **Publishes to npm** automatically
5. **Creates GitHub release** with changelog

## 💡 Tips

### Good Commit Messages
```bash
✅ feat: add environment variable validation
✅ fix: resolve template file permissions
✅ docs: update README with new examples
✅ test: add integration tests for CLI tool
```

### Poor Commit Messages (will default to patch)
```bash
❌ Update stuff
❌ Fix bug
❌ Changes
❌ WIP
```

### Multiple Changes
If your PR has multiple types of changes, the **highest priority** wins:
- `feat` + `fix` → **MINOR** bump
- `feat!` + `feat` + `fix` → **MAJOR** bump

## 🛠️ Tools

### Commitizen (Optional)
Install for interactive commit message prompts:

```bash
npm install -g commitizen cz-conventional-changelog
echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc

# Use 'git cz' instead of 'git commit'
git cz
```

### VS Code Extension
Install "Conventional Commits" extension for commit message templates.

## 🚨 Emergency Releases

For urgent fixes that need immediate release:

1. **Use Manual Release workflow**:
   - Go to Actions → "Manual Release"
   - Select release type
   - Check "Skip tests" if needed

2. **Or use breaking change commit**:
   ```bash
   git commit -m "fix!: critical security vulnerability

   BREAKING CHANGE: This fixes a critical security issue."
   ```

## 📊 Version Strategy

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.0.0 → 2.0.0): Breaking changes
- **MINOR** (1.0.0 → 1.1.0): New features, backward compatible
- **PATCH** (1.0.0 → 1.0.1): Bug fixes, backward compatible

---

## 🎉 Ready to Commit?

1. Make your changes
2. Use conventional commit format
3. Create PR
4. Merge to main
5. **Automatic release!** 🚀

**Happy committing!** 📝
