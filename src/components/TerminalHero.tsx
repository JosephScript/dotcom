import { useEffect, useState } from 'react'

const COMMAND = 'whoami'
const RESPONSE = 'JosephScript: full-stack engineer, AI/ML tinkerer, indie dev'
const TAGLINE =
  'TypeScript development, CI/CD, test automation, and AI-powered ML workflows by day. An indie game at night. Open source and fractional CTO consulting on the side.'

export const TerminalHero = () => {
  const [typedCommand, setTypedCommand] = useState('')
  const [showResponse, setShowResponse] = useState(false)
  const [showTagline, setShowTagline] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (reduced) {
      setTypedCommand(COMMAND)
      setShowResponse(true)
      setShowTagline(true)
      setDone(true)
      document.documentElement.classList.add('boot-done')
      return
    }

    let i = 0
    const typeInterval = setInterval(() => {
      i += 1
      setTypedCommand(COMMAND.slice(0, i))
      if (i >= COMMAND.length) {
        clearInterval(typeInterval)
        setDone(true)
        setTimeout(() => setShowResponse(true), 300)
        setTimeout(() => setShowTagline(true), 650)
        setTimeout(
          () => document.documentElement.classList.add('boot-done'),
          1100,
        )
      }
    }, 70)

    return () => clearInterval(typeInterval)
  }, [])

  return (
    <output className="terminal hero-terminal" aria-live="polite">
      <div className="terminal-titlebar" aria-hidden="true">
        <span className="terminal-dot" />
        <span className="terminal-dot" />
        <span className="terminal-dot" />
      </div>
      <div className="terminal-body">
        <p className="terminal-line">
          <span className="terminal-glyph">$</span> {typedCommand}
          {!done && <span className="terminal-cursor" aria-hidden="true" />}
        </p>
        {showResponse && <h1>{RESPONSE}</h1>}
        {showTagline && <p className="terminal-response">{TAGLINE}</p>}
      </div>
    </output>
  )
}
