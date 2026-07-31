import { useMemo } from 'react'
import { ACCENTS } from '../lib/accents'
import styles from './Neofetch.module.css'

// First professional role (Atomic Data, Jan 2012) — matches the earliest
// entry on the resume, so this stays consistent with what's actually
// documented there instead of drifting to a bigger, undocumented number.
const CAREER_START_YEAR = 2012

// Real pixel-sampled ASCII art of the site's own JS logo (a clone of the
// live #Logo SVG was rendered at 900px and sampled cell-by-cell), banded
// top-to-bottom across the accent palette the way distro logos band color
// in real fastfetch output. The logo itself is single-ink (see Logo.tsx —
// it has to stay legible against every accent the header's reroll gimmick
// cycles the background through), so the rainbow banding here is a
// decorative overlay rather than sampled color, same as real fastfetch
// rainbow-Apple-style logos.
const ASCII_ROWS = [
  '                            ...              ',
  '    xMMMMMMMMMM        :xXMMMMMMMXx;         ',
  '    xMMMMMMMMMM       XMMMMXxxxxXMMM         ',
  '          xMMMM      xMMMX.       :x         ',
  '          xMMMM      XMMMX                   ',
  '          xMMMM      ;MMMMXx:.               ',
  '          xMMMM       :XMMMMMMMXx:           ',
  '          xMMMM         .:xXMMMMMMXx         ',
  '          xMMMM              .:XMMMMX        ',
  '          xMMMM                 xMMMM:       ',
  'x:        XMMMX      :.         ;MMMM:       ',
  'xMMXx;;;xXMMMM;      xMMX;::::;xMMMMX        ',
  'xXMMMMMMMMMMX:       ;XMMMMMMMMMMMX;         ',
  '   .:;;;;::             .:;;;;;:.            ',
  '                                             ',
  ' ............................................',
  ':MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM',
  ':MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM',
  ':MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM',
  ' ............................................',
]

const ROWS_PER_BAND = Math.ceil(ASCII_ROWS.length / ACCENTS.length)
// This list is static and never reordered, so an index key is safe here.
const ASCII_BANDED = ASCII_ROWS.map((row, i) => ({
  key: i,
  row,
  color: ACCENTS[Math.floor(i / ROWS_PER_BAND)],
}))

export const Neofetch = ({ repoCount }: { repoCount: number | null }) => {
  const uptimeYears = useMemo(
    () => new Date().getFullYear() - CAREER_START_YEAR,
    [],
  )
  const stats: Array<[string, string]> = [
    ['OS', 'JosephScript'],
    ['Host', 'BR-DGE (Staff Engineer)'],
    ['Kernel', 'TypeScript 5.9'],
    ['Uptime', `${uptimeYears} years`],
  ]
  if (repoCount !== null) stats.push(['Packages', `${repoCount} (github)`])
  stats.push(
    ['Shell', 'zsh 5.9'],
    ['Editor', 'Zed'],
    ['Terminal', 'kitty'],
    ['Languages', 'TypeScript, Swift, Kotlin'],
    ['Frameworks', 'React, React Native, Astro'],
    ['Theme', 'JosephScript (dark)'],
    ['Focus', 'fintech, AI/ML, open source, indie games, fractional CTO'],
    ['Locale', 'en_GB.UTF-8'],
  )

  return (
    <div className={styles.panel}>
      <pre className={styles.ascii} aria-hidden="true">
        {ASCII_BANDED.map(({ key, row, color }) => (
          <div key={key} style={{ color }}>
            {row}
          </div>
        ))}
      </pre>
      <div className={styles.stats}>
        <p className={styles.host}>
          <span className={styles.user}>joseph</span>
          <span>@josephscript</span>
        </p>
        <p className={styles.rule}>
          {'-'.repeat('joseph@josephscript'.length)}
        </p>
        <dl>
          {stats.map(([label, value]) => (
            <div className={styles.row} key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <div className={styles.swatches} aria-hidden="true">
          {ACCENTS.map((color) => (
            <span key={color} style={{ backgroundColor: color }} />
          ))}
        </div>
      </div>
    </div>
  )
}
