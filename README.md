# JosephScript.com

## Installation

```bash
$ pnpm i
```

## How to run

```bash
$ pnpm run dev
```

## Deployment

This site is automatically deployed to [Cloudflare Pages](https://pages.cloudflare.com/) whenever code is pushed to the `main` branch.

### How it works

1. **GitHub Integration**: The repository is connected to Cloudflare Pages through the Cloudflare dashboard. When you push to the `main` branch, Cloudflare Pages detects the change via webhook.

2. **Build Process**: Cloudflare Pages automatically:
   - Clones the repository
   - Installs dependencies using `pnpm` (detected automatically from `pnpm-lock.yaml`)
   - Runs the build command: `pnpm run build`
   - The Astro build process generates a static site in the `dist` directory.

3. **Deployment**: The contents of the `dist` directory are deployed to Cloudflare's global CDN, making the site available worldwide.

### Build Configuration

The project is configured for static site generation:
- **Build command**: `pnpm run build`
- **Build output directory**: `dist`
- **Node version**: 24.x (specified in `.nvmrc` and `package.json` engines)

These settings are configured in the Cloudflare Pages dashboard.

### Manual Deployment

If you need to deploy manually or test the build locally:

```bash
# Build the static site
$ pnpm run build

# The output will be in the `dist` directory
# You can preview it locally with a static file server
```

### Setting up Cloudflare Pages (One-time setup)

If you need to set up a new Cloudflare Pages project:

1. Go to the [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Pages** → **Create a project**
3. Connect your GitHub repository
4. Configure the build settings:
   - **Framework preset**: Astro
   - **Build command**: `pnpm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (leave as default)
5. Save and deploy

Once configured, all future pushes to `main` will trigger automatic deployments.

## Dependency Scanning

This project uses [`audit-ci`](https://github.com/IBM/audit-ci) for local dependency vulnerability scanning, enforced automatically via **Husky** pre-commit hooks.

### Automatic Enforcement

**Husky** is configured to run security audits automatically before every commit:

1. **Security Audit**: Runs `audit-ci` to check for moderate and high severity vulnerabilities
2. **Code Quality**: Runs `lint-staged` to format and lint code with Biome

If vulnerabilities are found, the commit will be blocked until they are resolved. This ensures no vulnerable dependencies are committed to the repository.

### Running Security Audits Manually

You can also check for vulnerabilities manually:

```bash
# Check for moderate and high severity vulnerabilities (default)
$ pnpm run audit

# Check only for high and critical severity vulnerabilities
$ pnpm run audit:high
```

The audit will fail (exit with non-zero code) if vulnerabilities are found.

### How it works

`audit-ci` uses the same vulnerability database as `npm audit` / `pnpm audit`, but provides:
- Configurable severity thresholds
- Non-zero exit codes on failure (useful for CI and pre-commit hooks)
- JSON output support
- Ability to allowlist specific vulnerabilities if needed

### Pre-commit Hook Configuration

The pre-commit hook (`.husky/pre-commit`) runs in this order:
1. **Security audit** (`pnpm run audit`) - Blocks commit if vulnerabilities found
2. **Lint-staged** (Biome formatting/linting) - Auto-fixes code style issues

This ensures security issues are caught before code formatting, providing fast feedback.

### Setting up Husky (First-time setup)

After cloning the repository, Husky will be automatically initialized when you run:

```bash
$ pnpm install
```

The `prepare` script in `package.json` ensures Husky is set up correctly.

### Allowing Specific Vulnerabilities

If you need to temporarily allowlist a known vulnerability (not recommended for production), you can create an `.audit-ci.json` configuration file:

```json
{
  "allowlist": ["CVE-XXXX-XXXXX"]
}
```

**Note**: Only use allowlists for vulnerabilities that are confirmed false positives or have acceptable risk for your use case.

### Bypassing Hooks (Not Recommended)

If you absolutely need to bypass the pre-commit hook (e.g., for emergency hotfixes), you can use:

```bash
$ git commit --no-verify
```

**Warning**: Only use this when absolutely necessary, as it bypasses all security checks.
