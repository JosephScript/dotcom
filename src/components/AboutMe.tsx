import { Neofetch } from './Neofetch'
import styles from './AboutMe.module.css'

export const AboutMe = ({ repoCount }: { repoCount: number | null }) => (
  <section className={styles.section}>
    <Neofetch repoCount={repoCount} />
    <div className={styles.bio}>
      <p>
        I've been building software for most of my life, from scrappy startups
        to fintech platforms carrying real compliance weight, GDPR and UK
        Gambling Commission requirements included.
      </p>
      <p>
        Along the way I've built and shipped an AI-powered research platform
        used by Fortune 500 teams, with LLM-powered features for extracting
        insights from interviews and research notes, coauthored a JavaScript
        book, and spent a few years producing a podcast on UX and SaaS strategy.
        Most days I'm the senior engineer other people come find when
        something's actually broken.
      </p>
      <p>
        Lately that's small open-source tools, an indie game on nights and
        weekends, and consulting as a fractional CTO on the side.
      </p>
      <div className={styles.links}>
        <a href="/projects">Projects</a>
      </div>
    </div>
  </section>
)
