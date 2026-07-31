import { useState, useEffect } from 'react'
import { NavDesktop } from './NavDesktop'
import { NavMobile } from './NavMobile'

export const Nav = ({ pathname }: { pathname: string }) => {
  const showHome = pathname !== '/'

  const [isDesktop, setIsDesktop] = useState(false)
  const [isTabletAndBelow, setIsTabletAndBelow] = useState(false)

  // Update media query states on the client only
  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 720px)')
    const tabletQuery = window.matchMedia('(max-width: 719px)')

    const updateMedia = () => {
      setIsDesktop(desktopQuery.matches)
      setIsTabletAndBelow(tabletQuery.matches)
    }

    updateMedia() // Run on mount to set the initial state

    // Add listeners for media query changes
    desktopQuery.addEventListener('change', updateMedia)
    tabletQuery.addEventListener('change', updateMedia)

    return () => {
      // Cleanup listeners on unmount
      desktopQuery.removeEventListener('change', updateMedia)
      tabletQuery.removeEventListener('change', updateMedia)
    }
  }, [])

  return (
    <>
      {isTabletAndBelow && <NavMobile showHome={showHome} />}
      {isDesktop && <NavDesktop showHome={showHome} />}
    </>
  )
}
