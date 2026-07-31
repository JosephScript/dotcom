import { useCallback } from 'react'
import { JosephScript } from './JosephScript'
import { Logo } from './Logo'
import { Nav } from './Nav/Nav'
import { ACCENTS } from '../lib/accents'
import styles from './Header.module.css'

export const Header = ({ pathname }: { pathname: string }) => {
  const clickHandler = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    const current = getComputedStyle(document.documentElement)
      .getPropertyValue('--js-color')
      .trim()
    const choices = ACCENTS.filter((c) => c !== current)
    const next = choices[Math.floor(Math.random() * choices.length)]
    document.documentElement.style.setProperty('--js-color', next)
  }, [])

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <button
          className={styles.logoButton}
          type="button"
          onClick={clickHandler}
          aria-label="Reroll accent color"
        >
          <Logo height={32} width={32} />
        </button>
        <div className={styles.title}>
          <a href="/">
            <JosephScript width={130} fill="var(--js-color)" />
          </a>
        </div>
        <Nav pathname={pathname} />
      </div>
    </header>
  )
}
