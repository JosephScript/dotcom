import { useMemo } from 'react'
import { Github } from './Github'
import { Bluesky } from './Bluesky'
import { LinkedIn } from './LinkedIn'
import { Sponsor } from './Sponsor'
import { github, linkedin, bluesky, sponsors } from './URLs'
import styles from './Footer.module.css'

export const Footer = () => {
  const currentYear = useMemo(() => new Date().getFullYear(), [])

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <a
          className={styles.sponsorLink}
          href={sponsors}
          target="_blank"
          rel="noreferrer"
        >
          <Sponsor />
          Sponsor
        </a>
        <div className={styles.links}>
          <a href={github} target="_blank" rel="noreferrer" aria-label="Github">
            <Github />
          </a>
          <a
            href={linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <LinkedIn />
          </a>
          <a
            href={bluesky}
            target="_blank"
            rel="noreferrer"
            aria-label="Bluesky"
          >
            <Bluesky />
          </a>
        </div>
        <span className={styles.copyright}>
          &copy;{currentYear} Joseph Andrew Szczesniak
        </span>
      </div>
    </footer>
  )
}
