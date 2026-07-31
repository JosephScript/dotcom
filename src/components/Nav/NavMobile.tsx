import { useMemo, useState } from 'react'
import { Spin as Hamburger } from 'hamburger-react'
import { Sponsor } from '../Sponsor'
import { sponsors } from '../URLs'
import styles from './Nav.module.css'

export const NavMobile = ({ showHome }: { showHome: boolean }) => {
  const [isOpen, setOpen] = useState(false)
  const clazz = useMemo(
    () => `${styles.navInner} ${isOpen ? styles.navInnerOpen : ''}`,
    [isOpen],
  )
  return (
    <nav className={styles.navMobile}>
      <Hamburger
        toggled={isOpen}
        toggle={setOpen}
        label="Show menu"
        color="var(--js-color)"
      />

      <div className={clazz}>
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
      </div>
    </nav>
  )
}
