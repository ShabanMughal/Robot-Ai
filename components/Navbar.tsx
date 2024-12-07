import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useWindowScroll } from 'react-use'

// Define the navigation items
const navItems = ['Nexus', 'Vault', 'Prologue', 'About', 'Contact']

const Navbar: React.FC = () => {
  const [isAudio, setIsAudio] = useState(false)
  const [indicatorActive, setIndicatorActive] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isNavVisible, setIsNavVisible] = useState(true)

  // Define refs with the correct types
  const navContainer = useRef<HTMLDivElement | null>(null)
  const audioElement = useRef<HTMLAudioElement | null>(null)

  const toggleAudio = () => {
    setIsAudio(!isAudio)
    setIndicatorActive(!indicatorActive)
  }

  const { y: currentScrollY } = useWindowScroll()

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true)
      if (navContainer.current) {
        navContainer.current.classList.remove('floating-nav')
      }
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false)
      if (navContainer.current) {
        navContainer.current.classList.add('floating-nav')
      }
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true)
      if (navContainer.current) {
        navContainer.current.classList.add('floating-nav')
      }
    }
    setLastScrollY(currentScrollY)
  }, [currentScrollY, lastScrollY])

  useEffect(() => {
    if (navContainer.current) {
      gsap.to(navContainer.current, {
        y: isNavVisible ? 0 : -100,
        opacity: isNavVisible ? 1 : 0,
        duration: 0.2,
      })
    }
  }, [isNavVisible])

  useEffect(() => {
    if (isAudio && audioElement.current) {
      audioElement.current.play()
    } else if (audioElement.current) {
      audioElement.current.pause()
    }
  }, [isAudio])

  return (
    <div ref={navContainer} className='fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6'>
      <header className='absolute top-1/2 w-full -translate-y-1/2'>
        <nav className='flex size-full items-center justify-between p-4'>
          <div className='flex items-center gap-7'>
            {/* <img src="/img/logo.png" alt="logo" className='w-10' /> */}
            {/* <Button id={'product-button'} title={'Products'} rightIcon={<TiLocationArrow />} containerClass={'bg-blue-50 md:flex hidden items-center justify-center gap-1'} leftIcon={undefined} /> */}
          </div>

          <div className='flex h-full items-center'>
            <div className='hidden md:block'>
              {navItems.map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className='nav-hover-btn'>
                  {item}
                </a>
              ))}
            </div>

            <button onClick={toggleAudio} className='ml-10 flex items-center space-x-0.5'>
              <audio ref={audioElement} className='hidden' src='/audio/loop.mp3' loop />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={`indicator-line ${indicatorActive ? 'active' : ''}`}
                  style={{ animationDelay: `${bar * 0.1}s` }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Navbar
