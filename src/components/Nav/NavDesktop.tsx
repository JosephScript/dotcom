import { Sponsor } from '../Sponsor'
import { sponsors } from '../URLs'
import styles from './Nav.module.css'

export const NavDesktop = ({ showHome }: { showHome: boolean }) => (
  <nav className={styles.navDesktop}>
    {showHome && <a href="/">Home</a>}
    <a href="/projects">Projects</a>
    <a href="/about">About Me</a>
    <a href="/about/resume">Resume/CV</a>
    <a
      className={styles.sponsorNavLink}
      href={sponsors}
      target="_blank"
      rel="noreferrer"
    >
      <Sponsor />
      Sponsor
    </a>
  </nav>
)
