export interface Repo {
  name: string
  description: string | null
  url: string
  language: string | null
  stars: number
  updatedAt: string
}

// Fallback pin order, used when GITHUB_TOKEN isn't configured at build time
// (pinned repos aren't exposed by the public REST API — only GraphQL, which
// requires auth). Keep this roughly in sync with github.com/JosephScript.
const FALLBACK_PINNED = [
  'pop-n-lock-theme-zed',
  'claude-speak',
  'fastify-permissions-policy',
  'zed-openai-proxy',
]

interface GithubApiRepo {
  name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  pushed_at: string
  fork: boolean
  archived: boolean
}

function toRepo(r: GithubApiRepo): Repo {
  return {
    name: r.name,
    description: r.description,
    url: r.html_url,
    language: r.language,
    stars: r.stargazers_count,
    updatedAt: r.pushed_at,
  }
}

// Runs at build time (Astro frontmatter), not in the browser.
export async function getRepos(): Promise<GithubApiRepo[]> {
  try {
    const res = await fetch(
      'https://api.github.com/users/JosephScript/repos?per_page=100&sort=updated',
      { headers: { Accept: 'application/vnd.github+json' } },
    )
    if (!res.ok) {
      console.warn(`[github] repos fetch failed: ${res.status}`)
      return []
    }
    return await res.json()
  } catch (err) {
    console.warn('[github] repos fetch errored', err)
    return []
  }
}

interface PinnedNode {
  name: string
  isFork: boolean
}

// Actual GitHub-pinned repos, via GraphQL — the only API that exposes pins.
// Requires GITHUB_TOKEN (no scopes needed, it's only used to identify the
// caller for a fully public read) set locally in `.env` and as a Cloudflare
// Pages build environment variable. Falls back to FALLBACK_PINNED otherwise.
async function getPinnedRepoNames(): Promise<string[]> {
  const token = import.meta.env.GITHUB_TOKEN
  if (!token) return FALLBACK_PINNED

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `{
          user(login: "JosephScript") {
            pinnedItems(first: 6, types: REPOSITORY) {
              nodes { ... on Repository { name isFork } }
            }
          }
        }`,
      }),
    })
    if (!res.ok) {
      console.warn(`[github] pinned repos fetch failed: ${res.status}`)
      return FALLBACK_PINNED
    }
    const json = await res.json()
    const nodes: PinnedNode[] = json?.data?.user?.pinnedItems?.nodes ?? []
    const names = nodes.filter((n) => !n.isFork).map((n) => n.name)
    return names.length > 0 ? names : FALLBACK_PINNED
  } catch (err) {
    console.warn('[github] pinned repos fetch errored', err)
    return FALLBACK_PINNED
  }
}

// Count of active (non-fork, non-archived) public repos — used by the
// neofetch-style "Packages" line so it never goes stale.
// Returns null on fetch failure (e.g. rate limited) rather than 0, so
// callers can omit the stat instead of displaying a misleading count.
export async function getRepoCount(): Promise<number | null> {
  const all = await getRepos()
  if (all.length === 0) return null
  return all.filter((r) => !r.fork && !r.archived).length
}

export async function getFeaturedRepos(limit: number): Promise<Repo[]> {
  const [all, pinnedNames] = await Promise.all([
    getRepos(),
    getPinnedRepoNames(),
  ])
  const eligible = all.filter((r) => !r.fork && !r.archived)

  const pinned = pinnedNames
    .map((name) => eligible.find((r) => r.name === name))
    .filter((r): r is GithubApiRepo => Boolean(r))

  // Recency first — this is meant to reflect what I'm actively working on,
  // not just whatever old tutorial repo happens to have the most stars.
  const rest = eligible
    .filter((r) => !pinnedNames.includes(r.name))
    .sort((a, b) => {
      const recencyDiff =
        new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
      if (recencyDiff !== 0) return recencyDiff
      return b.stargazers_count - a.stargazers_count
    })

  return [...pinned, ...rest].slice(0, limit).map(toRepo)
}
