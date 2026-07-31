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

This site deploys to Cloudflare Workers as a static-assets Worker, configured in `wrangler.jsonc`. It's a fully static Astro build (`output: 'static'`) with no server-side rendering yet — `wrangler.jsonc` has no `main` entrypoint, just an `assets` block pointing at `dist/`. SSR can be added later for specific routes by installing the `@astrojs/cloudflare` adapter and giving `wrangler.jsonc` a `main` script, without needing to migrate off Workers.

### How it works

1. The Cloudflare Worker is connected to this GitHub repository via Workers Builds (Cloudflare's git-integration CI/CD for Workers, configured in the Cloudflare dashboard).
2. On push to `main`, Cloudflare clones the repo, installs dependencies with `pnpm`, runs `pnpm run build` to generate the static site in `dist/`, then runs `wrangler deploy` to publish it.
3. Static assets are served from Cloudflare's global network.

### Manual Deployment

```bash
# Build and deploy in one step
$ pnpm run deploy

# Or separately:
$ pnpm run build
$ npx wrangler deploy

# Validate the wrangler config without actually deploying:
$ npx wrangler deploy --dry-run
```

Deploying manually requires being logged in via `npx wrangler login`, or a `CLOUDFLARE_API_TOKEN` environment variable.

### Setting up the Worker (one-time setup)

If you need to reconnect this to a Cloudflare account from scratch:

1. Go to the [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Import a repository**
2. Connect this GitHub repo
3. Build command: `pnpm run build`
4. Cloudflare will detect `wrangler.jsonc` and deploy accordingly
5. Attach the custom domain under the Worker's **Settings → Domains & Routes**

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
